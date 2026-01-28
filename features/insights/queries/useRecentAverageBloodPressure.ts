import { getAverageBloodPressureWithinTimeRange } from "@/lib/api/records";
import { useQuery } from "@tanstack/react-query";

export function useRecentAverageBloodPressure(days: number = 7) {
    const now = new Date();

    const start = new Date(now);
    start.setDate(now.getDate() - days);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setDate(now.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    const startISO = start.toISOString();
    const endISO = end.toISOString();

    return useQuery({
        queryKey: ['blood-pressure-records', 'recent-average-blood-pressure', days],
        queryFn: () => getAverageBloodPressureWithinTimeRange(startISO, endISO),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}