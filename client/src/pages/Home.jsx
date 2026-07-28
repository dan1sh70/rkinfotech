import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Code2, GraduationCap, FileText, Users, Headphones, Star, ChevronRight, Activity, TrendingUp, CheckCircle } from 'lucide-react';
import './Home.css';

/* Intersection Observer hook for scroll-triggered animations */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const RevealSection = ({ children, className = '', delay = 0 }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-block ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* SVG Logos for Trusted By */
const BrandLogo = ({ name }) => {
  // We use highly stylized typographic SVGs to simulate real logos for a premium feel
  return (
    <div className="brand-svg-logo">
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontFamily="'IBM Plex Sans', sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.02em">{name}</text>
      </svg>
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="home">

      {/* ═══════ HERO (PHOTOGRAPHY REDESIGN) ═══════ */}
      <section className="hero-v4">
        {/* Fading Image Slider */}
        <div className="hero-slider">
          {heroImages.map((src, idx) => (
            <div 
              key={idx} 
              className={`hero-slide ${idx === currentSlide ? 'hero-slide--active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="hero-slider__overlay" />
        </div>
        
        {/* Decorative Grid & Vignette */}
        <div className="hero-grid" />
        <div className="hero-vignette" />

        {/* Floating Glassmorphic UI Elements (Background layer) */}
        <div className="glass-ui glass-ui--left animate-float-slow">
          <div className="glass-card">
            <div className="glass-card__header">
              <Activity size={16} color="var(--coral)" />
              <span className="mono">ATS MATCH</span>
            </div>
            <div className="glass-card__value mono text-coral">98.5%</div>
            <div className="glass-card__graph">
              <div className="glass-bar" style={{height:'40%'}}/>
              <div className="glass-bar" style={{height:'60%'}}/>
              <div className="glass-bar" style={{height:'85%'}}/>
              <div className="glass-bar" style={{height:'100%', background:'var(--coral)'}}/>
            </div>
          </div>
        </div>

        <div className="glass-ui glass-ui--right animate-float-delayed">
          <div className="glass-card">
            <div className="glass-card__header">
              <TrendingUp size={16} color="var(--gold)" />
              <span className="mono">PLACEMENT</span>
            </div>
            <div className="glass-card__value mono text-gold">42 Days</div>
            <div className="glass-card__status">
              <CheckCircle size={14} color="var(--cyan)" />
              <span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>Offer Accepted</span>
            </div>
          </div>
        </div>

        <div className="container hero-v4__inner">
          <div className="hero-v4__content text-center">
            
            <div className="hero-badge animate-fade-up delay-1">
              <div className="hero-badge__glow" />
              <span className="badge-dot" />
              <span className="mono">E-VERIFIED &middot; US-BASED &middot; NATIONWIDE</span>
            </div>

            <h1 className="hero-v4__title animate-scale delay-2">
              Accelerate Your <br/>
              <span className="gradient-text-v4">Tech Career.</span>
            </h1>

            <p className="hero-v4__desc animate-fade-up delay-3">
              We engineer career breakthroughs. From ATS-optimized resumes to guaranteed placements, 
              RK Infotech connects top-tier talent with industry-leading enterprises.
            </p>

            <div className="hero-v4__actions animate-fade-up delay-4">
              <Link to="/pricing" className="btn-v4 btn-v4--primary">
                View Placement Plans
                <div className="btn-v4__shimmer" />
              </Link>
              <Link to="/services" className="btn-v4 btn-v4--outline">
                Explore Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TRUST LOGOS (REVAMPED MARQUEE) ═══════ */}
      <section className="logos-v4">
        <div className="container">
          <p className="logos-v4__label mono text-center">TRUSTED BY ENGINEERING TEAMS AT</p>
        </div>
        <div className="logos-v4__glass-container">
          <div className="logos-v4__track">
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <BrandLogo name="Walmart" />
                <BrandLogo name="McKesson" />
                <BrandLogo name="Amazon" />
                <BrandLogo name="Visa" />
                <BrandLogo name="MasterCard" />
                <BrandLogo name="Deloitte" />
                <BrandLogo name="Accenture" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="services section-padding" style={{background: 'var(--bg-surface)'}}>
        <div className="container">
          <RevealSection className="text-center">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Services Built for <span className="text-coral">Results</span></h2>
            <p className="section-subtitle">End-to-end IT talent solutions — from career guidance to enterprise staffing.</p>
          </RevealSection>

          <div className="services__grid">
            {[
              { icon: <GraduationCap size={26} />, title: 'Career Advisory', desc: 'One-on-one coaching with senior advisors who map your skills to the right opportunities.', accent: '--coral', bg: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80' },
              { icon: <FileText size={26} />, title: 'Resume Optimization', desc: 'ATS-tuned resumes that get past filters and land on hiring managers\' desks.', accent: '--gold', bg: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80' },
              { icon: <Code2 size={26} />, title: 'Technical Training', desc: 'Targeted upskilling in cloud, DevOps, data engineering, and modern frameworks.', accent: '--cyan', bg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80' },
              { icon: <Users size={26} />, title: 'Profile Marketing', desc: 'Strategic distribution of your profile to our network of 500+ hiring partners.', accent: '--violet', bg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80' },
              { icon: <Briefcase size={26} />, title: 'IT Staffing', desc: 'Pre-vetted senior engineers for contract, direct hire, or staff augmentation.', accent: '--coral', bg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80' },
              { icon: <Headphones size={26} />, title: 'Job Support', desc: 'Ongoing mentorship and real-time support during your first critical months on the job.', accent: '--gold', bg: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80' },
            ].map((s, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="svc-card card bg-card" style={{ backgroundImage: `url(${s.bg})` }}>
                  <div className="card-overlay" />
                  <div className="svc-card__icon" style={{background: `var(${s.accent}-glow)`, color: `var(${s.accent})`}}>
                    {s.icon}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/services" className="svc-card__link">Learn more <ChevronRight size={14} /></Link>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT / WHY US ═══════ */}
      <section className="about section-padding">
        <div className="container about__grid">
          <RevealSection className="animate-slide-left">
            <div className="about__content">
              <span className="section-tag">About RK Infotech</span>
              <h2 className="section-title">
                We Believe Great Futures<br />
                <span className="text-gold">Aren't Given —</span><br />
                They're Built.
              </h2>
              <p className="about__text">
                Founded in 2018, RK Infotech quickly grew into a trusted partner for both startups and 
                enterprise clients across the United States. From Silicon Valley to NYC, we expanded 
                into IT staffing and recruitment, combining our deep technical expertise with a people-first approach.
              </p>

              <div className="about__metrics">
                <div className="metric">
                  <span className="metric__value mono text-coral">6+</span>
                  <span className="metric__label">Years in Business</span>
                </div>
                <div className="metric">
                  <span className="metric__value mono text-gold">500+</span>
                  <span className="metric__label">Hiring Partners</span>
                </div>
                <div className="metric">
                  <span className="metric__value mono text-cyan">24/7</span>
                  <span className="metric__label">Candidate Support</span>
                </div>
              </div>

              <Link to="/contact" className="btn btn-outline" style={{marginTop:'2rem'}}>
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </RevealSection>

          <RevealSection className="animate-slide-right">
            <div className="about__visual">
              <div className="about__visual-inner">
                {/* Animated floating elements */}
                <div className="float-shape float-shape--1" />
                <div className="float-shape float-shape--2" />
                <div className="float-shape float-shape--3" />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="testimonials section-padding" style={{background: 'var(--bg-surface)'}}>
        <div className="container">
          <RevealSection className="text-center">
            <span className="section-tag">Client Testimonials</span>
            <h2 className="section-title">Client Voices, <span className="text-coral">Real Results</span></h2>
          </RevealSection>

          <div className="test__grid">
            {[
              { name: 'Balaji', role: 'Business Analyst — San Francisco, CA', text: '"RK Infotech didn\'t just help me get a job — they helped me build my career. From refining my resume to providing targeted technical training, their team ensured I was market-ready. Highly professional and result-oriented!"', initial: 'B', bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
              { name: 'Lakshmi', role: 'Software Engineer — New York', text: '"I\'m truly impressed with RK Infotech\'s approach. They took the time to understand my background and helped me rebuild my resume. Thanks to their guidance, I\'ve found a fantastic full-time opportunity."', initial: 'L', bg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
            ].map((t, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div className="test-card card bg-card" style={{ backgroundImage: `url(${t.bg})` }}>
                  <div className="card-overlay" />
                  <div className="test-card__stars">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--gold)" color="var(--gold)" />)}
                  </div>
                  <p className="test-card__text">{t.text}</p>
                  <div className="test-card__author">
                    <div className="test-card__avatar">{t.initial}</div>
                    <div>
                      <h4>{t.name}</h4>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="cta-section section-padding">
        <div className="container">
          <RevealSection>
            <div className="cta-box">
              <div className="cta-box__glow" />
              <h2 className="section-title">Ready to Start Your <span className="gradient-text">Journey?</span></h2>
              <p className="section-subtitle" style={{margin:'0 auto 2rem'}}>
                Whether you're looking for your dream role or building your dream team, we're ready to partner.
              </p>
              <div className="cta-box__actions">
                <Link to="/pricing" className="btn btn-gold">Explore Pricing <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn btn-outline">Talk to an Advisor</Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

    </div>
  );
};

export default Home;
