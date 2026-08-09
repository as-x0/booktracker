import type { ReadingWithDetails } from "../../../types/ReadingWithDetails";
import Button from "../../../components/common/Button";

interface ReadingDetailsSectionProps {
    reading: ReadingWithDetails;
    onEdit: () => void;
}

export default function ReadingDetailsSection({
                                                  reading,
                                                  onEdit
                                              }: ReadingDetailsSectionProps) {

    const isDnf =
        reading.status.name.toLowerCase() === "dnf";

    return (
        <section className="reading-details-section">

            <div className="details-section-header">
                <h2>Reading Information</h2>

                <Button
                    type="button"
                    onClick={onEdit}
                >
                    Edit
                </Button>
            </div>

            {reading.cover_url ? (
                <img
                    src={reading.cover_url}
                    alt={`Cover of ${reading.book.title}`}
                    className="reading-cover"
                />
            ) : (
                <div className="reading-cover-placeholder">
                    No cover
                </div>
            )}

            <p>
                <strong>Status:</strong>{" "}
                {reading.status.name}
            </p>

            <p>
                <strong>Reading language:</strong>{" "}
                {reading.reading_language?.name ?? "—"}
            </p>

            <p>
                <strong>Start date:</strong>{" "}
                {reading.start_date ?? "—"}
            </p>

            <p>
                <strong>Finish date:</strong>{" "}
                {reading.finish_date ?? "—"}
            </p>

            <p>
                <strong>Pages:</strong>{" "}
                {reading.pages_read ?? "—"} /{" "}
                {reading.pages_tot ?? "—"}
            </p>

            <p>
                <strong>Rating:</strong>{" "}
                {reading.rating ?? "—"}
            </p>

            <p>
                <strong>Review:</strong>{" "}
                {reading.review || "—"}
            </p>

            <p>
                <strong>Characters:</strong>{" "}
                {reading.characters || "—"}
            </p>

            {isDnf && (
                <p>
                    <strong>DNF reason:</strong>{" "}
                    {reading.dnf_reason || "—"}
                </p>
            )}

        </section>
    );
}