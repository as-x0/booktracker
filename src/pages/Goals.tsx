import { useEffect, useState } from "react";

import MonthlyGoalsTable from "../components/MonthlyGoalsTable";
import type { MonthlyGoalMonth } from "../types/MonthlyGoal";

const MONTHLY_GOALS_STORAGE_KEY = "monthlyGoals";

function createDefaultMonthlyGoals(): MonthlyGoalMonth[] {
    const currentYear = new Date().getFullYear();

    return Array.from({ length: 12 }, (_, index) => ({
        month: `${currentYear}-${String(index + 1).padStart(2, "0")}`,
        books: [
            {
                id: crypto.randomUUID(),
                title: "",
                author: "",
                completed: false
            }
        ]
    }));
}

function Goals() {

    const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoalMonth[]>(
        () => {
            const savedGoals = localStorage.getItem(
                MONTHLY_GOALS_STORAGE_KEY
            );

            if (!savedGoals) {
                return createDefaultMonthlyGoals();
            }

            try {
                return JSON.parse(savedGoals) as MonthlyGoalMonth[];
            } catch {
                return createDefaultMonthlyGoals();
            }
        }
    );

    useEffect(() => {
        localStorage.setItem(
            MONTHLY_GOALS_STORAGE_KEY,
            JSON.stringify(monthlyGoals)
        );
    }, [monthlyGoals]);

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