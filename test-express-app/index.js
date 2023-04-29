const express = require('express')
const app = express()
const port = 5000
const { injectionFireWallMiddleware } = require('injection-firewall-middleware')

app.get('/', injectionFireWallMiddleware({headersToSanitize: ['id']}), (req, res) => {
  res.send('In get /')
})

app.get('/test/:id', injectionFireWallMiddleware({pathParamsToSanitize: ['id']}), (req, res) => {
  res.send('In get /test/:id')
})

app.get('/test', injectionFireWallMiddleware({queryParamsToSanitize: ['id']}), (req, res) => {
  res.send('In get /test')
})

app.post('/test', injectionFireWallMiddleware({requestBodyPathsToSanitize: ['id']}), (req, res) => {
  res.send('In post /test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})