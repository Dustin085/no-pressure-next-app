import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

// 以登入時獲取的資料為主，見 AuthListener.tsx
export function useUser() {
    return useQuery<User | null>({
        queryKey: ['user'],
        queryFn: () => null,     // 不重要
        initialData: null,
        staleTime: Infinity,
    });
}
