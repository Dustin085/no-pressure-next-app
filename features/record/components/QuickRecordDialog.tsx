'use client'

import { bloodPressureRecordInputSchema } from "@/features/record/schema";
import { useCreateRecord } from "@/features/record/hooks/useCreateRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuickRecordFormData } from "@/features/record/types";

export function QuickRecordDialog() {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bloodPressureRecordInputSchema),
    });

    const mutation = useCreateRecord();

    const onSubmit = (data: QuickRecordFormData) => {
        const parsed = bloodPressureRecordInputSchema.parse(data);
        mutation.mutate(parsed, {
            onSuccess: () => {
                reset();
                setOpen(false); // 成功後關閉 Dialog
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size={"lg"}>快速紀錄</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>快速紀錄血壓</DialogTitle>
                    <DialogDescription>請填寫以下資訊，完成血壓紀錄。</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
                            type="number"
                            placeholder="例如：80"
                            {...register("diastolic", { valueAsNumber: true })}
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
                            type="number"
                            placeholder="例如：70"
                            {...register("pulse", { valueAsNumber: true })}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.pulse && (
                            <p className="text-xs text-error">{errors.pulse.message as string}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? "儲存中..." : "儲存"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
