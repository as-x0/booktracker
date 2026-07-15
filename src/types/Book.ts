export interface Book {

    id: number

    title: string

    author_id: number

    genre_id: number

    cover_url: string

    publication_year: number

    original_language_id: number

    series_id?: number

    series_number?: number

    themes?: string

}