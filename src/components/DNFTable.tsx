import { useNavigate } from "react-router-dom";

import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";

import "./DNFTable.css";

interface DNFTableProps {
    readings: ReadingWithDetails[];
}

function DNFTable({
                      readings
                  }: DNFTableProps) {
    const navigate = useNavigate();

    return (
        <table className="dnf-table">

            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>DNF Reason</th>
            </tr>
            </thead>

            <tbody>
            {
                readings.map((reading) => (
                    <tr
                        key={reading.id}
                        onClick={() =>
                            navigate(`/readings/${reading.id}`)
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <td>{reading.book.title}</td>
                        <td>{reading.book.author.name}</td>
                        <td>{reading.dnf_reason ?? ""}</td>
                    </tr>
                ))
            }
            </tbody>

        </table>
    );
}

export default DNFTable;