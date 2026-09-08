export interface Quote {
    id: string;
    reading_id: string;
    text: string;
    page: number | null;
    notes: string | null;
}