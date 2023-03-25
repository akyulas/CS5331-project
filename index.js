const express = require('express')
const { mongoDBNoSQLMatch } = require('./DetectionFunction')

const validateRequestBody = (requestBody, requestBodyPathsToSanitize, res) => {
  const result =  {}
  for (requestBodyPathToSanitize of requestBodyPathsToSanitize) {
    let input = requestBody
    requestBodyPathToSanitize.split('.')
    .forEach((p) => { input = input[p]; });
    if (typeof input === "object") {
      // Absolute path must be provided to the actual value, assume something funny is going on if this is an object
      result['shouldThrowError'] = true
      return result
    }
    if (mongoDBNoSQLMatch(input)) {
      result['shouldThrowError'] = true
      return result
    }
  }
  return result
}

const validateGenericParam = (param, paramsToSanitize) => {
  const result = {}
  for (paramToSanitize of paramsToSanitize) {
    if (mongoDBNoSQLMatch(param[paramToSanitize])) {
      result['shouldThrowError'] = true
      return result
    }
  }
  return result
}

const injectionSanitizer = (args = {}) => {
  const {
    headersToSanitize = [],
    requestBodyPathsToSanitize = [],
    requestParamsToSanitize = [],
    queryParamsToSanitize = [],
  } = args
  return (req, res, next) => {
    express.json()(req, res, () => {

      const {
        headers: requestHeaders,
        body: requestBody,
        params: requestParams,
        query: queryParams
      } = req

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingHeaders = false
      } = validateGenericParam(requestHeaders, headersToSanitize, res)
      if (shouldThrowErrorAfterValidatingHeaders) {
        return res.sendStatus(500)
      }

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingRequestBody = false
      } = validateRequestBody(requestBody, requestBodyPathsToSanitize, res)
      if (shouldThrowErrorAfterValidatingRequestBody) {
        return res.sendStatus(500)
      }

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingRequestParams = false
      } = validateGenericParam(requestParams, requestParamsToSanitize, res)
      if (shouldThrowErrorAfterValidatingRequestParams) {
        return res.sendStatus(500)
      }

      const {
        shouldThrowError: shouldThrowErrorAfterValidatingQueryParams = false
      } = validateGenericParam(queryParams,queryParamsToSanitize, res)
      if (shouldThrowErrorAfterValidatingQueryParams) {
        return res.sendStatus(500)
      }

      next()
    })
  }
}

module.exports = injectionSanitizer
