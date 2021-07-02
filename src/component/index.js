/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    console.warn('getDerivedStateFromError:', error)
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    console.warn('componentDidCatch:', error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return <div style={{ ...this.props.boundarystyle }}>{ this.props.boundarytext || 'Something went wrong.'}</div>
    }

    return this.props.children
  }
}

const ErrorBoundaryWrap = (Child, boundaryOption) => {
  return (props) => (
      <ErrorBoundary boundarystyle={boundaryOption?.boundarystyle} boundarytext={boundaryOption?.boundarytext}>
        <Child {...props} />
      </ErrorBoundary>
  )
}

export { ErrorBoundary, ErrorBoundaryWrap }
