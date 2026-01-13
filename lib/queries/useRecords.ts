import { getRecords } from "@/lib/api/records";
import { useQuery } from "@tanstack/react-query";

export function useRecords() {
    return useQuery({
        queryKey: ['records'],
        queryFn: getRecords,
    });
}