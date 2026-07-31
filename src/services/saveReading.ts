import type { ReadingFormData } from "../forms/ReadingForm/ReadingForm";

import { findOrCreateAuthor } from "./authorService";
import { findOrCreateBook } from "./bookService";
import { createReading } from "./readingService";
import { findOrCreateCountry } from "./countryService.ts";
import { findOrCreateSeries} from "./seriesService.ts";

export async function saveReading(data: ReadingFormData) {
    const countryId = await findOrCreateCountry(
        data.birthCountryName
    )

    const authorId = await findOrCreateAuthor(
        data.authorName,
        countryId
    );

    console.log(
        "SERIES NAME:",
        data.seriesName
    );
    const seriesId = await findOrCreateSeries(
        data.seriesName,
    );

    const bookId = await findOrCreateBook({
        title: data.title,
        authorId,
        genreId: data.genreId,
        themes: data.themes,
        publicationYear: data.publicationYear,
        originalLanguageId: data.originalLanguageId,
        seriesId,
        seriesNumber: data.seriesNumber || undefined,
    });

    const readingId = await createReading({
        bookId,

        statusId:data.statusId,
        readingLanguageId:data.readingLanguageId,

        pagesTot:data.pagesTotal,
        pagesRead:data.pagesRead,

        startDate:data.startDate,
        finishDate:data.finishDate || null,

        rating:data.rating ?? null,
        review:data.review || null,
        characters:data.characters || null,
        dnfReason:data.dnfReason || null,
        coverUrl: data.coverUrl || null
    });

    return readingId;
}