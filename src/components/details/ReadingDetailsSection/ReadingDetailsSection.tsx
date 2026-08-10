import { useState } from "react";

import type { ReadingWithDetails } from "../../../types/ReadingWithDetails";
import { updateReading } from "../../../services/readingService";

import useStatuses from "../../../hooks/useStatuses";
import useLanguages from "../../../hooks/useLanguages";

import Button from "../../../components/common/Button";
import SelectInput from "../../../components/common/SelectInput";
import AutocompleteInput from "../../../components/common/AutocompleteInput";
import RatingInput from "../../../components/common/RatingInput/RatingInput";

import "./ReadingDetailsSection.css";

interface ReadingDetailsSectionProps {
    reading: ReadingWithDetails;
    onSaved: () => void;
}

interface EditingReading {
    statusId: string;
    readingLanguageId: string | null;

    pagesTot: number | null;
    pagesRead: number | null;

    startDate: string | null;
    finishDate: string | null;

    rating: number | null;
    review: string | null;
    characters: string | null;
    dnfReason: string | null;

    coverUrl: string | null;
}

function createEditingReading(
    reading: ReadingWithDetails
): EditingReading {
    return {
        statusId: reading.status.id,

        readingLanguageId:
            reading.reading_language?.id ?? null,

        pagesTot: reading.pages_tot,
        pagesRead: reading.pages_read,

        startDate: reading.start_date,
        finishDate: reading.finish_date,

        rating: reading.rating,
        review: reading.review,
        characters: reading.characters,
        dnfReason: reading.dnf_reason,

        coverUrl: reading.cover_url
    };
}

export default function ReadingDetailsSection({
    reading,
    onSaved
}: ReadingDetailsSectionProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] =
        useState<EditingReading | null>(null);

    const [languageQuery, setLanguageQuery] =
        useState("");

    const [saving, setSaving] = useState(false);

    const statuses = useStatuses();
    const languages = useLanguages(languageQuery);

    function handleEdit() {
        setFormData(
            createEditingReading(reading)
        );

        setIsEditing(true);
    }

    function handleCancel() {
        setFormData(null);
        setIsEditing(false);
    }

    function updateField<K extends keyof EditingReading>(
        field: K,
        value: EditingReading[K]
    ) {
        setFormData(previous => {
            if (!previous) {
                return previous;
            }

            return {
                ...previous,
                [field]: value
            };
        });
    }

    async function handleSave() {
        if (!formData) {
            return;
        }

        try {
            setSaving(true);

            const selectedStatus =
                statuses.find(
                    status =>
                        status.id === formData.statusId
                );

            const isDnf =
                selectedStatus?.name.toLowerCase() === "dnf";

            await updateReading(
                reading.id,
                {
                    statusId: formData.statusId,

                    readingLanguageId:
                        formData.readingLanguageId,

                    pagesTot: formData.pagesTot,
                    pagesRead: formData.pagesRead,

                    startDate: formData.startDate,
                    finishDate: formData.finishDate,

                    rating: formData.rating,
                    review: formData.review,
                    characters: formData.characters,

                    dnfReason: isDnf
                        ? formData.dnfReason
                        : null,

                    coverUrl: formData.coverUrl
                }
            );

            setFormData(null);
            setIsEditing(false);

            onSaved();

        } catch (error) {
            console.error(
                "Error while updating reading:",
                error
            );
        } finally {
            setSaving(false);
        }
    }

    /*
     * EDIT MODE
     */
    if (isEditing && formData) {

        const selectedStatus =
            statuses.find(
                status =>
                    status.id === formData.statusId
            );

        const isDnf =
            selectedStatus?.name.toLowerCase() === "dnf";

        return (
            <section className="reading-details-section">

                <div className="reading-details-section-header">
                    <h2>Reading Information</h2>

                    <div className="details-actions">

                        <Button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={handleSave}
                        >
                            {saving
                                ? "Saving..."
                                : "Save"}
                        </Button>

                    </div>
                </div>

                <div className="reading-details-grid">

                    <SelectInput
                        label="Status"
                        options={statuses}
                        value={formData.statusId}
                        onChange={(value) =>
                            updateField(
                                "statusId",
                                value
                            )
                        }
                    />

                    <AutocompleteInput
                        label="Reading language"
                        options={languages}
                        onQueryChange={
                            setLanguageQuery
                        }
                        onSelect={(language) =>
                            updateField(
                                "readingLanguageId",
                                language.id
                            )
                        }
                    />

                    <div>
                        <label>Start date</label>

                        <input
                            type="date"
                            value={
                                formData.startDate ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "startDate",
                                    event.target.value || null
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Finish date</label>

                        <input
                            type="date"
                            value={
                                formData.finishDate ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "finishDate",
                                    event.target.value || null
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Total pages</label>

                        <input
                            type="number"
                            value={
                                formData.pagesTot ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "pagesTot",
                                    event.target.value === ""
                                        ? null
                                        : Number(
                                            event.target.value
                                        )
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Pages read</label>

                        <input
                            type="number"
                            value={
                                formData.pagesRead ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "pagesRead",
                                    event.target.value === ""
                                        ? null
                                        : Number(
                                            event.target.value
                                        )
                                )
                            }
                        />
                    </div>

                    <RatingInput
                        label="Rating"
                        value={formData.rating}
                        onChange={(value) =>
                            updateField(
                                "rating",
                                value
                            )
                        }
                    />

                    <div>
                        <label>Cover URL</label>

                        <input
                            type="text"
                            value={
                                formData.coverUrl ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "coverUrl",
                                    event.target.value || null
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Review</label>

                        <textarea
                            rows={5}
                            value={
                                formData.review ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "review",
                                    event.target.value || null
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Characters</label>

                        <textarea
                            rows={5}
                            value={
                                formData.characters ?? ""
                            }
                            onChange={(event) =>
                                updateField(
                                    "characters",
                                    event.target.value || null
                                )
                            }
                        />
                    </div>

                    {isDnf && (
                        <div>
                            <label>DNF reason</label>

                            <textarea
                                rows={5}
                                value={
                                    formData.dnfReason ?? ""
                                }
                                onChange={(event) =>
                                    updateField(
                                        "dnfReason",
                                        event.target.value || null
                                    )
                                }
                            />
                        </div>
                    )}

                </div>
            </section>
        );
    }

    /*
     * VIEW MODE
     */

    const isDnf =
        reading.status.name.toLowerCase() === "dnf";

    return (
        <section className="reading-details-section">

            <div className="reading-details-section-header">

                <h2>
                    Reading Information
                </h2>

                <Button
                    type="button"
                    onClick={handleEdit}
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
                        <strong>
                            Reading language:
                        </strong>{" "}
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
                            <strong>
                                Total pages:
                            </strong>{" "}
                            {reading.pages_tot}
                        </p>
                    )}

                {reading.pages_read !== null &&
                    reading.pages_read !== undefined && (
                        <p className="reading-detail">
                            <strong>
                                Pages read:
                            </strong>{" "}
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
                        <strong>
                            Characters:
                        </strong>{" "}
                        {reading.characters}
                    </p>
                )}

                {isDnf &&
                    reading.dnf_reason && (
                        <p className="reading-detail reading-detail-full">
                            <strong>
                                DNF reason:
                            </strong>{" "}
                            {reading.dnf_reason}
                        </p>
                    )}

            </div>

        </section>
    );
}