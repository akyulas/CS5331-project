const express = require('express')
const { mongoDBNoSQLMatch, sqlInjectionMatch } = require('./DetectionFunction')
const spawner = require('node:child_process').spawnSync;

const validateRequestBody = (requestBody, requestBodyPathsToSanitize, res) => {
  const result =  {}
  for (requestBodyPathToSanitize of requestBodyPathsToSanitize) {
    let input = requestBody
    requestBodyPathToSanitize.split('.')
    .forEach((p) => { input = input[p]; });
    if (typeof input === "object") {
      console.log("Detecting a javascript object. Possibly a dangerous input. Rejecting this.")
      // Absolute path must be provided to the actual value, assume something funny is going on if this is an object
      result['shouldThrowError'] = true
      return result
    }
    if (validateWithLRModel(input) || mongoDBNoSQLMatch(input) || sqlInjectionMatch(input)) {
      result['shouldThrowError'] = true
      return result
    }
  }
  return result
}

const validateWithLRModel = ( input ) =>{
  console.log("validating with LR Model")
  const identifyFilePath = __dirname + '/identify.py'
  const python_process = spawner('python3', [identifyFilePath, JSON.stringify( input )])
  res = parseInt(python_process.stdout.toString())
  return res
}

const validateGenericParam = (param, paramsToSanitize) => {
  const result = {}
  for (paramToSanitize of paramsToSanitize) {
    if ( validateWithLRModel(param[paramToSanitize]) || mongoDBNoSQLMatch(param[paramToSanitize]) || sqlInjectionMatch(param[paramToSanitize])) {
      result['shouldThrowError'] = true
      return result
    }
  }
  return result
}

const injectionFireWallMiddleware = (args = {}) => {
  const {
    headersToSanitize = [],
    requestBodyPathsToSanitize = [],
    pathParamsToSanitize = [],
    queryParamsToSanitize = [],
  } = args
  return (req, res, next) => {
    express.json()(req, res, () => {

      const {
        headers: requestHeaders,
        body: requestBody,
        params: pathParams,
        query: queryParams
      } = req

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingHeaders = false
      } = validateGenericParam(requestHeaders, headersToSanitize, res)
      if (shouldThrowErrorAfterValidatingHeaders) {
        return res.status(400).send("Dangerous input detected")
      }

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingRequestBody = false
      } = validateRequestBody(requestBody, requestBodyPathsToSanitize, res)
      if (shouldThrowErrorAfterValidatingRequestBody) {
        return res.status(400).send("Dangerous input detected")
      }

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingRequestParams = false
      } = validateGenericParam(pathParams, pathParamsToSanitize, res)
      if (shouldThrowErrorAfterValidatingRequestParams) {
        return res.status(400).send("Dangerous input detected")
      }

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingQueryParams = false
      } = validateGenericParam(queryParams,queryParamsToSanitize, res)
      if (shouldThrowErrorAfterValidatingQueryParams) {
        return res.status(400).send("Dangerous input detected")
      }

      next()
    })
  }
}

module.exports = 
{
  injectionFireWallMiddleware,
  validateWithLRModel
};
