export interface SelectOption {
    id: string;
    name: string;
}


interface SelectInputProps {
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    required?: boolean;
}

export default function SelectInput({
    label,
    value,
    options,
    onChange,
    required = false
}: SelectInputProps){

    return (
        <div>
            <label>{label}</label>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)}
                required={required}
            >

                <option value="">
                    Select...
                </option>

                {options.map((option) => (
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