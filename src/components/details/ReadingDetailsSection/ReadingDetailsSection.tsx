import type { ReadingWithDetails } from "../../../types/ReadingWithDetails";
import Button from "../../../components/common/Button";

import "./ReadingDetailsSection.css"

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

            <div className="reading-details-section-header">
                <h2>Reading Information</h2>

                <Button
                    type="button"
                    onClick={onEdit}
                >
                    Edit
                </Button>
            </div>

            <div className="reading-details-grid">

                {reading.status?.name && (
                    <p className="reading-detail">
                        <strong>Status:</strong>{" "}
                        {reading.status.name}
                    </p>
                )}

                {reading.reading_language?.name && (
                    <p className="reading-detail">
                        <strong>Reading language:</strong>{" "}
                        {reading.reading_language.name}
                    </p>
                )}

                {reading.start_date && (
                    <p className="reading-detail">
                        <strong>Start date:</strong>{" "}
                        {reading.start_date}
                    </p>
                )}

                {reading.finish_date && (
                    <p className="reading-detail">
                        <strong>Finish date:</strong>{" "}
                        {reading.finish_date}
                    </p>
                )}

                {reading.pages_tot !== null &&
                    reading.pages_tot !== undefined && (
                        <p className="reading-detail">
                            <strong>Total pages:</strong>{" "}
                            {reading.pages_tot}
                        </p>
                    )}

                {reading.pages_read !== null &&
                    reading.pages_read !== undefined && (
                        <p className="reading-detail">
                            <strong>Pages read:</strong>{" "}
                            {reading.pages_read}
                        </p>
                    )}

                {reading.rating !== null &&
                    reading.rating !== undefined && (
                        <p className="reading-detail">
                            <strong>Rating:</strong>{" "}
                            {reading.rating}
                        </p>
                    )}

                {reading.review && (
                    <p className="reading-detail reading-detail-full">
                        <strong>Review:</strong>{" "}
                        {reading.review}
                    </p>
                )}

                {reading.characters && (
                    <p className="reading-detail reading-detail-full">
                        <strong>Characters:</strong>{" "}
                        {reading.characters}
                    </p>
                )}

                {isDnf && reading.dnf_reason && (
                    <p className="reading-detail reading-detail-full">
                        <strong>DNF reason:</strong>{" "}
                        {reading.dnf_reason}
                    </p>
                )}

            </div>
        </section>
    );
}