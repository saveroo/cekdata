const API = require('./api')
const express = require('express')
const port = process.env.PORT || 4747
const path = require('path')
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()

var jsonParser = bodyParser.json()

var urlEncodedParser = bodyParser.urlencoded({ extended: false })

// Set Limiter
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many requests"
})

// Set cors
let corsOptions = {
  origin: 'https://cekdata.herokuapp.com',
  optionSuccessStatus: 200
}

// Apply limiter
app.use('/api', apiLimiter)

// Apply Parser
app.use('/api', jsonParser)
app.use('/api', urlEncodedParser)

// Simple Routes
app.use('/assets', express.static(path.join(__dirname, './assets')))
app.post('/api', cors(corsOptions), API)
app.get('/', express.static(path.join(__dirname, '.')))

app.listen(port, () => {
  console.log(`Started at port: ${port}.`)
})
