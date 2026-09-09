import { useState } from "react";
import { NavLink } from "react-router-dom"

import {
    FaHome,
    FaBook,
    FaList,
    FaBan,
    FaQuoteLeft,
    FaBullseye,
    FaChartBar,
} from "react-icons/fa"

import "./Sidebar.css"

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    return(
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <h2 className="sidebar-title">
                    📚
                    <span>BookTracker</span>
                </h2>
            </div>

            <button
                type="button"
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={
                    collapsed
                        ? "Expand sidebar"
                        : "Collapse sidebar"
                }
            >
                {collapsed ? "›" : "‹"}
            </button>

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

                <NavLink to="/quotes" className="sidebar-link">
                   <FaQuoteLeft />
                   <span>Quotes</span>
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