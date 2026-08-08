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


export async function findOrCreateLanguage(
    name: string
): Promise<string> {

    const trimmedName = name.trim();

    if (!trimmedName) {
        throw new Error("Language name is required");
    }

    // Cerca una lingua già esistente
    const { data: existingLanguage, error: searchError } =
        await supabase
            .from("languages")
            .select("id")
            .ilike("name", trimmedName)
            .maybeSingle();

    if (searchError) {
        throw searchError;
    }

    if (existingLanguage) {
        return existingLanguage.id;
    }

    // La lingua non esiste: la creo
    const { data: newLanguage, error: insertError } =
        await supabase
            .from("languages")
            .insert({
                name: trimmedName,
                code: trimmedName.toLowerCase()
            })
            .select("id")
            .single();

    if (insertError) {
        throw insertError;
    }

    return newLanguage.id;
}