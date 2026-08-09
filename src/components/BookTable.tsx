import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";
import "./BookTable.css"

interface BookTableProps {
    readings: ReadingWithDetails[];
    onReadingClick: (reading: ReadingWithDetails) => void;
}

function BookTable({
                       readings
                   }: BookTableProps) {

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
                        <tr key={reading.id}>
                            <td>{reading.book.title}</td>

                            <td>{reading.book.author.name}</td>

                            <td>{reading.status.name}</td>

                            {/*key={item.id}*/}
                            {/*onClick={() => onReadingClick(item)}*/}
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
}

export default BookTable;