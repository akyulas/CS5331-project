const mongoDBNoSQLMatch = (input) => {
  console.log("validating with Mongo DB NOSQL Match")
  dangerousMongoDBNoSQLChars = ['$', '{', '&&', '||']
  dangerousRegex = [/sleep\([0-9]+\)/gm]
  return dangerousMongoDBNoSQLChars
  .some(possiblyDangerousInput => input.includes(possiblyDangerousInput))
  ||
  dangerousRegex
  .some(possiblyDangerousInput => input.match(possiblyDangerousInput))
}

const sqlInjectionMatch = (input) => {
  console.log("validating with SQL Match")
  dangerousSQLInectionChars = ['SELECT', 'UNION', '--']
  return dangerousSQLInectionChars
  .some(possiblyDangerousInput => input.toUpperCase().includes(possiblyDangerousInput))
}

module.exports = { mongoDBNoSQLMatch, sqlInjectionMatch }