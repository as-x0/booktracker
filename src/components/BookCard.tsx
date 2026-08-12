import { useNavigate } from "react-router-dom";
import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";
import "./BookCard.css"

interface BookCardProps {
    reading: ReadingWithDetails;
}

function BookCard({reading}: BookCardProps) {
    const navigate = useNavigate();
    const book = reading.book;

    return (
        <div className="book-card"
            onClick={() => navigate(`/readings/${reading.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    navigate(`/readings/${reading.id}`);
                }
            }}
        >
            <img
                src={reading.cover_url ?? ""}
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