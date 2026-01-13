'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';


export function useLogout() {
    const supabase = createClient();
    const router = useRouter();

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) router.push('/login');
        else console.error(error.message);
    };

    return logout;
}
