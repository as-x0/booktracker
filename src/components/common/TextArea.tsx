import { forwardRef } from "react";
import "../Input.css";
import type {
    ChangeEventHandler,
    FocusEventHandler
} from "react";

interface TextAreaProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    name?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    function TextArea({
    label,
    placeholder,
    required = false,
    rows = 5,
    name,
    onChange,
    onBlur
}, ref) {

        return (
            <div>
                <label>{label}</label>

                <textarea
                    ref={ref}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
        );
    }
);

export default TextArea;