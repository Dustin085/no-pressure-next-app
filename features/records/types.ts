import { bloodPressureRecordInputSchema, bloodPressureRecordSchema } from "@/features/records/schema";
import z from "zod";

export type QuickRecordFormInput = z.input<typeof bloodPressureRecordInputSchema>;
export type QuickRecordFormData = z.output<typeof bloodPressureRecordInputSchema>;

export type BloodPressureRecord = z.infer<
    typeof bloodPressureRecordSchema
>;