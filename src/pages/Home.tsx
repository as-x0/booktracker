import BookCard from "../components/BookCard"
import GoalProgress from "../components/GoalProgress"
import {
    currentBook,
    recentBooks,
    monthlyGoal
} from "../data/mockData"

function Home() {
    return (
        <div>
            <h1>Home</h1>

            <section>
                <h2>Currently Reading</h2>
                <BookCard
                    book={currentBook}
                    author="Patrick Rothfuss"
                />
            </section>

            <section>
                <h2>Monthly Goal</h2>
                <GoalProgress
                    current={monthlyGoal.current}
                    target={monthlyGoal.target}
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
                    {recentBooks.map(
                        (item)=>(
                            <BookCard
                                key={item.book.id}
                                book={item.book}
                                author={item.author}
                            />
                        )
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home