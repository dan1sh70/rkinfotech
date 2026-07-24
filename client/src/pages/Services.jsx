import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, Code2, Users, Briefcase, Headphones, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Services.css';

const services = [
  {
    id: 'advisory',
    icon: <GraduationCap size={28} />,
    title: 'Career Advisory',
    subtitle: 'Strategic roadmapping for tech professionals',
    accent: '--coral',
    gridArea: 'advisory',
    bullets: [
      '1-on-1 coaching with senior industry veterans',
      'Gap analysis between current skills and target roles',
      'Personalized learning paths for rapid upskilling',
      'Salary negotiation tactics and market intelligence'
    ],
    cta: 'Book Advisory Session'
  },
  {
    id: 'resume',
    icon: <FileText size={28} />,
    title: 'Resume Optimization',
    subtitle: 'Bypass the ATS and land interviews',
    accent: '--gold',
    gridArea: 'resume',
    bullets: [
      'Keyword optimization for enterprise ATS systems',
      'Quantifiable achievement highlighting',
      'LinkedIn profile overhaul & SEO tuning',
      'Cover letter templates tailored by industry'
    ],
    cta: 'Upgrade My Resume'
  },
  {
    id: 'training',
    icon: <Code2 size={28} />,
    title: 'Technical Training',
    subtitle: 'Enterprise-grade upskilling programs',
    accent: '--cyan',
    gridArea: 'training',
    bullets: [
      'Cloud Architecture (AWS, Azure, GCP)',
      'Modern Full-Stack (React, Node.js, Python)',
      'Data Engineering & Snowflake Migration',
      'DevOps, CI/CD, and Kubernetes orchestration'
    ],
    cta: 'Explore Curriculum'
  },
  {
    id: 'marketing',
    icon: <Users size={28} />,
    title: 'Profile Marketing',
    subtitle: 'Direct access to hiring managers',
    accent: '--violet',
    gridArea: 'marketing',
    bullets: [
      'Active distribution to 500+ hiring partners',
      'Priority consideration for exclusive roles',
      'Vendor management system (VMS) submission',
      'Pre-interview briefing and insight'
    ],
    cta: 'Market My Profile'
  },
  {
    id: 'staffing',
    icon: <Briefcase size={28} />,
    title: 'IT Staffing & Consulting',
    subtitle: 'Elite engineering talent for your enterprise',
    accent: '--coral',
    gridArea: 'staffing',
    bullets: [
      'Contract, Contract-to-Hire, and Direct Placement',
      'Pre-vetted senior engineers and architects',
      'Rapid deployment within 48-72 hours',
      'Payroll, compliance, and onboarding managed'
    ],
    cta: 'Request Talent'
  },
  {
    id: 'support',
    icon: <Headphones size={28} />,
    title: 'On-Job Support',
    subtitle: 'Mentorship during your critical first months',
    accent: '--gold',
    gridArea: 'support',
    bullets: [
      'Real-time Slack/Teams support for blockers',
      'Code review assistance and best practices',
      'Architecture design validation',
      'Performance review preparation'
    ],
    cta: 'Get Supported'
  }
];

const Services = () => {
  return (
    <div className="services-page animate-fade-up">
      <section className="services-hero">
        <div className="container text-center">
          <span className="section-tag">Our Expertise</span>
          <h1 className="section-title">
            Engineering <span className="gradient-text">Success.</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
            We provide a comprehensive ecosystem for IT professionals to accelerate their careers, 
            and for enterprises to scale their engineering capacity instantly.
          </p>
        </div>
      </section>

      <section className="bento-section">
        <div className="container">
          <div className="bento-grid">
            {services.map((svc) => (
              <div key={svc.id} className={`bento-card card bento-card--${svc.id}`} style={{ '--card-accent': `var(${svc.accent})` }}>
                <div className="bento-card__header">
                  <div className="bento-icon" style={{ color: `var(${svc.accent})`, background: `var(${svc.accent}-glow)` }}>
                    {svc.icon}
                  </div>
                  <div className="bento-title-group">
                    <h3>{svc.title}</h3>
                    <p className="mono">{svc.subtitle}</p>
                  </div>
                </div>

                <ul className="bento-bullets">
                  {svc.bullets.map((bullet, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="bullet-check" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/contact?service=${encodeURIComponent(svc.title)}`} className="bento-cta btn-outline">
                  {svc.cta} <ArrowRight size={14} />
                </Link>
                
                {/* Decorative background glow */}
                <div className="bento-card__glow" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="services-cta section-padding" style={{background: 'var(--bg-root)'}}>
        <div className="container text-center">
           <h2 className="section-title">Not sure where to <span className="text-coral">start?</span></h2>
           <p className="section-subtitle" style={{margin:'0 auto 2rem'}}>
             Book a free 15-minute consultation. We'll assess your goals and recommend the perfect path forward.
           </p>
           <Link to="/contact" className="btn btn-primary">Book Free Consultation</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
