import type { MonthlyGoalMonth } from "../types/MonthlyGoal";
import Button from "./common/Button";

import "./MonthlyGoalsTable.css"

interface MonthlyGoalsTableProps {
    goals: MonthlyGoalMonth[];
    onBookChange: (
        monthIndex: number,
        bookId: string,
        field: "title" | "author" | "completed",
        value: string | boolean
    ) => void;
    onAddBook: (monthIndex: number) => void;
    onRemoveBook: (monthIndex: number, bookId: string) => void;
}

function formatMonth(month: string): string {
    const [year, monthNumber] = month.split("-");

    const date = new Date(
        Number(year),
        Number(monthNumber) - 1
    );

    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}

function MonthlyGoalsTable({
                               goals,
                               onBookChange,
                               onAddBook,
                               onRemoveBook
                           }: MonthlyGoalsTableProps) {

    return (
        <table className="monthly-goals-table">
            <thead>
            <tr>
                <th>Month</th>
                <th>Title</th>
                <th>Author</th>
                <th></th>
                <th>Read</th>
                <th>Progress</th>
            </tr>
            </thead>

            <tbody>
            {goals.flatMap((month, monthIndex) => {

                const activeBooks = month.books.filter(
                    (book) => book.title.trim() !== ""
                );

                const totalBooks = activeBooks.length;

                const completedBooks = activeBooks.filter(
                    (book) => book.completed
                ).length;

                const progress = totalBooks > 0
                    ? Math.round(
                        (completedBooks / totalBooks) * 100
                    )
                    : 0;

                const bookRows = month.books.map((book, bookIndex) => (
                    <tr key={book.id}>

                        {bookIndex === 0 && (
                            <td
                                rowSpan={month.books.length}
                                className="monthly-goals-month"
                            >
                                {formatMonth(month.month)}
                            </td>
                        )}

                        <td>
                            <input
                                type="text"
                                value={book.title}
                                onChange={(event) =>
                                    onBookChange(
                                        monthIndex,
                                        book.id,
                                        "title",
                                        event.target.value
                                    )
                                }
                                placeholder="Title"
                            />
                        </td>

                        <td>
                            <input
                                type="text"
                                value={book.author}
                                onChange={(event) =>
                                    onBookChange(
                                        monthIndex,
                                        book.id,
                                        "author",
                                        event.target.value
                                    )
                                }
                                placeholder="Author"
                            />
                        </td>

                        <td>
                            {bookIndex > 0 && (
                                <button
                                    type="button"
                                    className="monthly-remove-button"
                                    onClick={() => onRemoveBook(monthIndex, book.id)}
                                    aria-label="Remove book"
                                >
                                    -
                                </button>
                            )}
                        </td>

                        <td className="monthly-goals-read">
                            <input
                                type="checkbox"
                                checked={book.completed}
                                onChange={(event) =>
                                    onBookChange(
                                        monthIndex,
                                        book.id,
                                        "completed",
                                        event.target.checked
                                    )
                                }
                            />
                        </td>

                        {bookIndex === 0 && (
                            <td
                                rowSpan={month.books.length}
                                className="monthly-goals-progress"
                            >
                                <div className="monthly-progress">
                                    <div className="monthly-progress-bar">
                                        <div
                                            className="monthly-progress-fill"
                                            style={{
                                                width: `${progress}%`
                                            }}
                                        />
                                    </div>

                                    <span>
                                        {completedBooks}/{totalBooks}
                                    </span>
                                </div>
                            </td>
                        )}

                    </tr>
                ));

                const addRow = (
                    <tr
                        key={`${month.month}-add`}
                        className="monthly-goals-add-row"
                    >
                        <td></td>

                        <td colSpan={2}>
                            <Button
                                onClick={() => onAddBook(monthIndex)}
                            >
                                +
                            </Button>
                        </td>

                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                );

                return [...bookRows, addRow];
            })}
            </tbody>
        </table>
    );
}

export default MonthlyGoalsTable;