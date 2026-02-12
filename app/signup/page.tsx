'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ROUTES } from '@/lib/constants/routes';
import { SignupForm } from '@/features/auth/components/SignupForm';

export default function LoginPage() {
    const router = useRouter();

    // 已登入直接導走
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                router.replace(ROUTES.DASHBOARD);
            }
        });
    }, [router]);

    return (
        <main className="h-full flex items-center justify-center bg-bg">
            <SignupForm />
        </main>
    );
}
