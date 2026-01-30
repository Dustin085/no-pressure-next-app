'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants/routes';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 已登入直接導走
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                router.replace(ROUTES.DASHBOARD);
            }
        });
    }, [router]);

    const handleEmailLogin = async () => {
        // console.log('login client === listener client', supabase);

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setError(error.message);
        else {
            setTimeout(() => {
                router.push('/dashboard');
            }, 0);
        }
        // else router.push('/dashboard');

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) setError(error.message);
    };

    return (
        <main className="h-full flex items-center justify-center bg-bg">
            <div className="bg-card p-10 rounded-2xl shadow-md w-90 space-y-4">
                <h1 className="text-2xl font-bold text-center text-text">
                    NoPressure Login
                </h1>

                {error && (
                    <p className="text-sm text-error text-center">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg text-text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg text-text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleEmailLogin}
                    disabled={loading}
                    className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="text-center text-sm text-text-muted">or</div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-2 border text-gray-600 border-gray-500 rounded-lg flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300"
                >
                    <Image src="/google.svg" className="w-5 h-5" width={36} height={36} alt="google icon" />
                    Login with Google
                </button>

                <button
                    onClick={() => router.push('/signup')}
                    className="w-full py-2 text-sm text-primary hover:underline"
                >
                    Create a new account
                </button>
            </div>
        </main>
    );
}
