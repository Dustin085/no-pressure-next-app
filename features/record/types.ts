import { recordSchema } from "@/features/record/schema";
import z from "zod";

export type QuickRecordFormInput = z.input<typeof recordSchema>;
export type QuickRecordFormData = z.output<typeof recordSchema>;