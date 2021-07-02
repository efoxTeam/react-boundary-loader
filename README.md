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