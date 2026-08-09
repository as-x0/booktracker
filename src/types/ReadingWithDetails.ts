import type { Reading } from "./Reading.ts";
import type { BookWithDetails } from "./BookWithDetails.ts";
import type { Status } from "./Status.ts";
import type { Language } from "./Language.ts";

export interface ReadingWithDetails extends Reading {
    book: BookWithDetails;
    status: Status;
    reading_language: Language | null;
}