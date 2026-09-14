import {useState} from "react";

import "./FilterSelect.css";

interface FilterSelectProps {
    value: string;
    options: string[];
    placeholder: string;
    onChange: (value: string) => void;
}

function FilterSelect({
                          value,
                          options,
                          placeholder,
                          onChange
                      }: FilterSelectProps) {

    const [isOpen, setIsOpen] = useState(false);

    function handleSelect(option: string) {
        onChange(option);
        setIsOpen(false);
    }

    function handleClear() {
        onChange("");
        setIsOpen(false);
    }

    return (
        <div className="filter-select">

            <button
                type="button"
                className="filter-select-box"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {value || placeholder}
                </span>

                <span className="filter-select-arrow">
                    ▼
                </span>
            </button>

            {
                isOpen && (
                    <ul className="filter-select-list">

                        <li
                            className="filter-select-item"
                            onClick={handleClear}
                        >
                            {placeholder}
                        </li>

                        {
                            options.map((option) => (
                                <li
                                    key={option}
                                    className={`filter-select-item ${
    option === value
        ? "selected"
        : ""
}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </li>
                            ))
                        }

                    </ul>
                )
            }

        </div>
    );
}

export default FilterSelect;