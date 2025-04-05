import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import CardsPage from "./pages/cards/CardsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
