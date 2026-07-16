import { forwardRef } from "react";
import "./Input.css";
import type {
    ChangeEventHandler,
    FocusEventHandler
} from "react";

interface DateInputProps {
    label: string;
    required?: boolean;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    function DateInput({
        label,
        required = false,
        name,
        onChange,
        onBlur
    }, ref) {

        return (
            <div>
                <label>{label}</label>

                <input
                    ref={ref}
                    type="date"
                    name={name}
                    required={required}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
        );
    }
);

export default DateInput;