import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Header from "./components/Header";
import SMS from "./pages/SMS";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/phone-numbers" element={<SMS />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
