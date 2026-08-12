import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getWishlistById } from "../services/wishlistService";

import type { WishlistWithDetails } from "../types/WishlistWithDetails";

import BookDetailsSection from "../components/details/BookDetailsSection/BookDetailsSection";
import WishlistDetailsSection from "../components/details/WishlistDetailsSection/WishlistDetailsSection";

function WishlistDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState<WishlistWithDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        async function loadWishlist() {
            try {
                const data = await getWishlistById(id);
                setWishlist(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadWishlist();
    }, [id]);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!wishlist) {
        return <p>Wishlist item not found.</p>;
    }

    return (
        <div className="wishlist-details-page">
            <button
                type="button"
                onClick={() => navigate("/tbr")}
            >
                ← Back
            </button>

            <header className="wishlist-details-header">
                <h1>
                    {wishlist.book.title}
                    {" - "}
                    {wishlist.book.author.name}
                </h1>
            </header>

            <BookDetailsSection
                book={wishlist.book}
                onEdit={() => {
                    console.log("Edit book");
                }}
            />

            <WishlistDetailsSection
                wishlist={wishlist}
                onEdit={() => {
                    console.log("Edit wishlist");
                }}
            />

        </div>
    );
}

export default WishlistDetails;