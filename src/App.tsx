import { BrowserRouter, Routes, Route } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"

import Home from "./pages/Home"
import Books from "./pages/Books"
import TBR from "./pages/TBR"
import DNF from "./pages/DNF"
import Goals from "./pages/Goals"
import Statistics from "./pages/Statistics"
import ReadingDetails from "./pages/ReadingDetails";
import WishlistDetails from "./pages/WishlistDetails.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/tbr" element={<TBR />} />
                    <Route path="/dnf" element={<DNF />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/readings/:id" element={<ReadingDetails />}/>
                    <Route path="/tbr/:id" element={<WishlistDetails />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App