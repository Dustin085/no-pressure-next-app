'use client'
import { bloodPressureRecordInputSchema } from "@/features/record/schema";
import { useCreateRecord } from "@/features/record/hooks/useCreateRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function QuickRecordForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm({
        resolver: zodResolver(bloodPressureRecordInputSchema),
    });

    const mutation = useCreateRecord()

    return (
        <form
            onSubmit={handleSubmit((data) => {
                const parsed = bloodPressureRecordInputSchema.parse(data)
                mutation.mutate(parsed)
                reset();
            })}
            className="space-y-4 max-w-sm"
        >
            {/* 收縮壓 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="systolic" className="text-sm font-medium text-gray-700">
                    收縮壓（mmHg）
                </label>
                <input
                    id="systolic"
                    type="number"
                    placeholder="例如：120"
                    {...register("systolic", { valueAsNumber: true })}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.systolic && (
                    <p className="text-xs text-red-600">{errors.systolic.message as string}</p>
                )}
            </div>

            {/* 舒張壓 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="diastolic" className="text-sm font-medium text-gray-700">
                    舒張壓（mmHg）
                </label>
                <input
                    id="diastolic"
                    type="number"
                    placeholder="例如：80"
                    {...register("diastolic", { valueAsNumber: true })}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.diastolic && (
                    <p className="text-xs text-red-600">{errors.diastolic.message as string}</p>
                )}
            </div>

            {/* 心跳 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="pulse" className="text-sm font-medium text-gray-700">
                    心跳（次/分鐘，可選）
                </label>
                <input
                    id="pulse"
                    type="number"
                    placeholder="例如：70"
                    {...register("pulse", { valueAsNumber: true })}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.pulse && (
                    <p className="text-xs text-red-600">{errors.pulse.message as string}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "儲存中..." : "儲存"}
            </button>
        </form>
    );
}

