import type { BookWithDetails } from "../../../types/BookWithDetails";
import Button from "../../../components/common/Button";

import "./BookDetailsSection.css"

interface BookDetailsSectionProps {
    book: BookWithDetails;
    onEdit: () => void;
}

export default function BookDetailsSection({
                                               book,
                                               onEdit
                                           }: BookDetailsSectionProps) {
    return (
        <section className="book-details-section">
            <div className="book-details-section-header">
                <h2>Book Information</h2>

                <Button
                    type="button"
                    onClick={onEdit}
                >
                    Edit
                </Button>
            </div>

            <div className="book-details-grid">
                {book.genre?.name && (
                    <p className="book-detail">
                        <strong>Genre:</strong>{" "}
                        {book.genre.name}
                    </p>
                )}

                {book.themes && (
                    <p className="book-detail">
                        <strong>Themes:</strong>{" "}
                        {book.themes}
                    </p>
                )}

                {book.publication_year && (
                    <p className="book-detail">
                        <strong>Publication year:</strong>{" "}
                        {book.publication_year}
                    </p>
                )}

                {book.original_language?.name && (
                    <p className="book-detail">
                        <strong>Original language:</strong>{" "}
                        {book.original_language.name}
                    </p>
                )}

                {book.series?.name && (
                    <p className="book-detail">
                        <strong>Series:</strong>{" "}
                        {book.series.name}
                    </p>
                )}

                {book.series_number !== null &&
                    book.series_number !== undefined && (
                        <p className="book-detail">
                            <strong>Series number:</strong>{" "}
                            {book.series_number}
                        </p>
                    )}
            </div>
        </section>
    );
}