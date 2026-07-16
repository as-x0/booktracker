import { NavLink } from "react-router-dom"

import {
    FaHome,
    FaBook,
    FaList,
    FaBan,
    FaBullseye,
    FaChartBar,
} from "react-icons/fa"

import "./Sidebar.css"

function Sidebar() {
    return(
        <aside className="sidebar">
            <h2 className="sidebar-title">
                📚 BookTracker
            </h2>

           <nav>
                <NavLink to="/" className="sidebar-link">
                    <FaHome />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/books" className="sidebar-link">
                    <FaBook />
                    <span>Books</span>
              </NavLink>

                <NavLink to="/tbr" className="sidebar-link">
                    <FaList />
                    <span>TBR</span>
                </NavLink>

                <NavLink to="/dnf" className="sidebar-link">
                    <FaBan />
                    <span>DNF</span>
              </NavLink>

                <NavLink to="/goals" className="sidebar-link">
                    <FaBullseye />
                    <span>Goals</span>
               </NavLink>

                <NavLink to="/statistics" className="sidebar-link">
                    <FaChartBar />
                   <span>Statistics</span>
               </NavLink>
           </nav>
      </aside>
    )
}

export default Sidebar