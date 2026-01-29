import { getRecords } from "@/features/record/api";
import { useQuery } from "@tanstack/react-query";

export function useRecords() {
    return useQuery({
        queryKey: ['blood-pressure-records','all-records'],
        queryFn: getRecords,
    });
}