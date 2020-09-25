const API = require("./api")
const express = require('express')
const app = express()
const port = 3000

app.get('/api', API)
app.get('/', express.static("./"))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
