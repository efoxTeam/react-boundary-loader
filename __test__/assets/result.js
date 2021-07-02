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

export { Hello1, Hello2 }; // export default  {
//   Hello5, Hello6
// }

export default ErrorBoundaryWrap(Hello1, {});`
}