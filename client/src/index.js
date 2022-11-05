import React from 'react';
import ReactDOM from 'react-dom';
// import './bootstrap/css/bootstrap.min.css'
import "./font.css"
import './custombootstrap.css';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header'; 
import Faq from './pages/Faq';
import Guide from './components/Guide';
import { HelmetProvider } from 'react-helmet-async';


import "./fonts/Poppins-Regular.otf";
import "./fonts/Poppins-Light.otf";


ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/guide' element={<Guide/>} />
        <Route path='/faq' element={<Faq />} />
        {/* <Route path='/login' element={() => { 
            window.location.href = 'http://localhost:3001/login';
            return null;
        }}/> */}
      </Routes>
    </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
