import type { ReadingWithDetails } from "../../types/ReadingWithDetails.ts";
import BookDetails from "../BookDetails/BookDetails.tsx";

import "./ReadingDetails.css";

interface ReadingDetailsProps {
    reading: ReadingWithDetails;
    onBack: () => void;
}

export default function ReadingDetails({
                                           reading,
                                           onBack
                                       }: ReadingDetailsProps) {

    return (
        <div className="reading-details">

            <button
                type="button"
                onClick={onBack}
            >
                ← Back
            </button>

            <h1>Reading Details</h1>

            <BookDetails
                book={reading.book}
            />

            <section className="reading-details-section">

                <h2>Reading Information</h2>

                <div className="reading-details-grid">

                    <div className="detail-field">
                        <span className="detail-label">
                            Status
                        </span>
                        <span className="detail-value">
                            {reading.status.name}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Reading language
                        </span>
                        <span className="detail-value">
                            {reading.reading_language_id ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Start date
                        </span>
                        <span className="detail-value">
                            {reading.start_date ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Finish date
                        </span>
                        <span className="detail-value">
                            {reading.finish_date ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Total pages
                        </span>
                        <span className="detail-value">
                            {reading.pages_tot ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Pages read
                        </span>
                        <span className="detail-value">
                            {reading.pages_read ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Rating
                        </span>
                        <span className="detail-value">
                            {reading.rating ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field">
                        <span className="detail-label">
                            Cover URL
                        </span>
                        <span className="detail-value">
                            {reading.cover_url ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field detail-field-full">
                        <span className="detail-label">
                            Review
                        </span>
                        <span className="detail-value">
                            {reading.review ?? "—"}
                        </span>
                    </div>

                    <div className="detail-field detail-field-full">
                        <span className="detail-label">
                            Characters
                        </span>
                        <span className="detail-value">
                            {reading.characters ?? "—"}
                        </span>
                    </div>

                    {reading.dnf_reason && (
                        <div className="detail-field detail-field-full">
                            <span className="detail-label">
                                DNF reason
                            </span>
                            <span className="detail-value">
                                {reading.dnf_reason}
                            </span>
                        </div>
                    )}

                </div>

            </section>

        </div>
    );
}