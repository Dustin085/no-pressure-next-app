'use client'

import { bloodPressureRecordInputSchema } from "@/features/records/schema";
import { useCreateRecord } from "@/features/records/hooks/useCreateRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuickRecordFormData, QuickRecordFormInput } from "@/features/records/types";
import { QuickRecordForm } from "@/features/records/components/QuickRecordForm";
import { getLocalDateTimeValue } from "@/lib/utils";

export function QuickRecordDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm<QuickRecordFormInput, unknown, QuickRecordFormData>({
        resolver: zodResolver(bloodPressureRecordInputSchema),
        defaultValues: {
            measured_at: getLocalDateTimeValue(),
        },
    });

    const mutation = useCreateRecord();

    const onSubmit = (data: QuickRecordFormData) => {
        mutation.mutate(data, {
            onSuccess: () => {
                form.reset();
                setOpen(false); // 成功後關閉 Dialog
            },
        });
    };

    useEffect(() => {
        if (open) {
            form.reset({
                systolic: undefined,
                diastolic: undefined,
                pulse: undefined,
                measured_at: getLocalDateTimeValue(),
            });
        }
    }, [form, open]);

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

                <QuickRecordForm
                    form={form}
                    onSubmit={onSubmit}
                    isPending={mutation.isPending}
                />

            </DialogContent>
        </Dialog>
    );
}
