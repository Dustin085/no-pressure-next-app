'use client'
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { QuickRecordFormData, QuickRecordFormInput } from "@/features/records/types";
import { ChangeEvent } from "react";

type QuickRecordFormProps = {
    form: UseFormReturn<QuickRecordFormInput, unknown, QuickRecordFormData>;
    onSubmit: (data: QuickRecordFormData) => void;
    isPending: boolean
}

export function QuickRecordForm({ form, onSubmit, isPending }: QuickRecordFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    // 管理 auto focus 的規則
    const autoFocusRules: Record<
        keyof QuickRecordFormInput,
        // 使用者填入 autoFocusRange 範圍內的數字時會 setFocus(next)
        { maxLength?: number; autoFocusRange?: { min: number, max: number }; next?: keyof QuickRecordFormInput }
    > = {
        systolic: { maxLength: 3, autoFocusRange: { min: 30, max: 100 }, next: "diastolic" },
        diastolic: { maxLength: 3, autoFocusRange: { min: 30, max: 100 }, next: "pulse" },
        pulse: { maxLength: 3 },
        measured_at: {},
    };

    const handleAutoFocus = (
        e: ChangeEvent<HTMLInputElement>,
        field: keyof QuickRecordFormInput
    ) => {
        const rule = autoFocusRules[field]
        if (!rule.next) return

        const value = e.target.value
        if (!value) return

        // 到達或超過最大長度則 setFocus
        if (rule.maxLength && value.length >= rule.maxLength) {
            form.setFocus(rule.next);
        }

        // 處理 autoFocusRange
        if (!rule.autoFocusRange) return
        const valueNum = Number(value);
        if (valueNum > rule.autoFocusRange.min && valueNum < rule.autoFocusRange.max) {
            form.setFocus(rule.next)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            {/* 收縮壓 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="systolic" className="text-sm font-medium text-gray-700">
                    收縮壓（mmHg）
                </label>
                <input
                    id="systolic"
                    placeholder="例如：120"
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    {...register("systolic", {
                        setValueAs: v => v === "" ? undefined : Number(v),
                        onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                            handleAutoFocus(e, "systolic");
                        }
                    })}
                    onFocus={e => e.target.select()}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.systolic && (
                    <p className="text-xs text-error">{errors.systolic.message as string}</p>
                )}
            </div>

            {/* 舒張壓 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="diastolic" className="text-sm font-medium text-gray-700">
                    舒張壓（mmHg）
                </label>
                <input
                    id="diastolic"
                    placeholder="例如：80"
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    {...register("diastolic", {
                        setValueAs: v => v === "" ? undefined : Number(v),
                        onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                            handleAutoFocus(e, "diastolic");
                        }
                    })}
                    onFocus={e => e.target.select()}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.diastolic && (
                    <p className="text-xs text-error">{errors.diastolic.message as string}</p>
                )}
            </div>

            {/* 心跳 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="pulse" className="text-sm font-medium text-gray-700">
                    心跳（次/分鐘，可選）
                </label>
                <input
                    id="pulse"
                    placeholder="例如：70"
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    {...register("pulse", {
                        // Number('') 會 return 0
                        setValueAs: v => v === "" ? undefined : Number(v),
                        onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                            handleAutoFocus(e, "pulse");
                        }
                    })}
                    onFocus={e => e.target.select()}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.pulse && (
                    <p className="text-xs text-error">{errors.pulse.message as string}</p>
                )}
            </div>

            {/* 時間紀錄欄位 */}
            <div className="flex flex-col gap-1">
                <label htmlFor="measured_at" className="text-sm font-medium text-gray-700">紀錄時間</label>
                <input
                    id="measured_at"
                    type="datetime-local"
                    {...register("measured_at")}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.measured_at && (
                    <p className="text-xs text-error">
                        {errors.measured_at.message}
                    </p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "儲存中..." : "儲存"}
            </Button>
        </form>
    );
}

