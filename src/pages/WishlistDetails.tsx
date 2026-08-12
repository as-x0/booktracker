import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getWishlistById } from "../services/wishlistService";
import type { WishlistWithDetails } from "../types/WishlistWithDetails";

import BookDetailsSection from "../components/details/BookDetailsSection/BookDetailsSection";
import WishlistDetailsSection from "../components/details/WishlistDetailsSection/WishlistDetailsSection";
import Button from "../components/common/Button.tsx";

import "./WishlistDetails.css"

function WishlistDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState<WishlistWithDetails | null>(null);

    const [loading, setLoading] = useState(true);

    async function loadWishlist() {
        if (!id) return;

        try {
            const data = await getWishlistById(id);
            setWishlist(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        getWishlistById(id)
            .then(data => {
                setWishlist(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!wishlist) {
        return <p>Wishlist not found.</p>;
    }

    return (
        <div className="wishlist-details">
            <Button
                type="button"
                onClick={() => navigate("/tbr")}
            >
                ← Back
            </Button>

            <div className="wishlist-details-header">
                <h1>
                    {wishlist.book.title} - {wishlist.book.author.name}
                </h1>
            </div>

            <BookDetailsSection
                book={wishlist.book}
                onSaved={loadWishlist}
            />

            <WishlistDetailsSection
                wishlist={wishlist}
                onSaved={loadWishlist}
            />
        </div>
    );
}

export default WishlistDetails;