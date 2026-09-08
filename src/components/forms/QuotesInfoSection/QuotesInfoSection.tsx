import {
    useFieldArray,
    type Control,
    type UseFormRegister,
    type UseFormSetValue,
    type UseFormWatch
} from "react-hook-form";

import type { ReadingFormData } from "../../../forms/ReadingForm/ReadingForm.tsx";

import RichTextEditor from "../../common/RichTextEditor/RichTextEditor.tsx";
import Button from "../../common/Button";

import "./QuotesInfoSection.css"

interface QuotesSectionProps {
    control: Control<ReadingFormData>;
    register: UseFormRegister<ReadingFormData>;
    watch: UseFormWatch<ReadingFormData>;
    setValue: UseFormSetValue<ReadingFormData>;
}

export default function QuotesInfoSection({
    control,
    register,
    watch,
    setValue
}: QuotesSectionProps) {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "quotes"
    });

    const quotes = watch("quotes") ?? [];

    function addQuote() {
        append({
            text: "",
            page: undefined,
            notes: ""
        });
    }

    return (
        <section className="quotes-section">

            <h3>Quotes</h3>

            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="quote"
                >

                    <RichTextEditor
                        label={`Quote ${index + 1}`}
                        value={quotes[index]?.text ?? ""}
                        placeholder="Write a quote..."
                        onChange={(value) =>
                            setValue(
                                `quotes.${index}.text`,
                                value
                            )
                        }
                    />

                    <div className="quote-page">
                        <label>
                            Page
                        </label>
                        <input
                            type="number"
                            min="1"
                            {...register(`quotes.${index}.page`, {
                                valueAsNumber: true
                            })}
                        />
                    </div>

                    <div className="quote-notes">
                        <label>Notes</label>
                        <textarea
                            {...register(`quotes.${index}.notes`)}
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={() => remove(index)}
                    >
                        Remove
                    </Button>

                </div>
            ))}

            <Button
                type="button"
                onClick={addQuote}
            >
                + Add quote
            </Button>

        </section>
    );
}