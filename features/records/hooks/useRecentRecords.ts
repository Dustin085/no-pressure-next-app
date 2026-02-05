import { useAuth } from "@/features/auth/hooks/useAuth";
import { getRecentRecords } from "@/features/records/api";
import { useQuery } from "@tanstack/react-query";

export function useRecentRecords(limit = 5) {
    const { isAuthenticated, accessToken } = useAuth();

    return useQuery({
        queryKey: ['blood-pressure-records', 'recent', limit],
        enabled: isAuthenticated && !!accessToken, // 等待 token 準備好
        staleTime: 1000 * 60 * 5, // 5 分鐘
        queryFn: () => getRecentRecords(limit)
    });
}