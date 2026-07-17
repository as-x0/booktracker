import { useEffect, useState } from "react";

import { searchAuthors } from "../services/authorService";
import type { Author } from "../types/Author";

export default function useAuthors(query: string) {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        async function loadAuthors() {
            const data = await searchAuthors(query);
            setAuthors(data);
        }
        loadAuthors();
    }, [query]);

    return authors;
}