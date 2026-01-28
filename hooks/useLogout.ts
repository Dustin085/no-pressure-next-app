'use client';
import { supabase } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';


export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const logout = async () => {
        queryClient.setQueryData(["auth", "user"], null)
        
        const { error } = await supabase.auth.signOut();
        
        if (!error) router.push('/login');
        else console.error(error.message);
    };

    return logout;
}
