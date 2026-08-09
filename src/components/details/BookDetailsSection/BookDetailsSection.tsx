import type { BookWithDetails } from "../../../types/BookWithDetails";

interface BookDetailsSectionProps {
    book: BookWithDetails;
    onEdit: () => void;
}

export default function BookDetailsSection({
                                               book,
                                               onEdit
                                           }: BookDetailsSectionProps) {
    return (
        <section>
            <div>
                <h2>Book Information</h2>

                <button
                    type="button"
                    onClick={onEdit}
                >
                    Edit
                </button>
            </div>

            <p>
                <strong>Title:</strong>{" "}
                {book.title}
            </p>

            <p>
                <strong>Author:</strong>{" "}
                {book.author.name}
            </p>

            <p>
                <strong>Birth country:</strong>{" "}
                {book.author.birth_country?.name ?? "—"}
            </p>

            <p>
                <strong>Genre:</strong>{" "}
                {book.genre.name}
            </p>

            <p>
                <strong>Themes:</strong>{" "}
                {book.themes || "—"}
            </p>

            <p>
                <strong>Publication year:</strong>{" "}
                {book.publication_year ?? "—"}
            </p>

            <p>
                <strong>Original language:</strong>{" "}
                {book.original_language?.name ?? "—"}
            </p>

            <p>
                <strong>Series:</strong>{" "}
                {book.series?.name ?? "—"}
            </p>

            <p>
                <strong>Series number:</strong>{" "}
                {book.series_number ?? "—"}
            </p>
        </section>
    );
}