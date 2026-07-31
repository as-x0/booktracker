import {
    FaStar,
    FaStarHalfAlt
} from "react-icons/fa";

import "./RatingInput.css";

interface RatingInputProps {
    label: string;
    value: number | null;
    onChange: (value: number) => void;
}

export default function RatingInput({
                                        label,
                                        value,
                                        onChange
                                    }: RatingInputProps) {

    function handleClick(
        event: React.MouseEvent<HTMLSpanElement>,
        star: number
    ) {

        const rect =
            event.currentTarget.getBoundingClientRect();

        const clickPosition =
            event.clientX - rect.left;

        const half =
            clickPosition < rect.width / 2;

        onChange(
            half
                ? star - 0.5
                : star
        );
    }

    function renderStar(star: number) {
        if(!value) {
            return (
                <FaStar
                    className="empty-star"
                />
            );
        }

        if(value >= star) {
            return (
                <FaStar />
            );
        }

        if(value >= star - 0.5) {
            return (
                <FaStarHalfAlt />
            );
        }

        return (
            <FaStar
                className="empty-star"
            />
        );
    }

    return (
        <div className="rating-input">
            <label>
                {label}
            </label>


            <div className="stars">
                {
                    [1,2,3,4,5].map(star => (
                        <span
                            key={star}
                            className="star"
                            onClick={(event)=>
                                handleClick(
                                    event,
                                    star
                                )
                            }
                        >
                            {renderStar(star)}
                        </span>
                    ))
                }
            </div>

            {
                value !== null &&
                (
                    <span className="rating-value">
                        {value} / 5
                    </span>
                )
            }
        </div>
    );
}