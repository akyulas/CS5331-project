const mongoDBNoSQLMatch = (input) => {
  console.log("validating with Mongo DB NOSQL Match")
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
  dangerousSQLInectionChars = ['SELECT', 'UNION', '--', '1=1']
  return dangerousSQLInectionChars
  .some(possiblyDangerousInput => input.toUpperCase().includes(possiblyDangerousInput))
}

module.exports = { mongoDBNoSQLMatch, sqlInjectionMatch }