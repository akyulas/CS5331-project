const express = require('express')
const app = express()
const port = 5000
const { injectionFireWallMiddleware } = require('injection-firewall-middleware')

app.get('/', injectionFireWallMiddleware({headersToBeChecked: ['id']}), (req, res) => {
  res.send('In get /')
})

app.get('/test/:id', injectionFireWallMiddleware({pathParamsToBeChecked: ['id']}), (req, res) => {
  res.send('In get /test/:id')
})

app.get('/test', injectionFireWallMiddleware({queryParamsToBeChecked: ['id']}), (req, res) => {
  res.send('In get /test')
})

app.post('/test', injectionFireWallMiddleware({requestBodyPathsToBeChecked: ['id']}), (req, res) => {
  res.send('In post /test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})