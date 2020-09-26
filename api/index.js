const hibp = require("../libbitch/crap");

const API = async (req, res) => {
    console.log(req, 'body');
    const email = req.body.email;
    let results
    try{
        results = await hibp(email);
    } catch (err) {
        console.log("Err", err)
    }
    res.setHeader('Cache-Control', 's-maxage=5400, stale-while-revalidate')
    results ? res.json(results) : res.json({});
} 

module.exports = API