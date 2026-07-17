import { supabase } from "../supabase/client";
import type { Series } from "../types/Series";

export async function searchSeries(
    query: string
): Promise<Series[]> {

    if (!query.trim()) {
        return [];
    }

    const { data, error } = await supabase
        .from("series")
        .select("*")
        .ilike("title", `%${query}%`)
        .order("title")
        .limit(10);

    if (error) {
        throw error;
    }

    return data ?? [];
}

export async function findOrCreateSeries(name: string): Promise<string> {
    const {data:existingSeries, error:searchError} = await supabase
        .from("series")
        .select("id")
        .eq("name", name)
        .maybeSingle();

    if(searchError) {
        throw searchError;
    }

    if (existingSeries) {
        return existingSeries.id;
    }

    const {data:newSeries, error:insertError} = await supabase
        .from("series")
        .insert({name})
        .select("id")
        .single();

    if(insertError) {
        throw insertError;
    }

    return newSeries.id;
}