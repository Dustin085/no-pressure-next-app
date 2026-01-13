import { getRecentRecords } from "@/lib/api/records";
import { useQuery } from "@tanstack/react-query";

export function useRecentRecords(limit = 5) {
    return useQuery({
        queryKey: ['records', 'recent', limit],
        queryFn: () => getRecentRecords(limit),
    });
}