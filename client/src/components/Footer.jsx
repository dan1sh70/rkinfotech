import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div style={{display:'flex', alignItems:'center', marginBottom:'1.25rem'}}>
            <img src="/RKL-LOGO-2.png" alt="RK Infotech" style={{ height: '55px', objectFit: 'contain', marginLeft: '-10px' }} />
          </div>
          <p>Shaping careers, building futures, and connecting top-tier talent with leading enterprises across the United States since 2018.</p>
          <div className="footer__contact">
            <span className="mono" style={{color:'var(--text-primary)', fontSize:'0.85rem'}}>info@rkinfotechllc.com</span>
            <span className="mono" style={{color:'var(--text-primary)', fontSize:'0.85rem'}}>(321) 788-9008</span>
          </div>
          <div style={{marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <MapPin size={16} color="var(--text-dim)" />
            <span style={{fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500}}>Headquartered in the USA</span>
          </div>
        </div>

        <div className="footer__col">
          <h4>For Candidates</h4>
          <Link to="/services">Career Advisory</Link>
          <Link to="/services">Resume Optimization</Link>
          <Link to="/pricing">Pricing Packages</Link>
          <Link to="/refer-earn">Refer & Earn</Link>
        </div>

        <div className="footer__col">
          <h4>For Employers</h4>
          <Link to="/services">IT Staffing</Link>
          <Link to="/services">Software Development</Link>
          <Link to="/contact">Request Talent</Link>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} RK Infotech LLC. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
