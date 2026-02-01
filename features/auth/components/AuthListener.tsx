'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthListener() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // 初始 session 或 登入
                if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                    queryClient.setQueryData(['user'], session?.user ?? null);
                    // queryClient.refetchQueries(
                    //     { predicate: (query) => query.queryKey[0] === 'blood-pressure-records' }
                    // )
                    // 手動 refetch
                    // queryClient.refetchQueries({
                    //     predicate: q =>
                    //         q.queryKey[0] === 'blood-pressure-records' &&
                    //         q.queryKey[1] === 'recent',
                    // });
                    // queryClient.invalidateQueries({ queryKey: ['blood-pressure-records'] });
                }

                // 🔴 登出
                if (event === 'SIGNED_OUT') {
                    queryClient.setQueryData(['user'], null)
                    // queryClient.invalidateQueries({ queryKey: ['blood-pressure-records'] });
                    queryClient.removeQueries({ predicate: q => q.queryKey[0] === 'blood-pressure-records' })
                    // queryClient.clear()
                    // queryClient.setQueriesData(
                    //     { predicate: (query) => query.queryKey[0] === 'blood-pressure-records' },
                    //     null
                    // );
                    // queryClient.invalidateQueries(
                    //     { predicate: (query) => query.queryKey[0] === 'blood-pressure-records' }
                    // );
                    // queryClient.setQueriesData(
                    //     { predicate: (query) => query.queryKey[0] !== 'public' },
                    //     null
                    // );
                }
            }
        );

        return () => sub.subscription.unsubscribe();
    }, [queryClient]);

    return null;
}