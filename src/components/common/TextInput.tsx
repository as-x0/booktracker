import type { ChangeEvent } from "react";

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

export default function TextInput({
    label,
    value,
    onChange,
    placeholder,
    required = false}:TextInputProps){
    function handleChange(
        event:ChangeEvent<HTMLInputElement>
    ){
        onChange(event.target.value);
    }

    return(
        <div>
            <label>
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}