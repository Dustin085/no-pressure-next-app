import { createClient } from "@/lib/supabase/client";


export async function fetchUser() {
    const supabase = createClient();
    const {data} = await supabase.auth.getUser();
    return data.user;
}