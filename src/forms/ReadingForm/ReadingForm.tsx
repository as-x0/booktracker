import { useForm } from "react-hook-form";

import Button from "../../components/common/Button";
import BookInfoSection from "../../components/forms/BookInfoSection/BookInfoSection";
import ReadingInfoSection from "../../components/forms/ReadingInfoSection/ReadingInfoSection";

import {saveReading} from "../../services/saveReading.ts";

import "./ReadingForm.css";

export interface ReadingFormData {
    //BOOK
    title: string;
    authorId: string;
    authorName: string;
    birthCountryId: string;
    genreId: string;

    publicationYear: number;

    originalLanguageId: string;

    seriesId: string;
    seriesName: string;
    seriesNumber: number;

    //READING
    statusId: string;
    readingLanguageId: string;

    startDate: string;
    finishDate: string;

    pagesTotal: number;
    pagesRead: number;

    rating: number;
    review: string;
    characters: string;
    dnfReason: string;
}

export default function ReadingForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<ReadingFormData>();

    async function onSubmit(data: ReadingFormData) {
        console.log("FORM DATA:", data);
        try {
            const readingId = await saveReading(data);
            console.log(
                "Reading created:",
                readingId
            );
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <form
            className="reading-form"
            onSubmit={handleSubmit(onSubmit)}
        >

        <h2>New Reading</h2>

        <BookInfoSection
            register={register}
            setValue={setValue}
        />

        <ReadingInfoSection
            register={register}
            setValue={setValue}
            watch={watch}
        />

        <Button type="submit">
            Save
        </Button>

    </form>
    );
}