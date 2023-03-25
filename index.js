const injectionSanitizer = (req, res, next) => {
  console.log('Hello World')
  console.log(req)
  next()
}

module.exports = injectionSanitizer
