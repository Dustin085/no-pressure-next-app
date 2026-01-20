'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthListener() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((event) => {
            // 使用者登出時，清空資料庫
            if (event === "SIGNED_OUT") {
                queryClient.clear();
            }
        });

        return () => sub.subscription.unsubscribe();
    }, [queryClient, supabase.auth]);

    return null;
}