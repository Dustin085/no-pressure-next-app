import { supabase } from "@/lib/supabase/client";
import { QuickRecordFormData } from "@/features/record/types";

export async function createRecord(input: QuickRecordFormData) {

    // 1️⃣ 取得目前使用者
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Not authenticated');
    }

    // 2️⃣ 寫入資料（user_id 由這裡綁）
    const { data, error } = await supabase
        .from('blood_pressure_records')
        .insert({
            user_id: user.id,
            systolic: input.systolic,
            diastolic: input.diastolic,
            pulse: input.pulse ?? null,
            measured_at: input.measured_at,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}