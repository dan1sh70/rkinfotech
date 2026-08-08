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

/* Theme Context */
export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rk-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rk-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
    </ThemeContext.Provider>
  );
}

export default App;
