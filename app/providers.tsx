'use client';

import AuthListener from '@/features/auth/components/AuthListener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    // server 不會執行 hook，使用 useState 可以避免在 server 產生 QueryClient 實例
    // server 產生實例可能會造成快取跨請求污染（user A 的資料被 user B 看到）
    //  **不要使用 const... 建立 QueryClient**
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthListener>
                {children}
            </AuthListener>
        </QueryClientProvider>
    );
}
