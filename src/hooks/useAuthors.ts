import { useEffect, useState } from "react";

import {type AuthorSearchResult, searchAuthors} from "../services/authorService";

export default function useAuthors(query: string) {
    const [authors, setAuthors] = useState<AuthorSearchResult[]>([]);

    useEffect(() => {
        async function loadAuthors() {
            const data = await searchAuthors(query);
            setAuthors(data);
        }
        loadAuthors();
    }, [query]);

    return authors;
}