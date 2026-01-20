import z from "zod";

export const recordSchema = z.object({
    systolic: z.number().min(50).max(300),
    diastolic: z.number().min(30).max(200),
    pulse: z.preprocess(
        (v) => {
            if (v === '' || v === null || v === undefined) return undefined;
            return Number(v);
        },
        z.number().optional()
    ),
    measured_at: z
        .union([z.string(), z.date()])
        .optional()
        .transform((v) => {
            if (!v) return new Date();
            if (v instanceof Date) return v;
            return new Date(v);
        })
        .refine((d) => d <= new Date(), "不能是未來時間"),
});