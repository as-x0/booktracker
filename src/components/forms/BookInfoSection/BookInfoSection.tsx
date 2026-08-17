import {useState} from "react";

import useGenres from "../../../hooks/useGenres.ts";
import useLanguages from "../../../hooks/useLanguages.ts";
import useAuthors from "../../../hooks/useAuthors.ts";
import useCountries from "../../../hooks/useCountries.ts";
import useSeries from "../../../hooks/useSeries.ts";

import "./BookInfoSection.css"

import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";

import TextInput from "../../common/TextInput.tsx";
import SelectInput from "../../common/SelectInput.tsx";
import AutocompleteInput from "../../common/AutocompleteInput.tsx";

import type { BookFormData } from "../../../types/BookFormData.ts";

interface BookInfoSectionProps{
    register: UseFormRegister<BookFormData>;
    watch: UseFormWatch<BookFormData>;
    setValue: UseFormSetValue<BookFormData>;
}

export default function BookInfoSection({
      register,
      watch,
      setValue
  }: BookInfoSectionProps) {
    const genres = useGenres();

    const [languageQuery, setLanguageQuery] = useState("");
    const languages = useLanguages(languageQuery);

    const[authorQuery, setAuthorQuery] = useState("");
    const authors = useAuthors(authorQuery);

    const [countryQuery, setCountryQuery] = useState("");
    const countries = useCountries(countryQuery);

    const [serieQuery, setSerieQuery] = useState("");
    const series = useSeries(serieQuery);

    return (
        <section className="book-info-section">
            <h3>
                Book Information
            </h3>

            <div className="book-info-grid">
                <div className="book-detail book-detail-full">
                    <TextInput
                        label="Title"
                        {...register("title")}
                    />
                </div>

                <div className="book-detail">
                    <AutocompleteInput
                        label="Author"
                        options={authors}
                        onQueryChange={(value)=>{
                            setAuthorQuery(value);
                            setValue("authorName", value);
                        }}
                        onSelect={(author)=>{
                            setValue("authorName", author.name);
                        }}
                    />
                </div>

                <div className="book-detail">
                    <AutocompleteInput
                        label="Birth country"
                        options={countries}
                        onQueryChange={(value)=>{
                            setCountryQuery(value);
                            setValue("birthCountryName", value);
                        }}
                        onSelect={(country)=>{
                            setValue(
                                "birthCountryName",
                                country.name,
                            );
                        }}
                    />
                </div>

                <div className="book-detail">
                    <SelectInput
                        label="Genre"
                        options={genres}
                        value={watch("genreId")}
                        onChange={(value) =>
                            setValue("genreId", value)
                        }
                    />
                </div>

                <div className="book-detail">
                    <TextInput
                        label="Themes"
                        {...register("themes")}
                    />
                </div>

                <div className="book-detail">
                    <TextInput
                        label="Publication year"
                        type="number"
                        {...register("publicationYear", {valueAsNumber:true})}
                    />
                </div>

                <div className="book-detail">
                    <AutocompleteInput
                        label="Original language"
                        options={languages}
                        onQueryChange={(value) => {
                            setLanguageQuery(value);
                            setValue("originalLanguageName", value);
                        }}
                        onSelect={(language) => {
                            setValue("originalLanguageName", language.name);
                        }}
                    />
                </div>

                <div className="book-detail">
                    <AutocompleteInput
                        label="Series"
                        options={series}
                        onQueryChange={(value)=>{
                            setSerieQuery(value);
                            setValue(
                                "seriesName",
                                value,
                                {
                                    shouldDirty: true,
                                    shouldValidate: true
                                }

                            );
                        }}
                        onSelect={(serie)=>{
                            setValue(
                                "seriesName",
                                serie.name,
                                {
                                    shouldDirty: true,
                                    shouldValidate: true
                                }
                            );
                        }}
                    />
                </div>

                <div className="book-detail">
                    <TextInput
                        label="Series number"
                        type="number"
                        {...register("seriesNumber", {valueAsNumber:true})}
                    />
                </div>
            </div>
        </section>
    );
}