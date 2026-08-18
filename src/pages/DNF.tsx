import { useEffect, useState } from "react";

import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";

import DNFTable from "../components/DNFTable.tsx";

import { getReadings } from "../services/readingService.ts";

function DNF() {
    const [readings, setReadings] =
        useState<ReadingWithDetails[]>([]);

    useEffect(() => {
        async function loadReadings() {
            const data = await getReadings();
            setReadings(data);
        }

        void loadReadings();
    }, []);

    const dnfReadings = readings.filter(
        (reading) => reading.status.name === "DNF"
    );

    return (
        <div>
            <h1>DNF</h1>

            <DNFTable
                readings={dnfReadings}
            />
        </div>
    );
}

export default DNF;