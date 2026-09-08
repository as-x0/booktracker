import { supabase } from "../supabase/client";

export async function createQuote(
    readingId: string,
    text: string,
    page: number | null
) {
    const { data, error } = await supabase
        .from("quotes")
        .insert({
            reading_id: readingId,
            text,
            page
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function updateQuote(
    quoteId: string,
    text: string,
    page: number | null
) {
    const { data, error } = await supabase
        .from("quotes")
        .update({
            text,
            page
        })
        .eq("id", quoteId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}