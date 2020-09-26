const API = require('./api')
const express = require('express')
const app = express()
const port = process.env.PORT || 4747
const path = require('path')
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Set Limiter
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many request"
})

// Set cors
let corsOptions = {
  origin: 'https://cekdata.herokuapp.com',
  optionSuccessStatus: 200
}

// Apply limiter
app.use('/api', apiLimiter)

// Simple Routes
app.use('/assets', express.static(path.join(__dirname, './assets')))
app.get('/api', cors(corsOptions), API)
app.get('/', express.static(path.join(__dirname, '.')))

app.listen(port, () => {
  console.log(`Started at port: ${port}.`)
})
