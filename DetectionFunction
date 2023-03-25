const mongoDBNoSQLMatch = (input) => {
  console.log(input)
  console.log(typeof input)
  dangerousMongoDBNoSQLChars = ['$', '{', '&&', '||']
  dangerousRegex = [/sleep\([0-9]+\)/gm]
  return dangerousMongoDBNoSQLChars
  .some(possiblyDangerousInput => input.includes(possiblyDangerousInput))
  ||
  dangerousRegex
  .some(possiblyDangerousInput => input.match(possiblyDangerousInput))
}

module.exports = { mongoDBNoSQLMatch }