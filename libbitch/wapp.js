const wappalyzer = require("wappalyzer");

async function checkDomain(url) {
    const options = {
        debug: false,
        delay: 500,
        headers: {},
        maxDepth: 3,
        maxUrls: 10,
        maxWait: 5000,
        recursive: true,
        probe: true,
        userAgent: 'Wappalyzer',
        htmlMaxCols: 2000,
        htmlMaxRows: 2000,
    };
    const wapp = await new wappalyzer(options)
    try {
        await wapp.init()
        const site = await wapp.open("https://" + url)
        const result = await site.analyze()
        return result;
    } catch (err) {
        console.error(err)
    }
    await wapp.destroy()
}

module.exports = checkDomain