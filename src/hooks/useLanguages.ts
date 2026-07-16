import { useEffect, useState } from "react";
import { searchLanguages } from "../services/languageService";
import type { Language } from "../types/Language";

export default function useLanguages(
    query: string
) {

    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        async function loadLanguages() {
            const data = await searchLanguages(query);
            setLanguages(data);
        }
        loadLanguages();
    }, [query]);

    return languages;
}