import { supabase } from "../supabase/client";
import type { Country } from "../types/Country";

export async function searchCountries(
    query: string
): Promise<Country[]> {

    if (!query.trim()) {
        return [];
    }

    const { data, error } = await supabase
        .from("countries")
        .select("*")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(10);

    if (error) {
        throw error;
    }

    return data ?? [];
}