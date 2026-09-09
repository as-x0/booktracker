import { useEffect, useState } from "react";

import type { QuoteWithDetails } from "../types/QuoteWithDetails.ts";

import QuoteTable from "../components/QuoteTable.tsx";

import { getQuotes } from "../services/quoteService.ts";

function Quotes() {
    const [quotes, setQuotes] = useState<QuoteWithDetails[]>([]);

    useEffect(() => {
        async function loadQuotes() {
            const data = await getQuotes();
            setQuotes(data);
        }

        loadQuotes();
    }, []);

    return (
        <div>
            <h1>Quotes</h1>

            <QuoteTable
                quotes={quotes}
            />
        </div>
    );
}

export default Quotes;