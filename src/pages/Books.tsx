import BookTable from "../components/BookTable"

import { booksTable } from "../data/mockData"

function Books() {
    return (
        <div>
            <h1>
                Books
            </h1>

            <BookTable
                books={booksTable}
            />
        </div>
    )
}

export default Books