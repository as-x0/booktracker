import type { Author } from "./Author";
import type { Country } from "./Country";

export interface AuthorWithDetails extends Author {
    birth_country: Country | null;
}