const API = require("./api")
const express = require('express')
const app = express()
const port = process.env.PORT || 4747

app.get('/api', API)
app.get('/', express.static("./"))

app.listen(port, () => {
  console.log(`Started at port: ${port}.`)
})
