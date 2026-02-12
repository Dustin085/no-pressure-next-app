import { supabase } from "@/lib/supabase/client";

export async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}

export async function getUserName() {
    const { data } = await supabase
        .from('profiles')
        .select('name')
        .single();

    return data?.name || "使用者";
};