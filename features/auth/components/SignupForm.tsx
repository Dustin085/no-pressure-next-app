import { EmailSignupInputSchema } from "@/features/auth/schema";
import { ROUTES } from "@/lib/constants/routes";
import { supabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignupForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm({
        resolver: zodResolver(EmailSignupInputSchema),
    });

    const handleEmailSignup = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: email
                }
            }
        })

        if (error) {
            setError("root.signupError", {
                message: error.message,
            })
            return
        }

        if (data.user && !data.session) {
            router.replace("/check-email")
        } else {
            router.replace(ROUTES.DASHBOARD)
        }
    }
    return (
        <div className="bg-card p-10 rounded-2xl shadow-md w-90 space-y-4">
            <h2 className="text-2xl font-bold text-center text-foreground">
                註冊新帳號
            </h2>

            {/* Email and password signup form */}
            <form
                onSubmit={handleSubmit(async (data) => {
                    await handleEmailSignup(data.email, data.password)
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
                        placeholder="請輸入密碼"
                        {...register("password")}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-hover focus:outline-none focus:ring-1 focus:ring-prhovborder-primary-hover"
                    />
                    {errors.password && (
                        <p className="text-xs text-error">{errors.password.message as string}</p>
                    )}
                </div>

                {/* Confirm password input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                        確認密碼
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="請輸入密碼"
                        {...register("confirmPassword")}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-hover focus:outline-none focus:ring-1 focus:ring-prhovborder-primary-hover"
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-error">{errors.confirmPassword.message as string}</p>
                    )}
                </div>

                {/* Supabase Sign up with password error */}
                {errors.root?.signupError && (
                    <p className="text-xs text-error">{errors.root.signupError.message as string}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-foreground hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "註冊中..." : "註冊"}
                </button>
            </form>

            {/* Already have account Button */}
            <button
                onClick={() => router.push(ROUTES.LOGIN)}
                className="w-full py-2 text-sm text-primary hover:underline"
            >
                使用現有帳號登入
            </button>

        </div>
    )
}
