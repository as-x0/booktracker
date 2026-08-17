import { supabase } from "../supabase/client";
import type { WishlistWithDetails } from "../types/WishlistWithDetails";

export interface CreateWishlistData {
    bookId: string;
    availabilityId: string | null;
    recommendedBy?: string | null;
    notes?: string | null;
}

export interface UpdateWishlistData {
    availabilityId?: string | null;
    recommendedBy?: string | null;
    notes?: string | null;
    startedAt?: string | null;
}

export async function createWishlist(
    data: CreateWishlistData
) {
    const { data: wishlist, error } = await supabase
        .from("wishlist")
        .insert({
            book_id: data.bookId,
            availability_id: data.availabilityId,
            recommended_by: data.recommendedBy ?? null,
            notes: data.notes ?? null,
            started_at: null
        })
        .select("id")
        .single();

    if (error) {
        throw error;
    }

    return wishlist.id;
}

export async function getWishlist(): Promise<WishlistWithDetails[]> {
    const { data, error } = await supabase
        .from("wishlist")
        .select(`
            *,
            book:books(
                *,
                author:authors(*),
                genre:genres(*)
            ),
            availability:availability(*)
        `)
        .order("title", {
            referencedTable: "books",
            ascending: true
        });

    if (error) {
        throw error;
    }

    return data as WishlistWithDetails[];
}

export async function getWishlistById(id: string): Promise<WishlistWithDetails | null> {
    const { data, error } = await supabase
        .from("wishlist")
        .select(`
            *,
            book:books(
                *,
                author:authors(*),
                genre:genres(*),
                original_language:languages(*),
                series:series(*)
            ),
            availability:availability(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    return data as WishlistWithDetails | null;
}

export async function updateWishlist(
    id: string,
    data: UpdateWishlistData
) {
    const updates: Record<string, unknown> = {};
    if (data.availabilityId !== undefined) {
        updates.availability_id = data.availabilityId;
    }

    if (data.recommendedBy !== undefined) {
        updates.recommended_by = data.recommendedBy;
    }

    if (data.notes !== undefined) {
        updates.notes = data.notes;
    }

    if (data.startedAt !== undefined) {
        updates.started_at = data.startedAt;
    }

    const { error } = await supabase
        .from("wishlist")
        .update(updates)
        .eq("id", id);

    if (error) {
        throw error;
    }
}