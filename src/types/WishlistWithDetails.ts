import type { BookWithDetails } from "./BookWithDetails.ts";
import type { Availability } from "./Availability";
import type { Wishlist } from "./Wishlist";

export interface WishlistWithDetails extends Wishlist {
    book: BookWithDetails;
    availability: Availability | null;
}