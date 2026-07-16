import type { ReactNode } from "react";
import "./Button.css"

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}

export default function Button({
    children,
    onClick,
    type = "button"
}: ButtonProps) {

    return (
        <button className="button"
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}