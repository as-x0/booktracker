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