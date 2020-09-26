const API = require("./api")
const express = require('express')
const app = express()
const port = process.env.PORT || 4747
const path = require("path")

app.use('/assets', express.static(path.join(__dirname, './assets')))
app.get('/api', API)
app.get('/', express.static(path.join(__dirname, '.')))

app.listen(port, () => {
  console.log(`Started at port: ${port}.`)
})
