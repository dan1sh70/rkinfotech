import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const location = useLocation();
  const [intent, setIntent] = useState('candidate');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', message: '' });

  useEffect(() => {
    const plan = new URLSearchParams(location.search).get('plan');
    if (plan) { setIntent('candidate'); setFormData(prev => ({ ...prev, interest: `${plan} Plan` })); }
  }, [location]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We'll be in touch within 24 hours.`);
  };

  return (
    <div className="contact animate-fade-up">
      <section className="contact__hero">
        <div className="container text-center">
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title">Let's Start the <span className="gradient-text">Conversation.</span></h1>
          <p className="section-subtitle">Whether you're advancing your career or scaling your team, we're here to help.</p>
        </div>
      </section>

      <section className="contact__body">
        <div className="container contact__grid">
          <div className="contact__sidebar">
            <div className="info-block card">
              <h4>Direct Inquiries</h4>
              <p className="mono" style={{color:'var(--text-primary)', fontSize:'0.88rem'}}>info@rkinfotechllc.com</p>
              <p className="mono" style={{color:'var(--text-primary)', fontSize:'0.88rem'}}>+1 321 788 9008</p>
            </div>
            <div className="info-block card">
              <h4>US Headquarters</h4>
              <p>Winter Garden, FL</p>
            </div>
            <div className="info-block card">
              <h4>India Operations</h4>
              <p>Greater Noida, India</p>
            </div>
          </div>

          <div className="contact__form card">
            <div className="intent-switch">
              <button className={`intent-btn ${intent === 'candidate' ? 'intent-btn--on' : ''}`} onClick={() => setIntent('candidate')}>
                I'm a Job Seeker
              </button>
              <button className={`intent-btn ${intent === 'employer' ? 'intent-btn--on' : ''}`} onClick={() => setIntent('employer')}>
                I'm Hiring Talent
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="form-group">
                <label>{intent === 'candidate' ? 'Plan / Service of Interest' : 'Staffing Requirements'}</label>
                <input type="text" name="interest" value={formData.interest} onChange={handleChange} placeholder={intent === 'candidate' ? 'e.g., Professional Plan' : 'e.g., Senior React Developer'} />
              </div>
              {intent === 'candidate' && (
                <div className="form-group">
                  <label>Resume (Optional)</label>
                  <input type="file" className="file-input" />
                </div>
              )}
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about your goals..." />
              </div>
              <button type="submit" className="btn btn-primary full-width"><Send size={16} /> Send Inquiry</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
