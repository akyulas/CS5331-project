const express = require('express')

const injectionSanitizer = () => {
  return (req, res, next) => {
    express.json()(req, res, () => {
      const {headers: requestHeaders, body: requestBody, params: requestParams, query: queryParams} = req
      console.log("Headers")
      console.log(requestHeaders)
      console.log("Body")
      console.log(requestBody)
      console.log("Request Params")
      console.log(requestParams)
      console.log("Request Query Params")
      console.log(queryParams)
      next()
    })
  }
}

module.exports = injectionSanitizer
