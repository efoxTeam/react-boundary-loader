const template = require('@babel/template').default
const warpClassNode = template.expression({ plugins: ['jsx'] })(`
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, version: 0 };
      }

      static getDerivedStateFromError(error) {
        console.warn('getDerivedStateFromError', error)
        return { hasError: true };
      }

      componentDidCatch(error, errorInfo) {
        console.warn('componentDidCatch', error, errorInfo)
      }

      render() {
        if (this.state.hasError) {
          return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
      }
    }`)()
const wrapFunctionNode = template.statement({ plugins: ['jsx'] })(
`const ErrorBoundaryWrap = (Child) => {
    return (props) => (
        <ErrorBoundary>
        <Child {...props} />
        </ErrorBoundary>
    )
}`)()
const importSentry = template.statement('import * as Sentry from \'@sentry/react\'')()
const wrapImportErrorBoundary = template.statement({ plugins: ['jsx'] })(`
const ErrorBoundaryWrap = (Child, boundaryOption) => {
  const FallbackComponent = () => {
    return <div style={{ ...(boundaryOption?.boundarystyle || {}) }}>{boundaryOption?.boundarytext || 'Something went wrong.'}</div>
  }
  return (props) => (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <Child {...props} />
    </Sentry.ErrorBoundary>
  )
}`)()

module.exports = {
  warpClassNode,
  wrapFunctionNode,
  importSentry,
  wrapImportErrorBoundary
}
