import { useEffect, useState } from "react";

import { searchSeries } from "../services/seriesService.ts";
import type { Series } from "../types/Series";

export default function useSeries(query: string) {
    const [series, setSeries] = useState<Series[]>([]);

    useEffect(() => {
        async function loadSeries() {
            setSeries(await searchSeries(query));
        }
        loadSeries();
    }, [query]);

    return series;
}