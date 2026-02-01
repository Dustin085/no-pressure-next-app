import z from "zod";

// 血壓紀錄取結果的 schema
export const bloodPressureRecordSchema = z.object({
    id: z.string(),
    systolic: z.number(),
    diastolic: z.number(),
    pulse: z.number().nullable(),
    measured_at: z.string(),
});

export const bloodPressureRecordListSchema =
    z.array(bloodPressureRecordSchema);

// 血壓紀錄輸入的 schema
export const bloodPressureRecordInputSchema = z.object({
    systolic: z.number().min(50).max(300),
    diastolic: z.number().min(30).max(200),
    pulse: z.preprocess(
        (v) => {
            if (v === '' || v === null || v === undefined) return undefined;
            const n = Number(v);
            return isNaN(n) ? undefined : n; // 非數字也當作沒填
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