import type { Book } from "./Book";
import type { Language } from "./Language";
import type { Series } from "./Series";

export interface BookWithDetails extends Book {
    original_language: Language | null;
    series: Series | null;
}