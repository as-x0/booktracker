import {useEffect, useState} from "react";
import {getStatuses} from "../services/readingStatusService.ts";
import type {Status} from "../types/Status";

export default function useStatuses() {
    const [statuses, setStatuses] = useState<Status[]>([]);

    useEffect(() => {
        async function loadStatuses() {
            const data = await getStatuses();
            setStatuses(data);
        }
        loadStatuses();
    }, []);

    return statuses;
}