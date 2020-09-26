const hibp = require("../libbitch/crap");
const wapp = require("../libbitch/wapp");

const API = async (req, res) => {

    const email = req.body.email;
    const domain = req.body.domain
    const cmd = req.body.cmd;

    res.setHeader('Cache-Control', 's-maxage=5400, stale-while-revalidate')

    if(cmd == null)
        return;

    let results
    switch (cmd) {
        case "email":
                try{
                    results = await hibp(email);
                } catch (err) {
                    console.error("Err", err)
                }
            break;
        case "domain":
                try {
                    results = await wapp(domain);
                } catch (err) {
                    console.error("Err", err)
                }
            break;
        default:
            break;
    }

    res.json(results)
} 

module.exports = API