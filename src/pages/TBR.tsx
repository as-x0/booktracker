import { useEffect, useState } from "react";

import WishlistTable from "../components/WishlistTable";
import type { WishlistWithDetails } from "../types/WishlistWithDetails";

import { getWishlist } from "../services/wishlistService";


function TBR() {
    const [wishlist, setWishlist] = useState<WishlistWithDetails[]>([]);

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
            <WishlistTable
                wishlist={wishlist}
            />
        </div>
    );
}
export default TBR;