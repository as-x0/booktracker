import type {Book} from "../types/Book"
import "./BookCard.css"

interface BookCardProps {
    book: Book
    author: string
}


function BookCard({ book, author }: BookCardProps) {

    return (

        <div className="book-card">

            <img
                src={book.cover_url}
                alt={book.title}
            />

            <div>

                <h3>{book.title}</h3>

                <p>{author}</p>

            </div>

        </div>

    )

}


export default BookCard