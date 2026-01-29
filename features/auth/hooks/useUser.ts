import { getUser } from "@/features/auth/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    return useQuery({
        queryKey: ["auth", "user"],
        queryFn: getUser,
        staleTime: Infinity,
    })
}