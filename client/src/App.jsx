import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import ReferEarn from './pages/ReferEarn';
import FAQ from './pages/FAQ';
import Services from './pages/Services';

import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/pricing"    element={<Pricing />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/refer-earn" element={<ReferEarn />} />
            <Route path="/faq"        element={<FAQ />} />
            <Route path="/services"   element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
