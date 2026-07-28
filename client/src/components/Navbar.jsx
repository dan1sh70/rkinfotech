import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <img src="/RKL-LOGO-2.png" alt="RK Infotech" style={{ height: '45px', objectFit: 'contain' }} />
        </Link>

        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>

          <div className="nav-dropdown">
            <button className="nav-link nav-link--trigger">
              Services <ChevronDown size={14} />
            </button>
            <div className="nav-dropdown__menu">
              <Link to="/services" className="dd-item">Career Advisory</Link>
              <Link to="/services" className="dd-item">Resume Optimization</Link>
              <Link to="/services" className="dd-item">Technical Training</Link>
              <div className="dd-sep" />
              <Link to="/services" className="dd-item">IT Staffing</Link>
              <Link to="/services" className="dd-item">Software Development</Link>
            </div>
          </div>

          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/refer-earn" className="nav-link">Refer & Earn</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>

          <div className="navbar__cta">
            <Link to="/contact" className="btn btn-primary nav-btn">Get in Touch</Link>
          </div>
        </div>

        <button className="navbar__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
