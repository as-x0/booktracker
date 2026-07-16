import {supabase} from "../supabase/client.ts";
import type {Language} from "../types/Language.ts";

export async function searchLanguages(query:string): Promise<Language[]> {
    if (!query.trim()) {
        return [];
    }

    const {data, error} = await supabase
        .from("languages")
        .select("*")

        .ilike("name", `%${query}%`)
        .limit(10);

    if (error){
        throw error;
    }

    return data ?? [];
}