import { useEffect, useState } from "react";

import { searchCountries } from "../services/countryService";
import type { Country } from "../types/Country";

export default function useCountries(query: string) {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        async function loadCountries() {
            const data = await searchCountries(query);
            setCountries(data);
        }
        loadCountries();
    }, [query]);

    return countries;
}