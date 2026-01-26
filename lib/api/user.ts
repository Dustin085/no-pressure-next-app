import { supabase } from "@/lib/supabase/client";


export async function fetchUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}