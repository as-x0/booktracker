import type { Book } from "../../types/Book.ts";
import "./BookDetails.css";

interface BookDetailsProps {
    book: Book;
}

export default function BookDetails({
                                        book
                                    }: BookDetailsProps) {

    return (
        <section className="book-details">

            <h2>Book Information</h2>

            <div className="book-details-grid">

                <div className="detail-field">
                    <span className="detail-label">
                        Title
                    </span>
                    <span className="detail-value">
                        {book.title}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Author
                    </span>
                    <span className="detail-value">
                        {book.author.name}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Genre
                    </span>
                    <span className="detail-value">
                        {book.genre?.name ?? "—"}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Publication year
                    </span>
                    <span className="detail-value">
                        {book.publication_year ?? "—"}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Original language
                    </span>
                    <span className="detail-value">
                        {book.original_language_id ?? "—"}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Series
                    </span>
                    <span className="detail-value">
                        {book.series_id ?? "—"}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Series number
                    </span>
                    <span className="detail-value">
                        {book.series_number ?? "—"}
                    </span>
                </div>

                <div className="detail-field">
                    <span className="detail-label">
                        Themes
                    </span>
                    <span className="detail-value">
                        {book.themes ?? "—"}
                    </span>
                </div>

            </div>

        </section>
    );
}