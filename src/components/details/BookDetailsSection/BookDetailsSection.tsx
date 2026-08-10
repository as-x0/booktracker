import { useState } from "react";

import type { BookWithDetails } from "../../../types/BookWithDetails";

import { updateBook } from "../../../services/bookService";
import { findOrCreateAuthor } from "../../../services/authorService";
import { findOrCreateCountry } from "../../../services/countryService";
import { findOrCreateSeries } from "../../../services/seriesService";
import { findOrCreateLanguage } from "../../../services/languageService";

import useGenres from "../../../hooks/useGenres";
import useLanguages from "../../../hooks/useLanguages";
import useAuthors from "../../../hooks/useAuthors";
import useCountries from "../../../hooks/useCountries";
import useSeries from "../../../hooks/useSeries";

import Button from "../../../components/common/Button";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import AutocompleteInput from "../../../components/common/AutocompleteInput";

import "./BookDetailsSection.css";

interface BookDetailsSectionProps {
    book: BookWithDetails;
    onSaved: () => void;
}

export default function BookDetailsSection({
    book,
    onSaved
}: BookDetailsSectionProps) {

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [title, setTitle] = useState(book.title);
    const [authorName, setAuthorName] = useState(book.author?.name ?? "");
    const [birthCountryName, setBirthCountryName] = useState(book.author?.birth_country?.name ?? "");
    const [genreId, setGenreId] = useState(book.genre?.id ?? "");
    const [themes, setThemes] = useState(book.themes ?? "");
    const [publicationYear, setPublicationYear] = useState(book.publication_year?.toString() ?? "");
    const [originalLanguageName, setOriginalLanguageName] = useState(book.original_language?.name ?? "");
    const [seriesName, setSeriesName] = useState(book.series?.name ?? "");
    const [seriesNumber, setSeriesNumber] = useState(book.series_number?.toString() ?? "");

    const [authorQuery, setAuthorQuery] = useState("");
    const authors = useAuthors(authorQuery);

    const [countryQuery, setCountryQuery] = useState("");
    const countries = useCountries(countryQuery);

    const [languageQuery, setLanguageQuery] = useState("");
    const languages = useLanguages(languageQuery);

    const [seriesQuery, setSeriesQuery] = useState("");
    const series = useSeries(seriesQuery);

    const genres = useGenres();

    function startEditing() {
        setTitle(book.title);
        setAuthorName(book.author?.name ?? "");
        setBirthCountryName(book.author?.birth_country?.name ?? "");
        setGenreId(book.genre?.id ?? "");
        setThemes(book.themes ?? "");
        setPublicationYear(book.publication_year?.toString() ?? "");
        setOriginalLanguageName(book.original_language?.name ?? "");
        setSeriesName(book.series?.name ?? "");
        setSeriesNumber(book.series_number?.toString() ?? "");

        setAuthorQuery("");
        setCountryQuery("");
        setLanguageQuery("");
        setSeriesQuery("");

        setEditing(true);
    }

    function cancelEditing() {
        setEditing(false);
    }

    async function handleSave() {
        try {
            setSaving(true);

            const countryId =
                birthCountryName.trim()
                    ? await findOrCreateCountry(
                        birthCountryName.trim()
                    )
                    : null;

            const authorId =
                authorName.trim()
                    ? await findOrCreateAuthor(
                        authorName.trim(),
                        countryId
                    )
                    : undefined;

            const languageId =
                originalLanguageName.trim()
                    ? await findOrCreateLanguage(
                        originalLanguageName.trim()
                    )
                    : null;

            const seriesId =
                seriesName.trim()
                    ? await findOrCreateSeries(
                        seriesName.trim()
                    )
                    : null;

            await updateBook(book.id, {
                title: title.trim(),

                authorId,

                genreId: genreId || null,

                themes:
                    themes.trim() || null,

                publicationYear:
                    publicationYear.trim()
                        ? Number(publicationYear)
                        : null,

                originalLanguageId:
                languageId,

                seriesId,

                seriesNumber:
                    seriesNumber.trim()
                        ? Number(seriesNumber)
                        : null
            });

            setEditing(false);
            onSaved();
        } catch (error) {
            console.error(
                "Error while updating book: ",
                error
            );
        } finally {
            setSaving(false);
        }
    }

    if(!editing) {
        return (
            <section className="book-details-section">
                <div className="book-details-section-header">
                    <h2>Book Information</h2>

                    <Button
                        type="button"
                        onClick={startEditing}
                    >
                        Edit
                    </Button>
                </div>

                <div className="book-details-grid">
                    {book.genre?.name && (
                        <p className="book-detail">
                            <strong>Genre:</strong>{" "}
                            {book.genre.name}
                        </p>
                    )}

                    {book.themes && (
                        <p className="book-detail">
                            <strong>Themes:</strong>{" "}
                            {book.themes}
                        </p>
                    )}

                    {book.publication_year && (
                        <p className="book-detail">
                            <strong>Publication year:</strong>{" "}
                            {book.publication_year}
                        </p>
                    )}

                    {book.original_language?.name && (
                        <p className="book-detail">
                            <strong>Original language:</strong>{" "}
                            {book.original_language.name}
                        </p>
                    )}

                    {book.series?.name && (
                        <p className="book-detail">
                            <strong>Series:</strong>{" "}
                            {book.series.name}
                        </p>
                    )}

                    {book.series_number !== null &&
                        book.series_number !== undefined && (
                            <p className="book-detail">
                                <strong>Series number:</strong>{" "}
                                {book.series_number}
                            </p>
                        )}
                </div>
            </section>
        );
    }

    return (
        <section className="book-details-section">
            <div className="book-details-section-header">
                <h2>Book Information</h2>

                <div className="book-details-actions">
                    <Button
                        type="button"
                        onClick={cancelEditing}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSave}
                    >
                        {saving ? "Saving...": "Save"}
                    </Button>
                </div>
            </div>

            <div className="book-details-edit-grid">
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <AutocompleteInput
                    label="Author"
                    value={authorName}
                    options={authors}
                    onQueryChange={(value) => {
                        setAuthorQuery(value);
                        setAuthorName(value);
                    }}
                    onSelect={(author) => {
                        setAuthorName(author.name);
                    }}
                />

                <AutocompleteInput
                    label="Birth country"
                    value={birthCountryName}
                    options={countries}
                    onQueryChange={(value) => {
                        setCountryQuery(value);
                        setBirthCountryName(value);
                    }}
                    onSelect={(country) => {
                        setBirthCountryName(country.name);
                    }}
                />

                <SelectInput
                    label="Genre"
                    options={genres}
                    value={genreId}
                    onChange={setGenreId}
                />

                <TextInput
                    label="Themes"
                    value={themes}
                    onChange={(event) =>
                        setThemes(event.target.value)
                    }
                />

                <TextInput
                    label="Publication year"
                    type="number"
                    value={publicationYear}
                    onChange={(event) =>
                        setPublicationYear(
                            event.target.value
                        )
                    }
                />

                <AutocompleteInput
                    label="Original language"
                    value={originalLanguageName}
                    options={languages}
                    onQueryChange={(value) => {
                        setLanguageQuery(value);
                        setOriginalLanguageName(value);
                    }}
                    onSelect={(language) => {
                        setOriginalLanguageName(language.id);
                        setOriginalLanguageName(
                            language.name
                        );
                    }}
                />

                <AutocompleteInput
                    label="Series"
                    value={seriesName}
                    options={series}
                    onQueryChange={(value) => {
                        setSeriesQuery(value);
                        setSeriesName(value);
                    }}
                    onSelect={(serie) => {
                        setSeriesName(serie.name);
                    }}
                />

                <TextInput
                    label="Series number"
                    type="number"
                    value={seriesNumber}
                    onChange={(event) =>
                        setSeriesNumber(
                            event.target.value
                        )
                    }
                />
            </div>
        </section>
    )

}