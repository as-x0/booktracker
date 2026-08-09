import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getReadingById } from "../services/readingService";
import type { ReadingWithDetails } from "../types/ReadingWithDetails";

import Button from "../components/common/Button.tsx";

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
        <div>
            <Button
                type="button"
                onClick={() => navigate("/books")}
            >
                ← Back
            </Button>

            <h1>{reading.book.title}</h1>

            <section>
                <h2>Book Information</h2>

                <p>
                    <strong>Author:</strong>{" "}
                    {reading.book.author.name}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {reading.status.name}
                </p>

                <Button
                    type="button"
                    onClick={() => {
                        console.log("Edit book");
                    }}
                >
                    Edit
                </Button>
            </section>

            <section>
                <h2>Reading Information</h2>

                <p>
                    <strong>Start date:</strong>{" "}
                    {reading.start_date || "—"}
                </p>

                <p>
                    <strong>Finish date:</strong>{" "}
                    {reading.finish_date || "—"}
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

                <p>
                    <strong>DNF reason:</strong>{" "}
                    {reading.dnf_reason || "—"}
                </p>

                <p>
                    <strong>Cover URL:</strong>{" "}
                    {reading.cover_url || "—"}
                </p>

                <Button
                    type="button"
                    onClick={() => {
                        console.log("Edit reading");
                    }}
                >
                    Edit
                </Button>
            </section>
        </div>
    );
}

export default ReadingDetails;