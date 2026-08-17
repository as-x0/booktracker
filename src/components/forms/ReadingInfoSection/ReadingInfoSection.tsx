import "./ReadingInfoSection.css";

import {useState} from "react";

import useStatuses from "../../../hooks/useStatuses.ts";
import useLanguages from "../../../hooks/useLanguages.ts";

import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";

import SelectInput from "../../common/SelectInput";
import TextInput from "../../common/TextInput";
import DateInput from "../../common/DateInput";
import RatingInput from "../../common/RatingInput/RatingInput.tsx";
import TextArea from "../../common/TextArea";
import AutocompleteInput from "../../common/AutocompleteInput.tsx";
import RichTextEditor from "../../common/RichTextEditor/RichTextEditor.tsx";

import type { ReadingFormData } from "../../../forms/ReadingForm/ReadingForm";

interface ReadingInfoSectionProps {
    register: UseFormRegister<ReadingFormData>;
    watch: UseFormWatch<ReadingFormData>;
    setValue: UseFormSetValue<ReadingFormData>;
}

export default function ReadingInfoSection({
    register,
    watch,
    setValue
}: ReadingInfoSectionProps) {
    const statuses = useStatuses();
    const status = watch("statusId");
    const selectedStatus = statuses.find(
        item => item.id === status
    );
    const isDnf = selectedStatus?.name === "DNF";

    const [languageQuery, setLanguageQuery] = useState("");
    const languages = useLanguages(languageQuery);

    const rating = watch("rating");

    return (
        <section className="reading-info-section">
            <h3>
                   Reading Information
            </h3>

            <div className="reading-info-grid">
                <TextInput
                    label="Cover URL"
                    {...register("coverUrl")}
                />

                <SelectInput
                    label="Status"
                    options={statuses}
                    value={watch("statusId")}
                    onChange={(value) =>
                        setValue("statusId", value)
                    }
                />

                <AutocompleteInput
                    label="Reading language"
                    options={languages}
                    onQueryChange={(query)=>{setLanguageQuery(query);}}
                    onSelect={(language)=>{
                        setValue(
                            "readingLanguageId",
                            language.id
                        );
                    }}
                />

                <DateInput
                    label="Start date"
                    {...register("startDate")}
                />

                <DateInput
                    label="Finish date"
                    {...register("finishDate")}
                />

                <TextInput
                    label="Total pages"
                    type="number"
                    {...register("pagesTotal", {valueAsNumber:true})}
                />

                <TextInput
                    label="Pages read"
                    type="number"
                    {...register("pagesRead", {valueAsNumber:true})}
                />

                <RatingInput
                    label="Rating"
                    value={
                        rating
                            ? Number(rating)
                            : null
                    }
                    onChange={(value)=>
                        setValue("rating", value)
                    }
                />

                <RichTextEditor
                    label="Review"
                    value={watch("review")}
                    onChange={(value) =>
                        setValue("review", value)
                    }
                />

                <RichTextEditor
                    label="Characters"
                    value={watch("characters")}
                    onChange={(value) =>
                        setValue("characters", value)
                    }
                />

                {isDnf && (
                    <TextArea
                        label="DNF reason"
                        {...register("dnfReason")}
                    />
                )}
            </div>
        </section>
    );
}