import BookCard from "../components/BookCard"
import GoalProgress from "../components/GoalProgress"


function Home() {


    const currentBook = {

        title: "The Name of the Wind",

        author: "Patrick Rothfuss",

        cover:
            "https://via.placeholder.com/150x220"

    }


    const recentBooks = [

        {
            title: "Dune",
            author: "Frank Herbert",
            cover:
                "https://via.placeholder.com/150x220"
        },


        {
            title: "1984",
            author: "George Orwell",
            cover:
                "https://via.placeholder.com/150x220"
        },


        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            cover:
                "https://via.placeholder.com/150x220"
        }

    ]


    return (

        <div>


            <h1>Home</h1>


            <section>

                <h2>
                    Currently Reading
                </h2>


                <BookCard
                    {...currentBook}
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
                            (book)=>(
                                <BookCard
                                    key={book.title}
                                    {...book}
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