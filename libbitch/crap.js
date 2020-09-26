const chromium = require('chrome-aws-lambda');
const { addExtra } = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const puppeteer = addExtra(chromium.puppeteer)

puppeteer.use(StealthPlugin())

module.exports = async function hibp(email) {
    const sources = `https://haveibeenpwned.com/unifiedsearch/${email}`;

    let args = chromium.args;
    let executablePath = await chromium.executablePath;
    let defaultViewport = chromium.defaultViewport;
    let headless = true;

    if(!args.includes('--no-sandbox')) 
        args.push('--no-sandbox');
    if(!args.includes('--disable-setuid-sandbox')) 
        args.push('--disable-setuid-sandbox');
    
        console.log(args);
        console.log(executablePath);

    const browser = await puppeteer.launch({
        args,
        headless,
        defaultViewport,
        executablePath,
        // executablePath: "../node_modules/puppeteer/.local-chromium/win64-800071/chrome-win/chrome.exe",
        // headless,
    });
    const page = await browser.newPage();
    return await page.goto(sources, {
        waitUntil: 'networkidle2',
    }).then(res => {
        return res.json()
    }).then(data => {
        return data;
    }).catch(err => {
        console.log("Error:", err);
    }).finally(() => {
        browser.close();
    })
}