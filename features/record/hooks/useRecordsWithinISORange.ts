import { getRecordsWithinISORange } from "@/features/record/api";
import { useQuery } from "@tanstack/react-query";

export function useRecordsWithinISORange(startISO: string, endISO: string) {
    const today = new Date().toDateString();
    const start = new Date(startISO).toDateString();
    const end = new Date(endISO).toDateString();
    const isTodayIncluded = start === today || end === today;
    return useQuery({
        queryKey: ['blood-pressure-records', 'ISO-range', startISO, endISO],
        queryFn: () => getRecordsWithinISORange(startISO, endISO),
        staleTime: isTodayIncluded ? 1000 * 60 * 5 : Infinity, // 如果包含今天的資料，5 分鐘內視為新鮮，否則無限新鮮
    })
}