/* eslint-disable no-unused-vars */
const template = require('@babel/template').default
const traverse = require('@babel/traverse').default
const { warpClassNode, wrapFunctionNode, importSentry, wrapImportErrorBoundary } = require('./lib')

const traverseAst = (parentAstPath, boundaryOption) => {
  traverse(parentAstPath, {
    Program (path, state) {
    // console.log(`Program !!`, path)
      let insertAfterNode = null
      path.node.body.forEach(item => {
        // console.log('##=>',item.type)
        if (item.type === 'ImportDeclaration') {
          insertAfterNode = item
        }
      })
      insertAfterNode.needInsertAfter = true
    },
    ImportDeclaration (path, state) {
      // console.log(`ImportDeclaration`, path.node)
      if (path.node.needInsertAfter) {
        // path.insertAfter([warpClassNode, wrapFunctionNode])
        path.insertAfter([importSentry, wrapImportErrorBoundary])
      }
    },
    ArrowFunctionExpression (path, state) {
      if (path.parent.type === 'VariableDeclarator' && path.parentPath.parent.type === 'VariableDeclaration' && path.parentPath.parentPath.parent.type === 'ExportNamedDeclaration') {
        // console.log('## VariableDeclarator', path.node.body.body)
        path.replaceWith(template.expression({ plugins: ['jsx'] })(`ErrorBoundaryWrap(${path.toString()}, ${JSON.stringify(boundaryOption)})`)())
      }
    },
    ExportSpecifier (path, state) {
      // console.log('##path parent:', path.parent)
      if (path.parent && path.parent.type === 'ExportNamedDeclaration' && !path.parent.isdeal) {
        // console.log('###ExportSpecifier')
        // const replaceNode = types.arrayExpression([newNode, path.node]);
        const replaceNodeList = []
        const parentNode = path.parent
        let replaceNodeString = 'export {'
        let adot = ''
        parentNode.specifiers.forEach(element => {
          const componentName = element.local.name
          // console.log(`element.local.name:`,componentName)
          replaceNodeList.push(template.statement(`const ${componentName}ErrorBoundary = ErrorBoundaryWrap(${componentName}, ${JSON.stringify(boundaryOption)})`)())
          replaceNodeString += ` ${adot} ${componentName}ErrorBoundary as ${componentName}`
          adot = ','
        })
        replaceNodeString += '}'
        const newDeclarationNode = template.statement(replaceNodeString)()
        newDeclarationNode.isdeal = true
        replaceNodeList.push(newDeclarationNode)
        // console.log('#replaceNodeList:', replaceNodeList)
        path.parentPath.replaceWithMultiple(replaceNodeList)
      }
    },
    ExportDefaultDeclaration (path, state) {
      // console.log('ExportDefaultDeclaration path, state', path, state)
      // console.log('##ExportDefaultDeclaration', path?.node?.declaration?.properties)
      if (path?.node?.declaration?.properties && !path?.node?.isdeal) {
        let replaceNodeString = 'export default {'
        let adot = ''
        path.node.declaration.properties.forEach(item => {
          // console.log(`##=>`,item.value.name)
          if (item?.value?.name) {
            replaceNodeString += ` ${adot} ${item.value.name}: ErrorBoundary(${item.value.name})`
            adot = ','
          }
        })
        replaceNodeString += '}'
        const newNode = template.statement(replaceNodeString)()
        newNode.isdeal = true
        path.replaceWithMultiple([newNode])
      } else if (path?.node?.declaration?.type === 'Identifier') {
        path.replaceWith(template.statement(`export default ErrorBoundaryWrap(${path?.node?.declaration?.name}, ${JSON.stringify(boundaryOption)})`)())
      }
    },
    JSXFragment (path) {
      // console.log('###', path.parentPath)
    }
  })
}

module.exports = traverseAst
