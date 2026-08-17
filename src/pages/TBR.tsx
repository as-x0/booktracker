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

    const toRead = wishlist.filter(item => item.started_at === null);
    const started = wishlist.filter(item => item.started_at !== null);

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

            <section>
                <h2>To be read</h2>
                <WishlistTable
                    wishlist={toRead}
                    onStartReading={(item) => {
                        console.log("Start Reading: ", item);
                        setSelectedWishlist(item);
                    }}
                />
            </section>

            <section>
                <h2>Started</h2>
                <WishlistTable
                    wishlist={started}
                    onStartReading={(item) => {
                        console.log("Start Reading: ", item);
                        setSelectedWishlist(item);
                    }}
                />
            </section>
        </div>
    );
}

export default TBR;