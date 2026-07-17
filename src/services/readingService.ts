import { supabase } from "../supabase/client";

export interface CreateReadingData {
    bookId: string;
    statusId: string;
    readingLanguageId: string;

    pagesTot: number;
    pagesRead: number;

    startDate: string;
    finishDate?: string | null;

    rating?: number | null;
    review?: string | null;
    characters?: string | null;
    dnfReason?: string | null;
}

export async function createReading(data: CreateReadingData) {
    const { data: reading, error } = await supabase
        .from("readings")
        .insert({
            book_id: data.bookId,
            status_id: data.statusId,
            reading_language_id: data.readingLanguageId,
            pages_tot: data.pagesTot,
            pages_read: data.pagesRead,
            start_date: data.startDate,
            finish_date: data.finishDate ?? null,
            rating: data.rating ?? null,
            review: data.review ?? null,
            characters: data.characters ?? null,
            dnf_reason: data.dnfReason ?? null
        })
        .select("id")
        .single();

    if(error){
        throw error;
    }

    return reading.id;
}