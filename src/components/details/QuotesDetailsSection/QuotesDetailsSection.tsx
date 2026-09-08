import { useState } from "react";

import type { Quote } from "../../../types/Quote.ts";

import Button from "../../common/Button.tsx";
import RichTextEditor from "../../common/RichTextEditor/RichTextEditor.tsx";

import {
    createQuote,
    updateQuote
} from "../../../services/quoteService.ts";

import "./QuotesDetailsSection.css";

interface QuotesDetailsSectionProps {
    readingId: string;
    quotes: Quote[];
    onSaved: () => void;
}

interface EditingQuote {
    id?: string;
    text: string;
    page: number | null;
}

export default function QuotesDetailsSection({
    readingId,
    quotes,
    onSaved
}: QuotesDetailsSectionProps) {

    const [editingQuote, setEditingQuote] =
        useState<EditingQuote | null>(null);

    const [saving, setSaving] = useState(false);

    function handleEdit(quote: Quote) {
        setEditingQuote({
            id: quote.id,
            text: quote.text,
            page: quote.page
        });
    }

    function handleAddQuote() {
        setEditingQuote({
            text: "",
            page: null
        });
    }

    function handleCancel() {
        setEditingQuote(null);
    }

    async function handleSave() {
        if (!editingQuote || !editingQuote.text.trim()) {
            return;
        }

        try {
            setSaving(true);

            if (editingQuote.id) {
                await updateQuote(
                    editingQuote.id,
                    editingQuote.text,
                    editingQuote.page
                );
            } else {
                await createQuote(
                    readingId,
                    editingQuote.text,
                    editingQuote.page
                );
            }

            setEditingQuote(null);
            onSaved();

        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="quotes-details-section">

            <h2>Quotes</h2>

            {quotes.map((quote) => {

                const isEditing =
                    editingQuote?.id === quote.id;

                if (isEditing) {
                    return (
                        <div
                            key={quote.id}
                            className="quote-details"
                        >
                            <div className="quote-details-content">

                                <RichTextEditor
                                    label={`Quote`}
                                    value={editingQuote.text}
                                    placeholder="Write a quote..."
                                    onChange={(value) =>
                                        setEditingQuote({
                                            ...editingQuote,
                                            text: value
                                        })
                                    }
                                />

                                <div className="quote-details-page">
                                    <label>
                                        Page
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            editingQuote.page ?? ""
                                        }
                                        onChange={(event) =>
                                            setEditingQuote({
                                                ...editingQuote,
                                                page:
                                                    event.target.value === ""
                                                        ? null
                                                        : Number(event.target.value)
                                            })
                                        }
                                    />
                                </div>

                            </div>

                            <div className="quote-details-actions">

                                <Button
                                    type="button"
                                    onClick={handleSave}
                                >
                                    {saving ? "Saving..." : "Save"}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>

                            </div>
                        </div>
                    );
                }

                return (
                    <div
                        key={quote.id}
                        className="quote-details"
                    >
                        <div className="quote-details-content">

                            <div
                                className="quote-details-text"
                                dangerouslySetInnerHTML={{
                                    __html: quote.text
                                }}
                            />

                            {quote.page !== null && (
                                <p className="quote-details-page">
                                    Page {quote.page}
                                </p>
                            )}

                        </div>

                        <div className="quote-details-actions">

                            <Button
                                type="button"
                                onClick={() => handleEdit(quote)}
                            >
                                Edit
                            </Button>

                        </div>
                    </div>
                );
            })}

            {editingQuote && !editingQuote.id && (
                <div className="quote-details">

                    <div className="quote-details-content">

                        <RichTextEditor
                            label="New quote"
                            value={editingQuote.text}
                            placeholder="Write a quote..."
                            onChange={(value) =>
                                setEditingQuote({
                                    ...editingQuote,
                                    text: value
                                })
                            }
                        />

                        <div className="quote-details-page">
                            <label>
                                Page
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={
                                    editingQuote.page ?? ""
                                }
                                onChange={(event) =>
                                    setEditingQuote({
                                        ...editingQuote,
                                        page:
                                            event.target.value === ""
                                                ? null
                                                : Number(event.target.value)
                                    })
                                }
                            />
                        </div>

                    </div>

                    <div className="quote-details-actions">

                        <Button
                            type="button"
                            onClick={handleSave}
                        >
                            {saving ? "Saving..." : "Save"}
                        </Button>

                        <Button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>

                    </div>

                </div>
            )}

            <Button
                type="button"
                onClick={handleAddQuote}
            >
                + Add quote
            </Button>

        </section>
    );
}