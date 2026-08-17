import { useState } from "react";
import "./AutocompleteInput.css";

export interface Option {
    id: string;
    name: string;
}

interface AutocompleteInputProps {
    label: string;
    options: Option[];
    value?: string;
    onSelect: (option: Option) => void;
    onQueryChange?: (query: string) => void;
}

export default function AutocompleteInput({
    label,
    options,
    value = "",
    onSelect,
    onQueryChange
}: AutocompleteInputProps) {

    const [showOptions, setShowOptions] = useState(false);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const newValue = event.target.value;

        onQueryChange?.(newValue);
        setShowOptions(true);
    }

    function handleSelect(option: Option) {
        setShowOptions(false);
        onSelect(option);
    }

    return (
        <div className="autocomplete">
            <label>
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={() => setShowOptions(true)}
            />

            {showOptions && options.length > 0 && (
                <ul className="autocomplete-list">
                    {options.map(option => (
                        <li
                            key={option.id}
                            className="autocomplete-item"
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}