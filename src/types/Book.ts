import type {Author} from "./Author.ts";
import type {Genre} from "./Genre.ts";
import type {Reading} from "./Reading.ts";

export interface Book {
    id: string;
    title: string;
    author: Author;
    genre: Genre | null;

    publication_year: number | null;
    original_language_id: string | null;

    series_id: string | null;
    series_number: number | null;

    themes: string | null;

    cover_url: string | null;
    readings: Reading[];
}