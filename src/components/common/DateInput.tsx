interface DateInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export default function DateInput({
    label,
    value,
    onChange,
    required = false
}: DateInputProps) {

    return (
        <div>
            <label>
                {label}
            </label>

            <input
                type="date"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                required={required}
            />
        </div>
    );
}