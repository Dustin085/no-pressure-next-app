'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthListener({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 初始載入（確保第一次就結束 loading）
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);

            // 同步到 TanStack Query
            queryClient.setQueryData(['user'], session?.user ?? null);
        });

        // 單一 listener 處理所有事件
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
            setSession(newSession); // 更新 Context

            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
                queryClient.setQueryData(['user'], newSession?.user ?? null);
            }

            if (event === 'SIGNED_OUT') {
                queryClient.setQueryData(['user'], null);
                // 清除特定資料快取（可擴充更多）
                queryClient.removeQueries({ predicate: q => q.queryKey[0] === 'blood-pressure-records' });
                // 可再加其他要清除的 query key
            }

            // 確保 loading 結束（防萬一）
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [queryClient]);

    const value: AuthContextType = {
        session,
        user: session?.user ?? null,
        accessToken: session?.access_token ?? null,
        isLoading,
        isAuthenticated: !!session?.user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}