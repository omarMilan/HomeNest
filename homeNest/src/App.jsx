import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookPage from "./pages/bookPage";
import SchedulePage from "./pages/schedulePage";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen fixed top-0 left-0">
        <Header />
        <Routes>
          <Route path="/" element={<SchedulePage />} />
          <Route path="/Book" element={<BookPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
