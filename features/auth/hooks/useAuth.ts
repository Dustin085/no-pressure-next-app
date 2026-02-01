import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// useAuth.tsx
export function useAuth() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return {
        session,
        user: session?.user ?? null,
        accessToken: session?.access_token ?? null,
        isLoading: session === null,           // 還沒初始化完
        isAuthenticated: !!session?.user,
    };
}