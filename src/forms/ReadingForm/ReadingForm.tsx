import { useForm } from "react-hook-form";

import Button from "../../components/common/Button";
import BookInfoSection from "../../components/forms/BookInfoSection/BookInfoSection";

export interface ReadingFormData {
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
}

export default function ReadingForm() {
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<ReadingFormData>();

    function onSubmit(data: ReadingFormData) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>New Reading</h2>

            <BookInfoSection
                register={register}
                setValue={setValue}
            />

            <Button type="submit">
                Save
            </Button>

        </form>
    );
}