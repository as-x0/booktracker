export interface Reading {

    id: number

    book_id: number

    pages_tot: number

    pages_read: number

    reading_language_id: number

    start_date: string

    finish_date?: string

    rating?: number

    review?: string

    characters?: string

    dnf_reason?: string

}