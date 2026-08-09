import { supabase } from "../supabase/client";
import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";

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

    coverUrl: string | null;
}

export interface UpdateReadingData {
    statusId?: string;
    readingLanguageId?: string | null;

    pagesTot?: number | null;
    pagesRead?: number | null;

    startDate?: string | null;
    finishDate?: string | null;

    rating?: number | null;
    review?: string | null;
    characters?: string | null;
    dnfReason?: string | null;

    coverUrl?: string | null;
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
            dnf_reason: data.dnfReason ?? null,
            cover_url: data.coverUrl ?? null
        })
        .select("id")
        .single();

    if(error){
        throw error;
    }

    return reading.id;
}

export async function getReadings(): Promise<ReadingWithDetails[]>{
    const {data, error} = await supabase
        .from("readings")
        .select(`
            *,
            book:books(
                *,
                author:authors(*),
                genre:genres(*)
            ),
            status:reading_status(*)
        `)
    .order("start_date", { ascending: true });

    if(error){
        throw error;
    }

    console.log(data);

    return data as ReadingWithDetails[];
}

export async function getReadingById(id: string): Promise<ReadingWithDetails>{
    const {data, error} = await supabase
        .from("readings")
        .select(`
            *,
            book:books(
                *,
                author:authors(*),
                genre:genres(*),
                original_language:languages(*),
                series:series(*)
            ),
            status:reading_status(*),
            reading_language:languages(*)
        `)
        .eq("id", id)
        .single();

    if(error){
        throw error;
    }

    return data as ReadingWithDetails;
}

export async function updateReading(id: string, data: UpdateReadingData) {
    const { error } = await supabase
        .from("readings")
        .update({
            status_id: data.statusId,
            reading_language_id: data.readingLanguageId,
            pages_tot: data.pagesTot,
            pages_read: data.pagesRead,
            start_date: data.startDate,
            finish_date: data.finishDate,
            rating: data.rating,
            review: data.review,
            characters: data.characters,
            dnf_reason: data.dnfReason,
            cover_url: data.coverUrl
        })
        .eq("id", id);

    if(error){
        throw error;
    }
}