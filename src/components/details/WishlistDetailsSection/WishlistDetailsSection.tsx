import type { WishlistWithDetails } from "../../../types/WishlistWithDetails";

import Button from "../../../components/common/Button";

import "./WishlistDetailsSection.css";

interface WishlistDetailsSectionProps {
    wishlist: WishlistWithDetails;
    onSaved: () => void;
}

export default function WishlistDetailsSection({
    wishlist,
    onSaved
}: WishlistDetailsSectionProps) {

    return (
        <section className="wishlist-details-section">
            <div className="wishlist-details-section-header">
                <h2>Wishlist Information</h2>

                <Button
                    type="button"
                    onClick={onSaved}
                >
                    Edit
                </Button>
            </div>

            <div className="wishlist-details-grid">
                {wishlist.availability?.name && (
                    <p className="wishlist-detail">
                        <strong>Availability:</strong>{" "}
                        {wishlist.availability.name}
                    </p>
                )}

                {wishlist.recommended_by && (
                    <p className="wishlist-detail">
                        <strong>Recommended by:</strong>{" "}
                        {wishlist.recommended_by}
                    </p>
                )}

                {wishlist.notes && (
                    <p className="wishlist-detail wishlist-detail-full">
                        <strong>Notes:</strong>{" "}
                        {wishlist.notes}
                    </p>
                )}

            </div>
        </section>
    );
}