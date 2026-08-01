import { useEffect, useState } from "react";

import WishlistTable from "../components/WishlistTable";
import WishlistForm from "../forms/WishlistForm/WishlistForm.tsx";

import type { WishlistWithDetails } from "../types/WishlistWithDetails";

import { getWishlist } from "../services/wishlistService";

import Button from "../components/common/Button";

function TBR() {
    const [wishlist, setWishlist] = useState<WishlistWithDetails[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function loadWishlist() {
            try {
                const data = await getWishlist();
                setWishlist(data);
            } catch(error) {
                console.error(
                    "Error loading wishlist:",
                    error
                );
            }
        }
        loadWishlist();
    }, []);

    return (
        <div>
            <h1>TBR</h1>

            <Button
                onClick={() => setShowForm(!showForm)}
            >
                {
                    showForm
                        ? "Close"
                        : "New Book"
                }
            </Button>

            {
                showForm && (
                    <WishlistForm />
                )
            }

            <WishlistTable
                wishlist={wishlist}
            />
        </div>
    );
}

export default TBR;