import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './bootstrap.css'
import "./font.css"
// import './custombootstrap.css';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
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
