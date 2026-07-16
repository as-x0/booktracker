import { forwardRef } from "react";
import type {
    ChangeEventHandler,
    FocusEventHandler
} from "react";
import "../Input.css";

interface TextInputProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    type?:string;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInout({
        label,
        placeholder,
        required = false,
        type = "text",
        name,
        onChange,
        onBlur
}, ref){
        return(
            <div>
                <label>{label}</label>

                <input
                    ref={ref}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
        );
    }
);

export default TextInput;