import z from "zod";

export const averageBloodPressureSchema = z.object({
    avg_systolic: z.number().nullable(),
    avg_diastolic: z.number().nullable(),
    avg_pulse: z.number().nullable(),
});