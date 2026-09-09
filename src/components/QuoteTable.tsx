import type { QuoteWithDetails } from "../types/QuoteWithDetails.ts";

import "./QuoteTable.css";

interface QuoteTableProps {
    quotes: QuoteWithDetails[];
}

function QuoteTable({
                        quotes
                    }: QuoteTableProps) {
        const sortedQuotes = [...quotes].sort((a, b) => {
        const dateA = a.reading.start_date ?? "";
        const dateB = b.reading.start_date ?? "";

        return dateA.localeCompare(dateB);
    });

    const rows = [];

    let i = 0;

    while (i < sortedQuotes.length) {
        const currentQuote = sortedQuotes[i];

        const sameBookQuotes = sortedQuotes.filter(
            quote =>
                quote.reading.book.id ===
                currentQuote.reading.book.id
        );

        for (let j = 0; j < sameBookQuotes.length; j++) {
            const quote = sameBookQuotes[j];

            rows.push(
                <tr key={quote.id}>
                    {j === 0 && (
                        <>
                            <td rowSpan={sameBookQuotes.length}>
                                {quote.reading.book.title}
                            </td>

                            <td rowSpan={sameBookQuotes.length}>
                                {quote.reading.book.author.name}
                            </td>
                        </>
                    )}

                    <td>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: quote.text
                            }}
                        />

                        {quote.page !== null && (
                            <> [page {quote.page}]</>
                        )}
                    </td>

                    <td>
                        {quote.notes}
                    </td>
                </tr>
            );
        }

        i += sameBookQuotes.length;
    }

    return (
        <table className="quote-table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Quote</th>
                <th>Notes</th>
            </tr>
            </thead>

            <tbody>
            {rows}
            </tbody>
        </table>
    );
}

export default QuoteTable;