import { supabase } from "../supabase/client";
import type { Book } from "../types/Book.ts"
import type { BookWithDetails } from "../types/BookWithDetails.ts";

export interface UpdateBookData {
    title?: string;
    authorId?: string;
    genreId?: string | null;
    publicationYear?: number | null;
    originalLanguageId?: string | null;
    seriesId?: string | null;
    seriesNumber?: number | null;
    themes?: string | null;
}

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
        themes?: string;

        publicationYear: number;
        originalLanguageId: string;

        seriesId?: string | null;
        seriesNumber?: number;
    }
): Promise<string> {

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
            themes: data.themes ?? null,
            publication_year: data.publicationYear,
            original_language_id: data.originalLanguageId,
            series_id: data.seriesId ?? null,
            series_number: data.seriesNumber ?? null
        })
        .select("id")
        .single();

    if(insertError){
        throw insertError;
    }

    return newBook.id;
}

export async function getBookById(
    id: string
): Promise<BookWithDetails | null> {

    const { data, error } = await supabase
        .from("books")
        .select(`
            *,
            author:authors(*),
            genre:genres(*),
            original_language:languages(*),
            series:series(*)
        `)
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data as BookWithDetails | null;
}

export async function updateBook(
    id: string,
    data: UpdateBookData
): Promise<void> {

    const updates: Record<string, unknown> = {};

    if (data.title !== undefined) {
        updates.title = data.title;
    }

    if (data.authorId !== undefined) {
        updates.author_id = data.authorId;
    }

    if (data.genreId !== undefined) {
        updates.genre_id = data.genreId;
    }

    if (data.publicationYear !== undefined) {
        updates.publication_year = data.publicationYear;
    }

    if (data.originalLanguageId !== undefined) {
        updates.original_language_id = data.originalLanguageId;
    }

    if (data.seriesId !== undefined) {
        updates.series_id = data.seriesId;
    }

    if (data.seriesNumber !== undefined) {
        updates.series_number = data.seriesNumber;
    }

    if (data.themes !== undefined) {
        updates.themes = data.themes;
    }

    const { error } = await supabase
        .from("books")
        .update(updates)
        .eq("id", id);

    if (error) {
        throw error;
    }
}