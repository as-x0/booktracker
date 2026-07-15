import type { Book } from "./Book"


export interface BookWithReading {
    book: Book
    author: string
    status: string
}