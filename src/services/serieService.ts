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