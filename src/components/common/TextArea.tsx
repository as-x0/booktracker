interface TextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
}

export default function TextArea({
    label,
    value,
    onChange,
    placeholder,
    required = false,
    rows = 5
}: TextAreaProps) {

    return (
        <div>
            <label>
                {label}
            </label>

            <textarea
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                required={required}
                rows={rows}
            />
        </div>
    );
}