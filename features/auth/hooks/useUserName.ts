import { getUserName } from "@/features/auth/api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export function useUserName() {
    const { isAuthenticated, accessToken } = useAuth();

    return useQuery({
        queryKey: ['user-profile', 'user-name'],
        enabled: isAuthenticated && !!accessToken, // 等待 token 準備好
        queryFn: getUserName,
    });
}