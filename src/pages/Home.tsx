import {useEffect, useState} from "react";

import type {ReadingWithDetails} from "../types/ReadingWithDetails";

import {getReadings} from "../services/readingService";

import BookCard from "../components/BookCard";
import GoalProgress from "../components/GoalProgress";

function Home() {
    const [readings, setReadings]
        = useState<ReadingWithDetails[]>([]);

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
                <GoalProgress
                    current={3}
                    target={5}
                />
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