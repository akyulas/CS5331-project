const convertJsonObjectToString = (input) => {
  if (typeof input === "object") {
    input = JSON.stringify(input)
  }
  return input
}

const mongoDBNoSQLMatch = (input) => {
  console.log("validating with Mongo DB NOSQL Match")
  input = convertJsonObjectToString(input)
  dangerousMongoDBNoSQLChars = ['$', '{', '&&', '||']
  dangerousRegex = [/sleep\s*\(\s*[0-9]+\s*\)/gm]
  return dangerousMongoDBNoSQLChars
  .some(possiblyDangerousInput => input.includes(possiblyDangerousInput))
  ||
  dangerousRegex
  .some(possiblyDangerousInput => input.match(possiblyDangerousInput))
}

const sqlInjectionMatch = (input) => {
  console.log("validating with SQL Match")
  input = convertJsonObjectToString(input)
  dangerousSQLInectionChars = ['SELECT', 'UNION', '--', 'UPDATE', 'DELETE']
  dangerousRegex = [/1\s*=\s*1/gm]
  return dangerousSQLInectionChars
  .some(possiblyDangerousInput => input.toUpperCase().includes(possiblyDangerousInput))
  ||
  dangerousRegex
  .some(possiblyDangerousInput => input.match(possiblyDangerousInput))
}

module.exports = { mongoDBNoSQLMatch, sqlInjectionMatch }