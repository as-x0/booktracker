import { supabase } from "../supabase/client";
import type { Book } from "../types/Book";

export async function getBooks(): Promise<Book[]> {
    const { data, error } = await supabase
        .from("books")
        .select(`
            *,
            author:authors(*),
            genre:genres(*),
            readings(*)
        `);

    if(error){
        throw error;
    }

    return data as Book[];
}