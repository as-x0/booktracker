import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getReadingById } from "../services/readingService";
import type { ReadingWithDetails } from "../types/ReadingWithDetails";

import BookDetailsSection from "../components/details/BookDetailsSection/BookDetailsSection";
import ReadingDetailsSection from "../components/details/ReadingDetailsSection/ReadingDetailsSection";
import Button from "../components/common/Button.tsx";

import "./ReadingDetails.css"

function ReadingDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [reading, setReading] =
        useState<ReadingWithDetails | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadReading() {
            if (!id) {
                return;
            }

            try {
                const data = await getReadingById(id);
                setReading(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadReading();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!reading) {
        return <p>Reading not found.</p>;
    }

    return (
        <div className="reading-details">

            <Button
                type="button"
                onClick={() => navigate("/books")}
            >
                ← Back
            </Button>

            <div className="reading-details-header">
                {reading.cover_url && (
                    <img
                        src={reading.cover_url}
                        alt={`Cover of ${reading.book.title}`}
                        className="reading-details-cover"
                    />
                )}

                <h1>
                    {reading.book.title} - {reading.book.author.name}
                </h1>
            </div>

            <BookDetailsSection
                book={reading.book}
                onEdit={() => {
                    console.log("Edit book");
                }}
            />

            <ReadingDetailsSection
                reading={reading}
                onEdit={() => {
                    console.log("Edit reading");
                }}
            />

        </div>
    );
}

export default ReadingDetails;