module.exports = {
  common:
`
import React from 'react';
import * as Sentry from '@sentry/react';

const ErrorBoundaryWrap = (Child, boundaryOption) => {
    const FallbackComponent = () => {
    return <div style={{ ...(boundaryOption?.boundarystyle || {})
    }}>{boundaryOption?.boundarytext || 'Something went wrong.'}</div>;
    };

    return props => <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
        <Child {...props} />
    </Sentry.ErrorBoundary>;
};

const Hello1 = () => {
    return <>
        <h1>Hello1 is here</h1>
    </>;
};

const Hello2 = () => {
    return <>
        <h1>Hello2 is here</h1>
    </>;
};

export const Hello3 = ErrorBoundaryWrap(() => {
    return <>
        <h1>Hello3 is here</h1>
    </>;
}, {});

const Hello5 = () => {
    return <>
        <h1>Hello5 is here</h1>
    </>;
};

const Hello6 = () => {
    return <>
        <h1>Hello6 is here</h1>
    </>;
};

const Hello1ErrorBoundary=ErrorBoundaryWrap(Hello1,{});
const Hello2ErrorBoundary=ErrorBoundaryWrap(Hello2,{});
export {Hello1ErrorBoundary as Hello1,Hello2ErrorBoundary as Hello2};

export default {Hello5:ErrorBoundary(Hello5),Hello6:ErrorBoundary(Hello6)};

//exportdefaultHello1
`
}
