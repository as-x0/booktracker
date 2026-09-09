import {useEffect, useState} from "react";

import type { ReadingWithDetails } from "../types/ReadingWithDetails";
import type { MonthlyGoalMonth } from "../types/MonthlyGoal.ts";

import {getReadings} from "../services/readingService";

import BookCard from "../components/BookCard";
import GoalProgress from "../components/GoalProgress";

import "./Home.css"

const MONTLY_GOALS_STORAGE_KEY = "monthlyGoals";

function Home() {
    const [readings, setReadings] = useState<ReadingWithDetails[]>([]);

    const [monthlyGoals] =
        useState<MonthlyGoalMonth[]>(() => {
            const savedGoals = localStorage.getItem(
                MONTLY_GOALS_STORAGE_KEY
            );

            if (!savedGoals) {
                return [];
            }

            try {
                return JSON.parse(savedGoals) as MonthlyGoalMonth[];
            } catch {
                return [];
            }
        });

    useEffect(()=>{
        async function loadReadings(){
            const data = await getReadings();
            setReadings(data);
        }
        loadReadings();
    },[]);

    const currentReading =
        readings.filter(
            reading =>
                reading.status.name === "Currently reading"
        );

    const recentReadings =
        [...readings]
            .filter(
                reading =>
                    reading.finish_date !== null
            )
            .sort(
                (a,b)=>
                    new Date(b.finish_date!).getTime()
                    -
                    new Date(a.finish_date!).getTime()
            )
            .slice(0,3);

    const currentMonth =
        `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
        ).padStart(2, "0")}`;
    const currentMonthGoal =
        monthlyGoals.find(
            month => month.month === currentMonth
        );
    const activeGoalBooks =
        currentMonthGoal?.books.filter(
            book => book.title.trim() !== ""
        ) ?? [];
    const goalTarget = activeGoalBooks.length;
    const goalCurrent =
        activeGoalBooks.filter(
            book => book.completed
        ).length;

    return (
        <div>
            <h1>Home</h1>

            <section>
                <h2>Currently Reading</h2>
                {
                    currentReading.map(
                        reading => (

                            <BookCard
                                key={reading.id}
                                reading={reading}
                            />

                        )
                    )
                }
            </section>

            <section>
                <h2>Monthly Goal</h2>

                <div className="monthly-goal-home">
                    <div className="monthly-goal-books">
                        {activeGoalBooks.map(book => (
                            <div key={book.id} className="monthly-goal-book">
                                <strong>{book.title}</strong>
                                {book.author && (
                                    <span> — {book.author}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <GoalProgress
                        current={goalCurrent}
                        target={goalTarget}
                    />
                </div>
            </section>

            <section>
                <h2>Recently Finished</h2>
                <div
                    style={{
                        display:"flex",
                        gap:"20px"
                    }}
                >
                    {
                        recentReadings.map(
                            reading => (

                                <BookCard
                                    key={reading.id}
                                    reading={reading}
                                />

                            )
                        )
                    }
                </div>
            </section>
        </div>
    )
}
export default Home;