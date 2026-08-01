import { supabase } from "../supabase/client";
import type { WishlistWithDetails } from "../types/WishlistWithDetails";

export interface CreateWishlistData {
    bookId: string;
    availabilityId: string | null;
    recommendedBy?: string | null;
    notes?: string | null;
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
            notes: data.notes ?? null
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