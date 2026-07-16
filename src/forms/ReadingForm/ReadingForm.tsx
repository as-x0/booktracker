import { useForm } from "react-hook-form";

import Button from "../../components/common/Button";
import BookInfoSection from "../../components/forms/BookInfoSection/BookInfoSection";
import ReadingInfoSection from "../../components/forms/ReadingInfoSection/ReadingInfoSection";
import "./ReadingForm.css";

export interface ReadingFormData {
    //BOOK
    title: string;
    authorId: string;
    authorName: string;
    birthCountryId: string;
    genreId: string;
    publicationYear: string;
    originalLanguageId: string;
    seriesId: string;
    seriesName: string;
    seriesNumber: string;

    //READING
    statusId: string;
    readingLanguageId: string;
    startDate: string;
    finishDate: string;
    pagesTotal: string;
    pagesRead: string;
    rating: string;
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

    function onSubmit(data: ReadingFormData) {
        console.log(data);
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