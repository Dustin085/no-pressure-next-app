import { supabase } from "@/lib/supabase/client";
import z from "zod";

export async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}

export async function getUserName() {
    const { data, error } = await supabase
        .from('users')
        .select('name')
        .single();

    if (error) throw error;

    return z.string().nullable().parse(data?.name) ?? "使用者";
};