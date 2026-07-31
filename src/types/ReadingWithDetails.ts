import type { Reading } from "./Reading.ts";
import type { Book } from "./Book.ts";
import type { Status } from "./Status.ts";


export interface ReadingWithDetails extends Reading {
    book: Book;
    status: Status;
}