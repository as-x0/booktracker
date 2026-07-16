import { supabase } from "../supabase/client";
import type {Genre} from "../types/Genre.ts";

export async function getGenres(): Promise<Genre[]> {
    const { data, error } = await supabase
        .from("genres")
        .select("*");

    if (error) {
        throw error;
    }

    return data ?? [];
}