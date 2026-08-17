import { useEffect, useState } from "react";

import WishlistForm from "../forms/WishlistForm/WishlistForm";
import ReadingForm from "../forms/ReadingForm/ReadingForm.tsx";
import WishlistTable from "../components/WishlistTable";
import Button from "../components/common/Button";

import { getWishlist } from "../services/wishlistService";

import type { WishlistWithDetails } from "../types/WishlistWithDetails";

function TBR() {
    const [showForm, setShowForm] = useState(false);
    const [wishlist, setWishlist] = useState<WishlistWithDetails[]>([]);
    const [selectedWishlist, setSelectedWishlist] = useState<WishlistWithDetails | null>(null);

    async function loadWishlist() {
        const data = await getWishlist();
        setWishlist(data);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void loadWishlist();
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
                    <WishlistForm
                        onSaved={() => {
                            void loadWishlist();
                            setShowForm(false);
                        }}
                    />
                )
            }

            {
                selectedWishlist && (
                    <ReadingForm
                        wishlistItem={selectedWishlist}
                        onSaved={() => {
                            setSelectedWishlist(null);
                            void loadWishlist();
                        }}
                    />
                )
            }

            <WishlistTable
                wishlist={wishlist}
                onStartReading={(item) => {
                    console.log("Start Reading: ", item);
                    setSelectedWishlist(item)
                }}
            />
        </div>
    );
}

export default TBR;