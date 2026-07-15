import type { Book } from "../types/Book"
import type {BookWithReading} from "../types/BookWithReading.ts"

export const currentBook: Book = {
    id:1,
    title:"The Name of the Wind",
    author_id:1,
    genre_id:2,
    cover_url:"https://via.placeholder.com/150x220",
    publication_year:2007,
    original_language_id:1,
}

export const recentBooks = [
    {
        book:{
            id:2,
            title:"Dune",
            author_id:2,
            genre_id:2,
            cover_url: "https://via.placeholder.com/150x220",
            publication_year:1965,
            original_language_id:1,
        } satisfies Book,

        author: "Frank Herbert"
    },

    {
        book: {
            id: 3,
            title: "1984",
            author_id: 3,
            genre_id: 3,
            cover_url:"https://via.placeholder.com/150x220",
            publication_year: 1949,
            original_language_id: 1
        } satisfies Book,

        author: "George Orwell"
    },

    {
        book: {
            id: 4,
            title: "The Hobbit",
            author_id: 4,
            genre_id: 2,
            cover_url: "https://via.placeholder.com/150x220",
            publication_year: 1937,
            original_language_id: 1
        } satisfies Book,

        author: "J.R.R. Tolkien"
    }
]

export const monthlyGoal = {
    current:3,
    target:5,
}

export const booksTable: BookWithReading[] = [
    {
        book: {
            id: 1,
            title: "The Name of the Wind",
            author_id: 1,
            genre_id: 2,
            cover_url:"https://via.placeholder.com/150x220",
            publication_year: 2007,
            original_language_id: 1
        },
        author: "Patrick Rothfuss",
        status: "Currently reading"
    },

    {
        book: {
            id: 2,
            title: "Dune",
            author_id: 2,
            genre_id: 2,
            cover_url:"https://via.placeholder.com/150x220",
            publication_year: 1965,
            original_language_id: 1
        },
        author: "Frank Herbert",
        status: "Read"
    }
]