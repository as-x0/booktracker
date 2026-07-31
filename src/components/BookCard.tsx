import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";
import "./BookCard.css"

interface BookCardProps {
    reading: ReadingWithDetails;
}

function BookCard({reading}: BookCardProps) {
    const book = reading.book;

    return (
        <div className="book-card">
            <img
                src={book.cover_url ?? ""}
                alt={book.title}
            />
            <div>
                <h3>{book.title}</h3>
                <p>{book.author.name}</p>
            </div>
        </div>
    )
}

export default BookCard