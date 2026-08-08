import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './Pricing.css';

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

const plans = [
  {
    name: 'Starter', price: 'Custom', desc: 'For candidates new to the US market looking for foundational support.',
    features: ['Resume optimization', 'LinkedIn refresh', 'Career roadmap session', 'Email support'],
    cta: 'Get Started', featured: false,
  },
  {
    name: 'Growth', price: 'Custom', desc: 'Our most popular plan with end-to-end placement support and guaranteed results.',
    features: ['Everything in Starter', 'Technical training program', 'Active profile marketing', '500+ partner outreach', 'Mock interview coaching', 'Placement guarantee'],
    cta: 'Most Popular', featured: true,
  },
  {
    name: 'Enterprise', price: 'Custom', desc: 'For teams and companies seeking top-tier IT staffing and talent solutions.',
    features: ['Dedicated account manager', 'Bulk candidate pipeline', 'Background verification', 'On-demand staffing', 'Contract & direct hire', 'Priority 24/7 support'],
    cta: 'Contact Sales', featured: false,
  },
];

const Pricing = () => {
  useReveal();
  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <div className="container">
          <span className="section-eyebrow animate-fade-up delay-1">Pricing</span>
          <h1 className="section-title animate-fade-up delay-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
            Transparent, Flexible Plans
          </h1>
          <p className="section-desc animate-fade-up delay-3" style={{ margin: '1.25rem auto 0' }}>
            No hidden fees. Every plan is tailored to your unique career goals and timeline.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={i} className={`pricing-card reveal reveal-delay-${i + 1} ${plan.featured ? 'pricing-card--featured' : ''}`}>
              {plan.featured && <span className="pricing-badge">Most Popular</span>}
              <h3 style={{ fontSize: '1.5rem' }}>{plan.name}</h3>
              <p style={{ fontSize: '0.88rem', marginTop: '0.5rem', marginBottom: '1.5rem', opacity: 0.7 }}>{plan.desc}</p>
              <div className="pricing-price">{plan.price}</div>
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <CheckCircle size={15} color={plan.featured ? '#4ade80' : 'var(--green)'} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`btn ${plan.featured ? 'btn-accent' : 'btn-primary'}`} style={{ width: '100%', marginTop: 'auto' }}>
                {plan.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
          All prices are customized based on your specific needs. <Link to="/contact" style={{ color: 'var(--accent)', fontWeight: 600 }}>Talk to us</Link> for a personalized quote.
        </p>
      </div>
    </div>
  );
};

export default Pricing;