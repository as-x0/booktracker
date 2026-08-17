import { useState } from "react";

import type { WishlistWithDetails } from "../../../types/WishlistWithDetails";

import Button from "../../../components/common/Button";
import TextInput from "../../../components/common/TextInput";
import TextArea from "../../../components/common/TextArea";
import SelectInput from "../../../components/common/SelectInput";

import { updateWishlist } from "../../../services/wishlistService";

import useAvailability from "../../../hooks/useAvailability";

import "./WishlistDetailsSection.css";

interface WishlistDetailsSectionProps {
    wishlist: WishlistWithDetails;
    onSaved: () => void;
}

export default function WishlistDetailsSection({
    wishlist,
    onSaved
}: WishlistDetailsSectionProps) {
    const [editing, setEditing] = useState(false);

    const [availabilityId, setAvailabilityId] = useState<string | null>(wishlist.availability?.id ?? null);
    const availabilities = useAvailability();

    const [recommendedBy, setRecommendedBy] = useState(wishlist.recommended_by ?? "");

    const [notes, setNotes] = useState(wishlist.notes ?? "");

    const [saving, setSaving] = useState(false);

    async function handleSave() {
        try {
            setSaving(true);
            await updateWishlist(wishlist.id, {
                availabilityId,
                recommendedBy: recommendedBy || null,
                notes: notes || null
            });
            setEditing(false);
            onSaved();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    }

    function handleCancel() {
        setAvailabilityId(wishlist.availability?.id ?? null);
        setRecommendedBy(wishlist.recommended_by ?? "");
        setNotes(wishlist.notes ?? "");
        setEditing(false);
    }

    if (editing) {
        return (
            <section className="wishlist-details-section">
                <div className="wishlist-details-section-header">
                    <h2>Wishlist Information</h2>

                    <div className="details-edit-buttons">
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

                <div className="wishlist-details-grid">
                    <SelectInput
                        label="Availability"
                        options={availabilities}
                        value={availabilityId ?? undefined}
                        onChange={(value) => setAvailabilityId(value)}
                    />

                    <TextInput
                        label="Recommended by"
                        value={recommendedBy}
                        onChange={(event) =>
                            setRecommendedBy(event.target.value)
                        }
                    />

                    <div className="wishlist-detail-full">
                        <TextArea
                            label="Notes"
                            value={notes}
                            onChange={(event) =>
                                setNotes(event.target.value)
                            }
                        />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="wishlist-details-section">
            <div className="wishlist-details-section-header">
                <h2>Wishlist Information</h2>

                <Button
                    type="button"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </Button>
            </div>

            <div className="wishlist-details-grid">
                {wishlist.availability?.name && (
                    <p className="wishlist-detail">
                        <strong>
                            Availability:
                        </strong>{" "}
                        {wishlist.availability.name}
                    </p>
                )}

                {wishlist.recommended_by && (
                    <p className="wishlist-detail">
                        <strong>
                            Recommended by:
                        </strong>{" "}
                        {wishlist.recommended_by}
                    </p>
                )}

                <div className="wishlist-detail-full">
                    {wishlist.notes && (
                        <p className="wishlist-detail wishlist-detail-full">
                            <strong>
                                Notes:
                            </strong>{" "}
                            {wishlist.notes}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}