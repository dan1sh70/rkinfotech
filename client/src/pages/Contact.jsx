import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import './Contact.css';

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const Contact = () => {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="section-eyebrow animate-fade-up delay-1">Contact Us</span>
          <h1 className="section-title animate-fade-up delay-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
            Let us Talk About Your Career
          </h1>
          <p className="section-desc animate-fade-up delay-3" style={{ margin: '1.25rem auto 0' }}>
            Reach out and one of our advisors will get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          <div className="reveal-left">
            <h3 style={{ marginBottom: '2rem' }}>Get in Touch</h3>

            {[
              { icon: <Phone size={18} />, label: 'Phone', val: '+1 (615) 963-7424', href: 'tel:+16159637424' },
              { icon: <Mail size={18} />, label: 'Email', val: 'contact@rkinfotech.com', href: 'mailto:contact@rkinfotech.com' },
              { icon: <MapPin size={18} />, label: 'Location', val: 'Nashville, TN · US Nationwide', href: null },
            ].map((item, i) => (
              <div key={i} className="contact-info__item">
                <div className="contact-info__icon">{item.icon}</div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.val}</a>
                    : <span style={{ fontWeight: 500 }}>{item.val}</span>
                  }
                </div>
              </div>
            ))}

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--accent-soft)', borderRadius: 'var(--r-lg)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Response Time</div>
              <div style={{ fontWeight: 600 }}>Within 24 hours</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>Monday – Saturday, 9am – 7pm CST</div>
            </div>
          </div>

          <div className="contact-form-card reveal reveal-delay-2">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <h4>Message Sent!</h4>
                <p style={{ marginTop: '0.5rem' }}>We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h4 style={{ marginBottom: '1.75rem' }}>Send Us a Message</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="John Smith" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="john@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Service Interested In</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                      <option value="">Select a service</option>
                      <option>Career Advisory</option>
                      <option>Resume Optimization</option>
                      <option>Technical Training</option>
                      <option>IT Staffing</option>
                      <option>Placement Package</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows="5" placeholder="Tell us about your goals..." required value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;