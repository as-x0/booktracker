import {useState} from "react";
import {useEffect} from "react";

import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";

import ReadingForm from "../forms/ReadingForm/ReadingForm.tsx";
import BookTable from "../components/BookTable.tsx";
import Button from "../components/common/Button.tsx";

import {getReadings} from "../services/readingService.ts";

function Books() {
    const [showForm, setShowForm] = useState(false);
    const [readings, setReadings] = useState<ReadingWithDetails[]>([]);

    useEffect(()=>{
        async function loadReadings(){
            const data = await getReadings();
            setReadings(data);
        }
        loadReadings();
    }, []);

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

            {
                showForm && (
                    <ReadingForm />
                )
            }

            <BookTable
                readings={readings}
            />

        </div>
    )
}

export default Books