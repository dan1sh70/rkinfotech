import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, GraduationCap, FileText, Code2, Users, Briefcase, Headphones, Zap } from 'lucide-react';
import './Services.css';

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

const services = [
  {
    icon: <GraduationCap size={22} />, color: 'var(--accent)', bg: 'var(--accent-soft)',
    title: 'Career Advisory', desc: 'One-on-one career coaching with seasoned industry advisors who help you navigate the US IT job market.',
    features: ['Career roadmap planning', 'Role targeting strategy', 'Industry insights', 'Salary negotiation']
  },
  {
    icon: <FileText size={22} />, color: 'var(--green)', bg: 'var(--green-soft)',
    title: 'Resume Optimization', desc: 'ATS-tuned, keyword-optimized resumes that pass automated filters and make an impact on hiring managers.',
    features: ['ATS keyword mapping', 'Achievement-led writing', 'LinkedIn alignment', 'Multiple format versions']
  },
  {
    icon: <Code2 size={22} />, color: 'var(--violet)', bg: 'var(--violet-soft)',
    title: 'Technical Training', desc: 'Targeted upskilling programs in high-demand areas like cloud, DevOps, data engineering, and modern frameworks.',
    features: ['Hands-on labs', 'Project-based learning', 'Certification prep', 'Live instructor sessions']
  },
  {
    icon: <Users size={22} />, color: 'var(--amber)', bg: 'var(--amber-soft)',
    title: 'Profile Marketing', desc: 'Strategic multi-channel distribution of your professional profile to our network of 500+ verified hiring partners.',
    features: ['500+ partner network', 'Active market outreach', 'Interview scheduling', 'Pipeline management']
  },
  {
    icon: <Briefcase size={22} />, color: 'var(--rose)', bg: 'var(--rose-soft)',
    title: 'IT Staffing', desc: 'Pre-vetted, senior IT talent delivered fast for contract, direct hire, or staff augmentation engagements.',
    features: ['48-hour candidate delivery', 'Background verified', 'Technical screening', 'Flexible engagement models']
  },
  {
    icon: <Headphones size={22} />, color: 'var(--accent)', bg: 'var(--accent-soft)',
    title: 'Ongoing Job Support', desc: 'Continuous mentorship and guidance during your job search and your first critical months on the job.',
    features: ['Mock interviews', 'Real-time guidance', 'Performance coaching', '90-day onboarding support']
  },
];

const Services = () => {
  useReveal();
  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <span className="section-eyebrow animate-fade-up delay-1">Our Services</span>
          <h1 className="section-title animate-fade-up delay-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
            Everything You Need to<br />Land Your Dream Role
          </h1>
          <p className="section-desc animate-fade-up delay-3" style={{ margin: '1.25rem auto 0' }}>
            From career advisory to placement guarantee — our end-to-end platform covers every step of your career journey.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-detail-card reveal reveal-delay-${Math.min(i % 3 + 1, 4)}`}>
              <div className="service-detail-card__icon" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <ul className="service-detail-card__features">
                {s.features.map((f, j) => (
                  <li key={j}><CheckCircle size={14} color={s.color} />{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cta-box reveal" style={{ marginTop: '5rem' }}>
          <div className="cta-box__glow" />
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>Ready to Get Started?</h2>
          <p>Tell us about your goals and we will match you with the perfect program.</p>
          <div className="cta-box__actions">
            <Link to="/pricing" className="btn" style={{ background: 'var(--bg-root)', color: 'var(--bg-invert)' }}>
              View Pricing <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text-invert)' }}>
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;