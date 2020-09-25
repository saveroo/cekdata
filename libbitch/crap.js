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
    let headless = chromium.headless;

    // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-on-heroku
    args.push('--no-sandbox');

    const browser = await puppeteer.launch({
        args,
        defaultViewport,
        executablePath,
        headless,
    });
    const page = await browser.newPage();
    return await page.goto(sources, {
        waitUntil: 'networkidle2',
    }).then(res => {
        return res.json()
    }).then(data => {
        return data;
    }).finally(() => {
        browser.close();
    })
}