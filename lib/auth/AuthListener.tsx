'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthListener() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // 🟢 初始 session（重新整理 / redirect 回來）
                if (event === 'INITIAL_SESSION') {
                    queryClient.setQueryData(['user'], session?.user ?? null);
                }

                // 🟢 登入成功
                if (event === 'SIGNED_IN') {
                    queryClient.setQueryData(['user'], session?.user ?? null);
                }

                // 🔴 登出
                if (event === 'SIGNED_OUT') {
                    // queryClient.setQueryData(['user'], null);
                    queryClient.clear();
                }
            }
        );

        return () => sub.subscription.unsubscribe();
    }, [queryClient]);

    return null;
}