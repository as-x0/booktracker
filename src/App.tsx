// import { BrowserRouter, Routes, Route } from "react-router-dom"
//
// import AppLayout from "./layouts/AppLayout"
//
// import Home from "./pages/Home"
// import Books from "./pages/Books"
// import TBR from "./pages/TBR"
// import DNF from "./pages/DNF"
// import Goals from "./pages/Goals"
// import Statistics from "./pages/Statistics"
import ReadingForm from "./forms/ReadingForm/ReadingForm.tsx";

function App() {
    return (
        // <BrowserRouter>
        //     <Routes>
        //         <Route element={<AppLayout />}>
        //             <Route path="/" element={<Home />} />
        //             <Route path="/books" element={<Books />} />
        //             <Route path="/tbr" element={<TBR />} />
        //             <Route path="/dnf" element={<DNF />} />
        //             <Route path="/goals" element={<Goals />} />
        //             <Route path="/statistics" element={<Statistics />} />
        //         </Route>
        //     </Routes>
        // </BrowserRouter>

        <ReadingForm />
    );
}

export default App