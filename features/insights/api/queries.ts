import { averageBloodPressureSchema } from "@/features/record/schema";
import { supabase } from "@/lib/supabase/client";

type UTCISOString = string;

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