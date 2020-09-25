const hibp = require("../libbitch/crap");

const API = async (req, res) => {
    const email = req.query["email"];
    const results = await hibp(email);
    res.json(results);
} 

module.exports = API