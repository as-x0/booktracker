import {useState} from "react";

import BookTable from "../components/BookTable"
import ReadingForm from "../forms/ReadingForm/ReadingForm.tsx";
import Button from "../components/common/Button.tsx";

import { booksTable } from "../data/mockData"

function Books() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <h1>Books</h1>

            <Button
                onClick={()=> setShowForm(!showForm)}
            >
                {
                    showForm
                    ? "Close"
                    : "New Reading"
                }
            </Button>

            {showForm && (<ReadingForm />)}

            <BookTable
                books={booksTable}
            />
        </div>
    )
}

export default Books