import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/common/Button";
import BookInfoSection from "../../components/forms/BookInfoSection/BookInfoSection";
import ReadingInfoSection from "../../components/forms/ReadingInfoSection/ReadingInfoSection";

import {saveReading} from "../../services/saveReading.ts";

import "./ReadingForm.css";

export interface ReadingFormData {
    //BOOK
    title: string;

    authorName: string;
    birthCountryName: string;

    genreId: string;

    publicationYear: number;

    originalLanguageId: string;

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
        watch,
        reset
    } = useForm<ReadingFormData>({
        shouldUnregister: false
    });

    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    async function onSubmit(data: ReadingFormData) {
        console.log("FORM DATA:", data);

        try {
            setMessage(null);

            const readingId = await saveReading(data);

            console.log(
                "Reading created:",
                readingId
            );

            setMessage({
                type: "success",
                text: "Reading saved successfully",
            });
            reset();
        } catch(error) {
            console.error(error);
            setMessage({
                type: "error",
                text: "Error while saving reading",
            })
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
            watch={watch}
            setValue={setValue}
        />

        <ReadingInfoSection
            register={register}
            setValue={setValue}
            watch={watch}
        />

        {message && (
            <p className={`form-message ${message.type}`}>
                {message.text}
            </p>
        )}

        <Button type="submit">
            Save
        </Button>

    </form>
    );
}