import {useState} from "react";

import "./BookInfoSection.css"

import useGenres from "../../../hooks/useGenres.ts";
import useLanguages from "../../../hooks/useLanguages.ts";

import type {
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";

import TextInput from "../../common/TextInput.tsx";
import SelectInput from "../../common/SelectInput.tsx";
import AutocompleteInput from "../../common/AutocompleteInput.tsx";

import type { ReadingFormData } from "../../../forms/ReadingForm/ReadingForm";

interface BookInfoSectionProps {
    register: UseFormRegister<ReadingFormData>;
    setValue: UseFormSetValue<ReadingFormData>;
}

export default function BookInfoSection({
    register,
    setValue
}: BookInfoSectionProps) {
    const genres = useGenres();

    const [languageQuery, setLanguageQuery] = useState("");
    const languages = useLanguages(languageQuery);

    const authors = [
        {id: "1", name: "Frank Herbert"},
        {id: "2", name: "J.R.R. Tolkien"}
    ];

    const countries = [
        {id: "1", name: "United States"},
        {id: "2", name: "United Kingdom"}
    ];

    const series = [
        {id: "1", name: "Dune"},
        {id: "2", name: "Lord of the Rings"}
    ];

    return (
        <section className="book-info-section">
            <h3>
                Book Information
            </h3>

            <div className="book-info-grid">
                <TextInput
                    label="Title"
                    {...register("title")}
                />

                <AutocompleteInput
                    label="Author"
                    options={authors}
                    onSelect={(author)=>{
                        setValue(
                            "authorId",
                            author.id
                        );
                        setValue(
                            "authorName",
                            author.name
                        );
                    }}
                />

                <AutocompleteInput
                    label="Birth country"
                    options={countries}
                    onSelect={(country)=>{
                        setValue(
                            "birthCountryId",
                            country.id
                        );
                    }}
                />

                <SelectInput
                    label="Genre"
                    options={genres}
                    {...register("genreId")}
                />

                <TextInput
                    label="Publication year"
                    type="number"
                    {...register("publicationYear")}
                />

                <AutocompleteInput
                    label="Original language"
                    options={languages}
                    onQueryChange={(query)=>{
                        setLanguageQuery(query);
                    }}
                    onSelect={(language)=>{
                        setValue(
                            "originalLanguageId",
                            language.id
                        );
                    }}
                />

                <AutocompleteInput
                    label="Series"
                    options={series}
                    onSelect={(series)=>{
                        setValue(
                            "seriesId",
                            series.id
                        );
                        setValue(
                            "seriesName",
                            series.name
                        );
                    }}
                />

                <TextInput
                    label="Series number"
                    type="number"
                    {...register("seriesNumber")}
                />
            </div>

        </section>
    );
}