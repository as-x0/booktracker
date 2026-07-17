import type { ReadingFormData } from "../forms/ReadingForm/ReadingForm";

import { findOrCreateAuthor } from "./authorService";
import { findOrCreateBook } from "./bookService";
import { createReading } from "./readingService";

export async function saveReading(data: ReadingFormData) {
    const authorId = await findOrCreateAuthor(
        data.authorName,
        data.birthCountryId
    );

    const bookId = await findOrCreateBook({
        title: data.title,
        authorId,
        genreId: data.genreId,
        publicationYear: data.publicationYear,
        originalLanguageId:
        data.originalLanguageId,
        seriesName: data.seriesName || undefined,
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
        rating:data.rating || null,
        review:data.review || null,
        characters:data.characters || null,
        dnfReason:data.dnfReason || null
    });

    return readingId;
}