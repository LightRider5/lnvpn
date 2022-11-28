import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faq from './pages/Faq';
import Home from './pages/Home'
import Header from './components/Header'
import Dashboard from "./pages/Dashboard";
import SMS from "./pages/SMS"


function App() {
  
  return (
    <>
    
      <Router>
        <Header
        />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sms' element={<SMS />} />
        </Routes>
    </Router>
    </>
    
  );
  
}


export default App;


