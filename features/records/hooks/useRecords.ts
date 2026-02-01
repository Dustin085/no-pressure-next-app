import { useAuth } from "@/features/auth/hooks/useAuth";
import { getRecords } from "@/features/records/api";
import { useQuery } from "@tanstack/react-query";

export function useRecords() {
    const { isAuthenticated, accessToken } = useAuth();

    return useQuery({
        queryKey: ['blood-pressure-records', 'all-records'],
        enabled: isAuthenticated && !!accessToken, // 等待 token 準備好
        queryFn: getRecords,
    });
}