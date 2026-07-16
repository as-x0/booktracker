import { useState } from "react";

export interface Option {
    id: string;
    name: string;
}


interface AutocompleteInputProps {
    label: string;
    options: Option[];
    onSelect: (option: Option) => void;
}

export default function AutocompleteInput({
    label,
    options,
    onSelect
}: AutocompleteInputProps) {

    const [query, setQuery] = useState("");

    const [showOptions, setShowOptions] = useState(false);

    const filteredOptions = options.filter(option =>
        option.name
            .toLowerCase()
            .includes(query.toLowerCase())

    );

    return (
        <div>
            <label>{label}</label>

            <input
                type="text"
                value={query}
                onChange={(event)=>{
                    setQuery(event.target.value);
                    setShowOptions(true);
                }}
                onFocus={() =>
                    setShowOptions(true)
                }
            />

            {showOptions && query && (
                    <ul>
                        {
                            filteredOptions.map(option => (
                                <li
                                    key={option.id}
                                    onClick={()=>{
                                        onSelect(option);
                                        setQuery(option.name);
                                        setShowOptions(false);
                                    }}
                                >
                                    {option.name}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
}