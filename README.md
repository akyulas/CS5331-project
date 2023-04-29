# Injection Firewall Middleware

## Description

This is an express middleware was created by a group of National University of Singapore students as part of the CS5331 Web Security module.

This is a Proof of Concept (POC) that shows how SQL and No-SQL injection attacks can be detected and hence rejected via input validation.

While there are much better way to handle injection attacks such as via prepared statements, this is more of a research project to see how good input validation can detect such attacks.

The injection attacks are detected via using a machine learning model that we have trained and also some manual validation logic that we have added in.

## Example Code Snippet

An example code snippet of how the middleware can be used is provided below:
```
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
```

## Test Application

The test application is provided in the directory 'test-express-app'

Please run the following commands to start up the test application after you have navigated to the directory 'test-express-app':
```
npm install
node index.js
```

## Pre-requisites

This middleware was tested with the following python and node version:
1. Python v3.11.3
2. Node v14.18.0

The assumption made in the creation of this middleware is that the python 3 command is this:
`python3`

And the corresponding pip command:
`pip3`

This middleware might not work correctly on machines where this is not the case.

## How to install this library

To install this library, you need to add this as a dependency. As this is a PoC, we didn't publish this onto npm and we are testing this middleware library locally at this current moment.

The library can be added to npm dependency package.json in the following way:

```
"dependencies": {
    ...
    "injection-firewall-middleware": "file:<Absolute Path to directory containing package.json of the main middleware application>"
    ...
  }
```

The javascript dependency libraries and the python dependency libraries of the express middleware will automatically be installed for you.

## Some quirks with the existing code

The very first time you load the middleware, you will notice that the very first request takes a very slow time to process (~30seconds).

We have identified this issue to be because of the joblib library that takes a very long time to de-pickle the machine learning model.

However, for subsequent requests, this depickling is much faster and hence the requests will be much served much faster.

This is a quirk that we didn't have much time to fix, but can be easily remediated on by serving dummy requests when the application first load up to 'warm" it up.
