const wrapReactBoundary = require('../src/main')
const testCode = require('./assets/origin').common
const resultCode = require('./assets/result').common
const helper = require('./util/index')

test('common boundray wrap:', () => {
  let tobetest = wrapReactBoundary(testCode)
  tobetest = helper.allTrim(tobetest)
  tobetest = helper.allClearBr(tobetest)

  let toberesult = helper.allTrim(resultCode)
  toberesult = helper.allClearBr(toberesult)
  expect(tobetest).toBe(toberesult)
})
