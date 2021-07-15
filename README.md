# react 组件错误边界包裹loader

## 使用方式

### 1.安装
```javascript
yarn add -D @efox/react-boundary-loader
```

### 2.配置
```javascript
// webpackChain 配置例子
webpackChain.module
      .rule('jsx')
      .test(/\.(jsx|tsx)$/)
      .use('reactErrorBoundary')
      .loader('@efox/react-boundary-loader')
      .options({
        boundarystyle: { color: '#333', fontSize: '20px' },  // 错误提示样式
        boundarytext: '模块异常', // 错误提示样本
      })
      .end()

// webpack 常规配置
{
test: /\.(jsx|tsx)$/,
      use: [
            /* config.module.rule('jsx').use('errorBoundary') */
            {
                  loader: '@efox/react-boundary-loader',
                  options: {
                        boundarystyle: {
                        color: '#333',
                        fontSize: '20px'
                        },
                        boundarytext: '模块异常,'
                  }
            }
      ]
}
```

本loader主要提供`ESM`规范下React的组件暴露的以下四种方式进行代码转换:
```javascript
export default ComponentA // 情况1 export default
```
```javascript
export default {ComponentA, ComponentB, ComponentC} // 情况2 export default {}
```
```javascript
// 情况3 export const
export const ComponentA = (props) => {
 // 组件代码实现
} 
```
```javascript
export {ComponentA, ComponentB, ComponentC} // 情况4 export {}
```

转换如下：
```javascript
export default ErrorBoundaryWrap(ComponentA) // 情况1
```
```javascript
// 情况2
export default {
  ComponentA: ErrorBoundaryWrap(ComponentA), 
  ComponentB: ErrorBoundaryWrap(ComponentB), 
  ComponentC: ErrorBoundaryWrap(ComponentC)
}
```
```javascript
// 情况3
export const ComponentA = ErrorBoundaryWrap((props) => {
 // 组件代码实现
})
```
```javascript
// 情况4
const ComponentAerrorBoundary = ErrorBoundaryWrap(ComponentA)
const ComponentBerrorBoundary = ErrorBoundaryWrap(ComponentB)
const ComponentCerrorBoundary = ErrorBoundaryWrap(ComponentC)
export {
  ComponentAerrorBoundary as ComponentA, 
  ComponentBerrorBoundary as ComponentB, 
  ComponentCerrorBoundary as ComponentC
}
```