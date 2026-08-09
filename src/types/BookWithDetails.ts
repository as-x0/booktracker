import type { Book } from "./Book";
import type { AuthorWithDetails } from "./AuthorWithDetails.ts";
import type { Genre } from "./Genre";
import type { Language } from "./Language";
import type { Series } from "./Series";

export interface BookWithDetails extends Book {
    author: AuthorWithDetails;
    genre: Genre;
    original_language: Language;
    series: Series | null;
}