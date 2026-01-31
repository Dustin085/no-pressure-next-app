'use client';

import dynamic from 'next/dynamic';

const ReactQueryDevtools = dynamic(
    () =>
        import('@tanstack/react-query-devtools').then(
            (m) => m.ReactQueryDevtools
        ),
    { ssr: false }
);

export function ReactQueryDevtoolPanel() {
    if (process.env.NODE_ENV !== 'development') return null;
    return <ReactQueryDevtools initialIsOpen={false} />;
}
