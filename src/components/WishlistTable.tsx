import { useNavigate } from "react-router-dom";
import type { WishlistWithDetails } from "../types/WishlistWithDetails";
import "./WishlistTable.css";

interface WishlistTableProps {
    wishlist: WishlistWithDetails[];
}

function WishlistTable({
    wishlist
}: WishlistTableProps) {
    const navigate = useNavigate();

    return (
        <table className="wishlist-table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Availability</th>
                <th>Recommended by</th>
            </tr>
            </thead>

            <tbody>
                {wishlist.map((item) => (
                    <tr
                        key={item.id}
                        onClick={() => navigate(`/tbr/${item.id}`)}
                        className="wishlist-table-row"
                    >
                        <td>{item.book.title}</td>
                        <td>{item.book.author.name}</td>
                        <td>{item.book.genre?.name ?? "-"}</td>
                        <td>{item.availability?.name ?? "-"}</td>
                        <td>{item.recommended_by ?? "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default WishlistTable;