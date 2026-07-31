import {
    useState
} from "react";
import "./SelectInput.css";

export interface SelectOption {
    id: string;
    name: string;
}

interface SelectInputProps {
    label: string;
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
}

export default function SelectInput({
                                        label,
                                        options,
                                        value,
                                        onChange
                                    }: SelectInputProps) {

    const [open, setOpen] = useState(false);


    const selectedOption = options.find(
        option => option.id === value
    );

    function selectOption(option: SelectOption) {
        onChange(option.id);
        setOpen(false);
    }

    return (
        <div className="select-input">
            <label>
                {label}
            </label>

            <div
                className="select-box"
                onClick={() =>
                    setOpen(!open)
                }
            >
                <span>
                    {
                        selectedOption
                            ? selectedOption.name
                            : "Select..."
                    }
                </span>

                <span>
                    ▾
                </span>
            </div>

            {
                open && (
                    <ul className="select-list">
                        {
                            options.map(option => (
                                <li
                                    key={option.id}
                                    className="select-item"
                                    onClick={() =>
                                        selectOption(option)
                                    }
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

// import { forwardRef } from "react";
// import "./Input.css";
// import type {
//     ChangeEventHandler,
//     FocusEventHandler
// } from "react";
//
// export interface SelectOption {
//     id: string;
//     name: string;
// }
//
//
// interface SelectInputProps {
//     label: string;
//     options: SelectOption[];
//     required?: boolean;
//     name?: string;
//     onChange?: ChangeEventHandler<HTMLSelectElement>;
//     onBlur?: FocusEventHandler<HTMLSelectElement>;
// }
//
// const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
//     function SelectInput({
//         label,
//         options,
//         required = false,
//         name,
//         onChange,
//         onBlur
//     }, ref) {
//
//         return (
//             <div>
//                 <label>{label}</label>
//
//                 <select
//                     ref={ref}
//                     name={name}
//                     required={required}
//                     onChange={onChange}
//                     onBlur={onBlur}
//                 >
//                     <option value="">
//                         Select...
//                     </option>
//
//                     {options.map(option => (
//                             <option
//                                 key={option.id}
//                                 value={option.id}
//                             >
//                                 {option.name}
//                             </option>
//                         ))
//                     }
//                 </select>
//             </div>
//         );
//     }
// );
//
// export default SelectInput;