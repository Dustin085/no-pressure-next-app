import { averageBloodPressureSchema } from "@/features/records/schema";
import { QuickRecordFormData } from "@/features/records/types";
import { supabase } from "@/lib/supabase/client";

export async function getRecords() {
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
    const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('id, systolic, diastolic, pulse, measured_at')
        .eq('status', 'active')
        .order('measured_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
}

type UTCISOString = string;

/**
 * 取得某時間區間的血壓紀錄
 * @param startISO 當日 00:00:00
 * @param endISO 次日 00:00:00
 * @returns 時間區間內的血壓紀錄陣列
 */
export async function getRecordsWithinISORange(
    startISO: UTCISOString,
    endISO: UTCISOString // next day start
) {
    const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('id, systolic, diastolic, pulse, measured_at')
        .gte('measured_at', startISO)
        .lt('measured_at', endISO)
        .order('measured_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getAverageBloodPressureWithinTimeRange(
    startISO: UTCISOString,
    endISO: UTCISOString // next day start
) {
    const { data, error } = await supabase
        .rpc('get_average_blood_pressure', { start: startISO, end: endISO })
        .single();

    if (error) throw error;
    return averageBloodPressureSchema.parse(data);
}



// export type CreateRecordInput = {
//     systolic: number;
//     diastolic: number;
//     pulse?: number | null;
//     measured_at: string; // ISO string
// };

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