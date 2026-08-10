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
    value,
    onSelect,
    onQueryChange
}: AutocompleteInputProps) {

    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="autocomplete">
            <label>{label}</label>

            <input
                type="text"
                value={value ?? ""}
                onChange={(event) => {
                    const newValue = event.target.value;

                    onQueryChange?.(newValue);
                    setShowOptions(true);
                }}

                onFocus={() =>
                    setShowOptions(true)
                }
            />

            {showOptions && options.length > 0 && (
                <ul className="autocomplete-list">
                    {options.map(option => (
                        <li className="autocomplete-item"
                            key={option.id}
                            onClick={()=>{
                                onSelect(option);
                                setShowOptions(false);
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}