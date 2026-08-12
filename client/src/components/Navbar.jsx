import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { to: '/',           label: 'Home' },
    { to: '/services',   label: 'Services' },
    { to: '/pricing',    label: 'Pricing' },
    { to: '/refer-earn', label: 'Refer & Earn' },
    { to: '/faq',        label: 'FAQ' },
  ];

  return (
    <div className={`navbar-wrapper ${scrolled ? 'navbar-wrapper--scrolled' : ''}`}>
      <header className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand">
            <img src="/RKL-LOGO-2.png" alt="RK Infotech" style={{ height: '32px', objectFit: 'contain' }} />
          </Link>

          <nav className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="navbar__actions">
            <Link to="/contact" className="navbar__cta">
              Book a Demo
            </Link>
            <button
              className="navbar__burger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;