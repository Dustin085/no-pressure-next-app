import z from "zod";

// 登入 input schema
export const LoginFormInputSchema = z.object({
    email: z.email(),
    password: z.string(),
});

// Email 註冊 input schema
export const EmailSignupInputSchema = z
    .object({
        email: z.email({ error: '請輸入有效 Email' }),
        password: z.string().min(8, { error: '密碼至少 8 碼' }),
        confirmPassword: z.string().min(8, { error: '密碼至少 8 碼' }),
    })
    .refine(data =>
        data.password === data.confirmPassword, {
        error: '確認密碼與密碼不一致',
        path: ['confirmPassword'] // 錯誤會顯示在 comfirmPassword
    })