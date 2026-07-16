import { forwardRef } from "react";
import "../Input.css";
import type {
    ChangeEventHandler,
    FocusEventHandler
} from "react";

export interface SelectOption {
    id: string;
    name: string;
}


interface SelectInputProps {
    label: string;
    options: SelectOption[];
    required?: boolean;
    name?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    onBlur?: FocusEventHandler<HTMLSelectElement>;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
    function SelectInput({
        label,
        options,
        required = false,
        name,
        onChange,
        onBlur
    }, ref) {

        return (
            <div>
                <label>{label}</label>

                <select
                    ref={ref}
                    name={name}
                    required={required}
                    onChange={onChange}
                    onBlur={onBlur}
                >
                    <option value="">
                        Select...
                    </option>

                    {options.map(option => (
                            <option
                                key={option.id}
                                value={option.id}
                            >
                                {option.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }
);

export default SelectInput;