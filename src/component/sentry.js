/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import * as Sentry from '@sentry/react'

const ErrorBoundaryWrap = (Child, boundaryOption) => {
  const FallbackComponent = () => {
    return <div style={{ ...(boundaryOption?.boundarystyle || {}) }}>{boundaryOption?.boundarytext || 'Something went wrong.'}</div>
  }
  return (props) => (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <Child {...props} />
    </Sentry.ErrorBoundary>
  )
}

export { ErrorBoundaryWrap }
