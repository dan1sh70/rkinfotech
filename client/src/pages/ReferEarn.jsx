import React, { useState } from 'react';
import { Gift, Share2, DollarSign, ArrowRight, Copy, Check } from 'lucide-react';
import './ReferEarn.css';

const ReferEarn = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      setReferralLink(`https://rkinfotechllc.com/contact?ref=${code}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="refer animate-fade-up">
      <section className="refer__hero">
        <div className="container text-center">
          <span className="section-tag">Affiliate Program</span>
          <h1 className="section-title">
            Refer Top Talent.<br />
            <span className="text-gold">Earn Up to <span className="mono">$750</span>.</span>
          </h1>
          <p className="section-subtitle">
            Help your network advance their careers and earn premium commissions for every successful placement.
          </p>
        </div>
      </section>

      <section className="refer__body">
        <div className="container refer__grid">
          
          <div className="refer__steps">
            <h3 className="refer__steps-title">How It Works</h3>
            {[
              { icon: <Share2 size={20} />, title: 'Get Your Unique Link', desc: 'Register below to generate your personal tracking link in seconds.' },
              { icon: <Gift size={20} />, title: 'Share With Your Network', desc: 'Send it to IT professionals who are actively seeking career growth or job placement.' },
              { icon: <DollarSign size={20} />, title: 'Earn Your Commission', desc: 'Receive your payout when your referral enrolls and gets successfully placed.' },
            ].map((step, i) => (
              <div key={i} className="refer-step card">
                <div className="refer-step__icon">{step.icon}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="refer__form-wrapper card">
            <h3>Generate Your Link</h3>
            <p className="refer__form-subtitle">Join the affiliate program in seconds.</p>

            {!referralLink ? (
              <form onSubmit={handleGenerate}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="jane@example.com" />
                </div>
                <button type="submit" className="btn btn-gold full-width">
                  Generate Link <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="refer__result animate-fade-in">
                <div className="refer__success-icon">✓</div>
                <h4>Your link is ready!</h4>
                <div className="refer__link-box">
                  <code className="mono">{referralLink}</code>
                </div>
                <button className="btn btn-primary full-width" onClick={handleCopy}>
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy to Clipboard</>}
                </button>
                <button className="btn btn-outline full-width" style={{marginTop: '0.75rem'}} onClick={() => { setReferralLink(''); setFormData({name:'', email:''}); }}>
                  Generate Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferEarn;
