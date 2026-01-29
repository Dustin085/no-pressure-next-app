'use client';

import AuthListener from '@/features/auth/components/AuthListener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthListener />
            {children}
        </QueryClientProvider>
    );
}
