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

export async function findOrCreateCountry(
    name: string
): Promise<string> {

    const { data: existing, error: searchError } = await supabase
        .from("countries")
        .select("id")
        .eq("name", name)
        .maybeSingle();

    if(searchError){
        throw searchError;
    }

    if(existing){
        return existing.id;
    }

    const {data: created, error: insertError} = await supabase
        .from("countries")
        .insert({name,})
        .select("id")
        .single();

    if(insertError){
        throw insertError;
    }

    return created.id;
}