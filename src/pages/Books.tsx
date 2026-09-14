import { useEffect, useMemo, useState} from "react";

import type { ReadingWithDetails } from "../types/ReadingWithDetails.ts";

import ReadingForm from "../forms/ReadingForm/ReadingForm.tsx";
import BookTable from "../components/BookTable.tsx";
import Button from "../components/common/Button.tsx";
import FilterSelect from "../components/common/FilterSelect/FilterSelect.tsx";

import { getReadings } from "../services/readingService.ts";

import "./Books.css"

function Books() {
    const [showForm, setShowForm] = useState(false);
    const [readings, setReadings] = useState<ReadingWithDetails[]>([]);

    const [search, setSearch] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(()=>{
        async function loadReadings(){
            const data = await getReadings();
            setReadings(data);
        }
        loadReadings();
    }, []);

    const authors = useMemo(() => {
        return [...new Set(
            readings.map(reading => reading.book.author.name)
        )].sort();
    }, [readings]);

    const genres = useMemo(() => {
        return [...new Set(
            readings
                .map(reading => reading.book.genre?.name)
                .filter((genre): genre is string => Boolean(genre))
        )].sort();
    }, [readings]);

    const statuses = useMemo(() => {
        return [...new Set(
            readings.map((reading) => reading.status.name)
        )].sort();
    }, [readings]);

    const filteredReadings = useMemo(() => {
        const searchLower = search.toLowerCase().trim();

        return readings.filter(reading => {
            const matchesSearch = searchLower === "" || reading.book.title.toLowerCase().includes(searchLower);
            const matchesAuthor = authorFilter === "" || reading.book.author.name === authorFilter;
            const matchesGenre = genreFilter === "" || reading.book.genre?.name === genreFilter;
            const matchesStatus = statusFilter === "" || reading.status.name === statusFilter;

            return (
                matchesSearch && matchesAuthor && matchesGenre && matchesStatus
            );
        });
    }, [
        readings,
        search,
        authorFilter,
        genreFilter,
        statusFilter,
    ]);

    function clearFilters(){
        setSearch("");
        setAuthorFilter("");
        setGenreFilter("");
        setStatusFilter("");
    }

    const hasFilters =
        search !== "" ||
        authorFilter !== "" ||
        genreFilter !== "" ||
        statusFilter !== "";

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
            {showForm && (
                <ReadingForm />
            )}

            <div className="book-filters">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <FilterSelect
                    value={authorFilter}
                    options={authors}
                    placeholder="All authors"
                    onChange={setAuthorFilter}
                />

                <FilterSelect
                    value={genreFilter}
                    options={genres}
                    placeholder="All genres"
                    onChange={setGenreFilter}
                />

                <FilterSelect
                    value={statusFilter}
                    options={statuses}
                    placeholder="All Statuses"
                    onChange={setGenreFilter}
                />

                {
                    hasFilters && (
                        <Button onClick={clearFilters}>
                            Clear filters
                        </Button>
                    )
                }
            </div>

            <BookTable
                readings={filteredReadings}
            />

        </div>
    )
}

export default Books