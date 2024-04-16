import "./App.css";
import HomePage from "./HomePage/HomePage";
import OfficeDetails from "./components/OfficeDetails/OfficeDetails";
import TopNav from "./components/navbar/TopNav";
import TopNavbar from "./components/navbar/TopNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <TopNav />
      <TopNavbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/office/:id" element={<OfficeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
