import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Faq from './pages/Faq';
import Home from './pages/Home'
import Header from './components/Header'
import Axios from 'axios';
import Dashboard from "./pages/Dashboard";


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
        </Routes>
    </Router>
    </>
    
  );
  
}


export default App;


