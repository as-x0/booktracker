import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <nav>

            <h2>📚 BookTracker</h2>

            <ul>

                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/books">
                        Books
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/tbr">
                        TBR
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dnf">
                        DNF
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/goals">
                        Goals
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/statistics">
                        Statistics
                    </NavLink>
                </li>

            </ul>

        </nav>
    )
}

export default Sidebar