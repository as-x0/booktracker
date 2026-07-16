import {useEffect, useState} from 'react';
import {getGenres} from "../services/genreService.ts";
import type {Genre} from "../types/Genre.ts";

export default function useGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        async function loadGenres() {
            const data = await getGenres();
            setGenres(data);
        }
        loadGenres();
    }, []);

    return genres;
}