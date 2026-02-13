'use client'

import { LoginFormInputSchema } from "@/features/auth/schema";
import { ROUTES } from "@/lib/constants/routes";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { useState } from "react";

export function LoginForm() {
    const [isOAuthLoading, setIsOAuthLoading] = useState(false);

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm({
        resolver: zodResolver(LoginFormInputSchema),
    });

    const handleGoogleLogin = async () => {
        setIsOAuthLoading(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError('root.signInWithGoogleError', { message: error.message })
            setIsOAuthLoading(false)
        };
    };

    const handleEmailLogin = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) { setError('root.signInWithPasswordError', { message: error.message }) }
        else { router.replace(ROUTES.DASHBOARD) }
    };

    return (
        <div className="bg-card p-10 rounded-2xl shadow-md w-90 space-y-4">
            <h2 className="text-2xl font-bold text-center text-foreground">
                登入 NoPressure
            </h2>

            {/* Email / Password Login Form */}
            <form
                onSubmit={handleSubmit(async ({ email, password }) => {
                    await handleEmailLogin(email, password)
                })}
                className="space-y-4"
            >
                {/* Email input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="例如：test@google.com"
                        {...register("email")}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-hover focus:outline-none focus:ring-1 focus:ring-prhovborder-primary-hover"
                    />
                    {errors.email && (
                        <p className="text-xs text-error">{errors.email.message as string}</p>
                    )}
                </div>
                {/* Password input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                        密碼
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="請輸入密碼"
                        {...register("password")}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-hover focus:outline-none focus:ring-1 focus:ring-prhovborder-primary-hover"
                    />
                    {errors.password && (
                        <p className="text-xs text-error">{errors.password.message as string}</p>
                    )}
                </div>

                {/* Supabase Sign in with password error */}
                {errors.root?.signInWithPasswordError && (
                    <p className="text-xs text-error">{errors.root.signInWithPasswordError.message as string}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-foreground hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "登入中..." : "登入"}
                </button>
            </form>

            {/* Login with Google Button */}
            <button
                onClick={handleGoogleLogin}
                disabled={isOAuthLoading}
                className="w-full py-2 border text-gray-700 border-gray-500 rounded-lg flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Image src="/google.svg" className="w-5 h-5" width={36} height={36} alt="google icon" />
                {isOAuthLoading ? "登入中..." : "使用 Google 登入"}
            </button>

            {/* Supabase Sign in with google error */}
            {errors.root?.signInWithGoogleError && (
                <p className="text-xs text-error">{errors.root.signInWithGoogleError.message as string}</p>
            )}

            {/* New account Button */}
            <button
                onClick={() => router.push(ROUTES.SIGNUP)}
                className="w-full py-2 text-sm text-primary hover:underline"
            >
                Create a new account
            </button>
        </div>
    )
}