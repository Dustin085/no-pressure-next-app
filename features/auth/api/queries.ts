import { supabase } from "@/lib/supabase/client";

export async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}