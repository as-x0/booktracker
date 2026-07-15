import type { BookWithReading } from "../types/BookWithReading"

import "./BookTable.css"

interface BookTableProps {
    books: BookWithReading[]
}


function BookTable({
                       books
                   }: BookTableProps) {

    return (
        <table className="book-table">
            <thead>
            <tr>
                <th>
                    Title
                </th>
                <th>
                    Author
                </th>
                <th>
                    Status
                </th>
            </tr>
            </thead>

            <tbody>
            {
                books.map(
                    (item)=>(
                        <tr key={item.book.id}>
                            <td>
                                {item.book.title}
                            </td>
                            <td>
                                {item.author}
                            </td>
                            <td>
                                {item.status}
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
}


export default BookTable