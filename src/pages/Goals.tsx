import { useEffect, useState } from "react";

import MonthlyGoalsTable from "../components/MonthlyGoalsTable";
import type { MonthlyGoalMonth } from "../types/MonthlyGoal";
import { getMonthlyGoals } from "../services/monthlyGoalService.ts";

function Goals() {

    const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoalMonth[]>([]);

    useEffect(() => {
        async function loadGoals() {
            try {
                const data = await getMonthlyGoals();
                setMonthlyGoals(data);
            } catch (error) {
                console.error("Error loading monthly goals:", error);
            }
        }

        loadGoals();
    }, []);

    function handleBookChange(
        monthIndex: number,
        bookId: string,
        field: "title" | "author" | "completed",
        value: string | boolean
    ) {
        setMonthlyGoals((currentGoals) =>
            currentGoals.map((month, index) => {
                if (index !== monthIndex) {
                    return month;
                }

                return {
                    ...month,
                    books: month.books.map((book) =>
                        book.id === bookId
                            ? {
                                ...book,
                                [field]: value
                            }
                            : book
                    )
                };
            })
        );
    }

    function handleAddBook(monthIndex: number) {
        setMonthlyGoals((currentGoals) =>
            currentGoals.map((month, index) => {
                if (index !== monthIndex) {
                    return month;
                }

                return {
                    ...month,
                    books: [
                        ...month.books,
                        {
                            id: crypto.randomUUID(),
                            title: "",
                            author: "",
                            completed: false
                        }
                    ]
                };
            })
        );
    }

    function handleRemoveBook(
        monthIndex: number,
        bookId: string
    ) {
        setMonthlyGoals((currentGoals) =>
            currentGoals.map((month, index) => {
                if (index !== monthIndex) {
                    return month;
                }

                const remainingBooks = month.books.filter(
                    (book) => book.id !== bookId
                );

                return {
                    ...month,
                    books: remainingBooks.length > 0
                        ? remainingBooks
                        : [
                            {
                                id: crypto.randomUUID(),
                                title: "",
                                author: "",
                                completed: false
                            }
                        ]
                };
            })
        );
    }

    return (
        <div>
            <h1>Goals</h1>

            <section>
                <h2>Monthly Goals</h2>

                <MonthlyGoalsTable
                    goals={monthlyGoals}
                    onBookChange={handleBookChange}
                    onAddBook={handleAddBook}
                    onRemoveBook={handleRemoveBook}
                />
            </section>
        </div>
    );
}

export default Goals;