const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const traverseAst = require('./traverseAst')
const {
  getOptions
//   parseQuery,
//   stringifyRequest
} = require('loader-utils')
const { validate } = require('schema-utils')
const validateSchema = {
  boundarystyle: 'object',
  boundarytext: 'string'
}
const wrapReactBoundary = function (source, sourceMap) {
  const options = getOptions(this) || {}
  validate(validateSchema, options)
  //   console.log('options==>', options)
  // console.log(`begin===>`, source)
  const sourceAst = parser.parse(source, {
    sourceType: 'unambiguous',
    plugins: ['jsx', 'typescript']
  })
  traverseAst(sourceAst, {
    boundarystyle: options.boundarystyle,
    boundarytext: options.boundarytext
  })
  // console.log(`after traverseAst===>`, sourceAst)
  const { code } = generate(sourceAst)
  // console.log('end===>', code)
  return code
}

module.exports = wrapReactBoundary
// export default wrapReactBoundary
