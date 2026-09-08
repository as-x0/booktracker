import { supabase } from "../supabase/client";

export async function createQuote(
    readingId: string,
    text: string,
    page: number | null,
    notes: string | null
) {
    const { data, error } = await supabase
        .from("quotes")
        .insert({
            reading_id: readingId,
            text,
            page,
            notes
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
    page: number | null,
    notes: string | null
) {
    const { data, error } = await supabase
        .from("quotes")
        .update({
            text,
            page,
            notes
        })
        .eq("id", quoteId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}