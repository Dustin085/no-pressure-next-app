import { createClient } from "@/lib/supabase/client";

export async function getRecords() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data;
}

export async function getRecentRecords(limit = 5) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('id, systolic, diastolic, pulse, measured_at')
        .eq('status', 'active')
        .order('measured_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
}

export type CreateRecordInput = {
    systolic: number;
    diastolic: number;
    pulse?: number | null;
    measured_at: string; // ISO string
};

export async function createRecord(input: CreateRecordInput) {
    const supabase = createClient();

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