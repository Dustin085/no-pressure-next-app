import z from "zod";

// 登入 input schema
export const LoginFormInputSchema = z.object({
    email: z.email(),
    password: z.string(),
});