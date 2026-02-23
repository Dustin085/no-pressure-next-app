'use client';
import { supabase } from '@/lib/supabase/client';
// import { useRouter } from 'next/navigation';


export function useLogout() {
    // const router = useRouter();

    const logout = async () => {
        
        const { error } = await supabase.auth.signOut();

        // if (!error) router.push('/login');
        if (!error) window.location.href = '/login';
        else console.error(error.message);
    };

    return logout;
}
