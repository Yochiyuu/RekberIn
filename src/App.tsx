import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { BuyToken } from "./pages/BuyToken";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { RekberApp } from "./pages/RekberApp";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 font-sans">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<RekberApp />} />
          <Route path="/history" element={<History />} />
          <Route path="/buy" element={<BuyToken />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
