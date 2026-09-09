import type { Quote } from "./Quote.ts";
import type { BookWithDetails } from "./BookWithDetails.ts";
import type { Reading } from "./Reading.ts";

export interface QuoteWithDetails extends Quote {
    reading: Reading & {
        book: BookWithDetails;
    };
}