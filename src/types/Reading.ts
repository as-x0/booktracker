export interface Reading {
    id: string;
    book_id: string;
    status_id: string;

    reading_language_id: string | null;

    pages_tot: number | null;
    pages_read: number | null;

    start_date: string | null;
    finish_date: string | null;

    rating: number | null;
    review: string | null;
    characters: string | null;
    dnf_reason: string | null;
}