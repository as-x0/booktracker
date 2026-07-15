import BookCard from "../components/BookCard"
import GoalProgress from "../components/GoalProgress"


function Home() {

    const currentBook = {
        id:1,
        title: "The Name of the Wind",
        author_id:1,
        genre_id:2,
        cover_url:"https://via.placeholder.com/150x220",
        publication_year:2007,
        original_language_id:1,
    }

    const recentBooks = [
        {
            book:{
                id:2,
                title: "Dune",
                author_id:2,
                genre_id:1,
                cover_url:"https://via.placeholder.com/150x220",
                publication_year:1965,
                original_language_id:1,
            },
            author:"Frank Herbert",
        },

        {
            book:{
                id:3,
                title: "1984",
                author_id:3,
                genre_id:1,
                cover_url:"https://via.placeholder.com/150x220",
                publication_year:1948,
                original_language_id:1,
            },
            author:"George Orwell",
        },

        {
            book:{
                id:4,
                title: "The Hobbit",
                author_id:4,
                genre_id:3,
                cover_url:"https://via.placeholder.com/150x220",
                publication_year:1952,
                original_language_id:1,
            },
            author: "J.R.R Tolkien",
        },
    ]

    return (
        <div>
            <h1>Home</h1>

            <section>
                <h2>
                    Currently Reading
                </h2>

                <BookCard
                    book={currentBook}
                    author="Patrick Rothfuss"
                />
            </section>

            <section>
                <h2>
                    Monthly Goal
                </h2>

                <GoalProgress
                    current={3}
                    target={5}
                />
            </section>

            <section>
                <h2>
                    Recently Finished
                </h2>

                <div
                    style={{
                        display:"flex",
                        gap:"20px"
                    }}
                >
                    {
                        recentBooks.map(
                            (item)=>(
                                <BookCard
                                    key={item.book.id}
                                    book={item.book}
                                    author={item.author}
                                />
                            )
                        )
                    }
                </div>
            </section>

        </div>

    )

}


export default Home