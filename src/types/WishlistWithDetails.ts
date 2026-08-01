import type { Book } from "./Book";
import type { Availability } from "./Availability";
import type { Wishlist } from "./Wishlist";

export interface WishlistWithDetails extends Wishlist {
    book: Book;
    availability: Availability | null;
}