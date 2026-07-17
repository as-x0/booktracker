import { supabase } from "../supabase/client";
import type { Book } from "../types/Book";
import {findOrCreateSeries} from "./seriesService.ts";

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

export async function findOrCreateBook(
    data: {
        title: string;
        authorId: string;
        genreId: string;
        publicationYear: number;
        originalLanguageId: string;

        seriesName?: string;
        seriesNumber?: number;

        themes?: string;
    }
): Promise<string> {
    let seriesId = null;

    if(data.seriesName){
        seriesId = await findOrCreateSeries(
            data.seriesName
        );
    }

    const { data: existingBook, error: searchError } = await supabase
        .from("books")
        .select("id")
        .eq("title", data.title)
        .eq("author_id", data.authorId)
        .eq(
            "publication_year",
            data.publicationYear
        )
        .eq(
            "original_language_id",
            data.originalLanguageId
        )
        .maybeSingle();

    if(searchError){
        throw searchError;
    }

    if(existingBook){
        return existingBook.id;
    }

    const { data: newBook, error: insertError } = await supabase
        .from("books")
        .insert({
            title: data.title,
            author_id: data.authorId,
            genre_id: data.genreId,
            publication_year: data.publicationYear,
            original_language_id: data.originalLanguageId,
            series_id: seriesId,
            series_number: data.seriesNumber ?? null,
            themes: data.themes ?? null
        })
        .select("id")
        .single();

    if(insertError){
        throw insertError;
    }

    return newBook.id;
}