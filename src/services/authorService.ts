import { supabase } from "../supabase/client";
import type { Author } from "../types/Author";

export async function searchAuthors(
    query: string
): Promise<Author[]> {

    if (!query.trim()) {
        return [];
    }

    const { data, error } = await supabase
        .from("authors")
        .select("*")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(10);

    if (error) {
        throw error;
    }

    return data ?? [];
}

export async function findOrCreateAuthor(name: string, birthCountryId: string): Promise<string> {
    const { data: existingAuthor, error: searchError } = await supabase
        .from("authors")
        .select("id")
        .eq("name", name)
        .eq("birth_country_id", birthCountryId)
        .maybeSingle();

    if(searchError){
        throw searchError;
    }

    if(existingAuthor){
        return existingAuthor.id;
    }

    const { data: newAuthor, error: insertError } = await supabase
        .from("authors")
        .insert({
            name,
            birth_country_id: birthCountryId
        })
        .select("id")
        .single();

    if(insertError){
        throw insertError;
    }

    return newAuthor.id;
}