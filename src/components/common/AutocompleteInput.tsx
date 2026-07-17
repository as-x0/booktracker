import { useState } from "react";
import "./AutocompleteInput.css";

export interface Option {
    id: string;
    name: string;
}

interface AutocompleteInputProps {
    label: string;
    options: Option[];
    onSelect: (option: Option) => void;
    onQueryChange?: (query: string) => void;
}

export default function AutocompleteInput({
                                              label,
                                              options,
                                              onSelect,
                                              onQueryChange
                                          }: AutocompleteInputProps) {

    const [query, setQuery] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="autocomplete">
            <label>{label}</label>

            <input
                type="text"
                value={query}
                onChange={(event)=>{
                    const value = event.target.value;
                    setQuery(value);
                    setShowOptions(true);

                    if(onQueryChange){
                        onQueryChange(value);
                    }
                }}

                onFocus={()=>
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
                                setQuery(option.name);
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