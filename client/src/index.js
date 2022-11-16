import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './bootstrap/css/bootstrap.min.css'
import "./font.css"
import './custombootstrap.css';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faq from './pages/Faq';
import Guide from './components/Guide';
import { HelmetProvider } from 'react-helmet-async';


import "./fonts/Poppins-Regular.otf";
import "./fonts/Poppins-Light.otf";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App/>
    </HelmetProvider>
  </StrictMode>
);

reportWebVitals();
