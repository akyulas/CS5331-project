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

module.exports = { mongoDBNoSQLMatch }