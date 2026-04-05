import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SGPA } from "./pages/SGPA";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sgpa" element={<SGPA />} />
      </Routes>
    </Router>
  );
}

export default App;
