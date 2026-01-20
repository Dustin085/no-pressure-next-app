import { fetchUser } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    return useQuery({
        queryKey: ["auth", "user"],
        queryFn: fetchUser,
        staleTime: Infinity,
    })
}