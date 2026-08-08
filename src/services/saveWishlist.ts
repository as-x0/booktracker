import type { WishlistFormData } from "../forms/WishlistForm/WishlistForm";

import { findOrCreateCountry } from "./countryService";
import { findOrCreateAuthor } from "./authorService";
import { findOrCreateSeries } from "./seriesService";
import { findOrCreateBook } from "./bookService";
import { createWishlist } from "./wishlistService";
import { findOrCreateLanguage } from "./languageService.ts";

export async function saveWishlist(
    data: WishlistFormData
) {
    const countryId = await findOrCreateCountry(
        data.birthCountryName
    );
    const authorId = await findOrCreateAuthor(
        data.authorName,
        countryId
    );
    const seriesId = await findOrCreateSeries(
        data.seriesName
    );
    const originalLanguageId = await findOrCreateLanguage(
        data.originalLanguageName
    );

    const bookId = await findOrCreateBook({
        title: data.title,
        authorId,
        genreId: data.genreId,
        themes: data.themes,
        publicationYear: data.publicationYear,
        originalLanguageId,
        seriesId,
        seriesNumber: data.seriesNumber || undefined
    });

    const wishlistId = await createWishlist({
        bookId,
        availabilityId: data.availabilityId,
        recommendedBy: data.recommendedBy || null,
        notes: data.notes || null
    });

    return wishlistId;
}