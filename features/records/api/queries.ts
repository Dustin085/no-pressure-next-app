import { bloodPressureRecordListSchema } from "@/features/records/schema";
import { supabase } from "@/lib/supabase/client";

/**
 * 取得全部血壓紀錄
 * @returns 全部血壓紀錄陣列，依建立時間由近到遠排序
 */
export async function getRecords() {
    const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    return bloodPressureRecordListSchema.parse(data);
}

/**
 * 取得最近的血壓紀錄
 * @param limit 取多少筆，預設 5 筆
 * @returns 最近的血壓紀錄陣列，日期由近到遠排序
 */
export async function getRecentRecords(limit = 5) {
    const { data, error } = await supabase
        .from('blood_pressure_records')
        .select('id, systolic, diastolic, pulse, measured_at')
        .eq('status', 'active')
        .order('measured_at', { ascending: false })
        .limit(limit);

    if (error) throw error;

    return bloodPressureRecordListSchema.parse(data);
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
    return bloodPressureRecordListSchema.parse(data);
}