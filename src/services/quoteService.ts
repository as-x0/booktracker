import { supabase } from "../supabase/client";

import type { QuoteWithDetails } from "../types/QuoteWithDetails.ts";

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

export async function getQuotes(): Promise<QuoteWithDetails[]> {
    const { data, error } = await supabase
        .from("quotes")
        .select(`
            *,
            reading:readings(
                *,
                book:books(
                    *,
                    author:authors(*)
                )
            )
        `);

    if (error) {
        throw error;
    }

    return data as QuoteWithDetails[];
}