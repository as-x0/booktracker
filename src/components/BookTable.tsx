import { useNavigate } from "react-router-dom";
import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";

import "./BookTable.css"

interface BookTableProps {
    readings: ReadingWithDetails[];
    onReadingClick?: (reading: ReadingWithDetails) => void;
}

function BookTable({
                       readings
                   }: BookTableProps) {
    const navigate = useNavigate();

    return (
        <table className="book-table">

            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
            </tr>
            </thead>

            <tbody>
            {
                readings.map(
                    (reading)=>(
                        <tr
                            onClick={() => navigate(`/readings/${reading.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{reading.book.title}</td>
                            <td>{reading.book.author.name}</td>
                            <td>{reading.status.name}</td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
}

export default BookTable;