import "./BookCard.css"

interface BookCardProps {
    title: string
    author: string
    cover: string
}


function BookCard({ title, author, cover }: BookCardProps) {

    return (

        <div className="book-card">

            <img
                src={cover}
                alt={title}
            />

            <div>

                <h3>{title}</h3>

                <p>{author}</p>

            </div>

        </div>

    )

}


export default BookCard