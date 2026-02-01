import { useAuth } from "@/features/auth/hooks/useAuth";
import { getRecentRecords } from "@/features/records/api";
import { BloodPressureRecord } from "@/features/records/types";
import { QueryFunctionContext, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRecentRecords(limit = 5) {
    const queryClient = useQueryClient();
    const { isAuthenticated, accessToken } = useAuth();

    return useQuery({
        queryKey: ['blood-pressure-records', 'recent', limit],
        enabled: isAuthenticated && !!accessToken, // 等待 token 準備好
        staleTime: 1000 * 60 * 5, // 5 分鐘
        queryFn: async ({ queryKey }: QueryFunctionContext) => {
            const requestedLimit = queryKey[2] as number;

            // 嘗試從更大範圍 cache 派生
            const cachedQueries = queryClient
                .getQueryCache()
                .getAll()
                .filter(q =>
                    q.queryKey[0] === 'blood-pressure-records' &&
                    q.queryKey[1] === 'recent' &&
                    typeof q.queryKey[2] === 'number' &&
                    (q.queryKey[2] as number) >= requestedLimit // 大於等於 limit
                );

            if (cachedQueries.length > 0) {
                // 選擇最大範圍 cache
                const largestCache = cachedQueries.sort(
                    (a, b) => (b.queryKey[2] as number) - (a.queryKey[2] as number)
                )[0];

                const data = largestCache.state.data as BloodPressureRecord[] | undefined;
                if (data?.length) return data.slice(0, requestedLimit); // 派生前 limit 筆
            }

            // 沒有可用 cache 或 cache 太小 → 正常發 request
            return getRecentRecords(requestedLimit);
        },
    });
}