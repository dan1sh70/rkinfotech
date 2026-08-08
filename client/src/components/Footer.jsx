import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/RKL-LOGO-2.png" alt="RK Infotech" style={{ height: '40px', objectFit: 'contain' }} />
          <p style={{ marginTop: '1rem', fontSize: '0.88rem', maxWidth: '260px', lineHeight: 1.65 }}>
            Nationwide IT career coaching, staffing & placement. E-Verified and US-based.
          </p>
          <div className="footer__contact">
            <a href="tel:+16159637424" className="footer__contact-item">
              <Phone size={14} /> +1 (615) 963-7424
            </a>
            <a href="mailto:contact@rkinfotech.com" className="footer__contact-item">
              <Mail size={14} /> contact@rkinfotech.com
            </a>
            <div className="footer__contact-item">
              <MapPin size={14} /> Nashville, TN · US Nationwide
            </div>
          </div>
        </div>

        <div className="footer__links-group">
          <h6 className="footer__group-title">Services</h6>
          <Link to="/services" className="footer__link">Career Advisory</Link>
          <Link to="/services" className="footer__link">Resume Optimization</Link>
          <Link to="/services" className="footer__link">Technical Training</Link>
          <Link to="/services" className="footer__link">IT Staffing</Link>
          <Link to="/services" className="footer__link">Job Support</Link>
        </div>

        <div className="footer__links-group">
          <h6 className="footer__group-title">Company</h6>
          <Link to="/pricing"    className="footer__link">Pricing</Link>
          <Link to="/faq"        className="footer__link">FAQ</Link>
          <Link to="/refer-earn" className="footer__link">Refer & Earn</Link>
          <Link to="/contact"    className="footer__link">Contact</Link>
        </div>

        <div className="footer__cta-col">
          <h6 className="footer__group-title">Get Started</h6>
          <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Take the first step toward your next big opportunity.
          </p>
          <Link to="/contact" className="btn btn-primary footer__cta-btn">
            Talk to an Advisor <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} RK Infotech LLC. All rights reserved.</span>
          <div className="footer__legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;