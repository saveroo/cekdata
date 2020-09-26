const hibp = require("../libbitch/crap");

const API = async (req, res) => {
    const email = req.query["email"];
    const results = await hibp(email);
    res.setHeader('Cache-Control', 's-maxage=5400, stale-while-revalidate')
    res.json(results);
} 

module.exports = API