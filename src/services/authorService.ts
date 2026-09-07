import { supabase } from "../supabase/client";
import type {Author} from "../types/Author.ts";

export interface AuthorSearchResult extends Author {
    birth_country:{
        name: string;
    } | null;
}

export interface AuthorSearchResult extends Author {
    birth_country: {
        name: string;
    } | null;
}

export async function searchAuthors(
    query: string
): Promise<AuthorSearchResult[]> {

    if (!query.trim()) {
        return [];
    }

    const { data: authors, error } = await supabase
        .from("authors")
        .select("id, name, birth_country_id")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(10);

    if (error) {
        throw error;
    }

    if (!authors || authors.length === 0) {
        return [];
    }

    const countryIds = authors
        .map(author => author.birth_country_id)
        .filter((id): id is string => id !== null);

    if (countryIds.length === 0) {
        return authors.map(author => ({
            ...author,
            birth_country: null
        }));
    }

    const { data: countries, error: countryError } = await supabase
        .from("countries")
        .select("id, name")
        .in("id", countryIds);

    if (countryError) {
        throw countryError;
    }

    return authors.map(author => ({
        ...author,
        birth_country:
            countries?.find(
                country => country.id === author.birth_country_id
            ) ?? null
    }));
}

export async function findOrCreateAuthor(name: string, birthCountryId: string | null): Promise<string> {
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