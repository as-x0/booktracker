export interface Wishlist {
    id: string;
    book_id: string;
    availability_id: string | null;
    recommended_by: string | null;
    notes: string | null;
    started_at: string | null;
}