import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Briefcase, Code2, GraduationCap,
  FileText, Users, Headphones, Star, CheckCircle, Activity,
  TrendingUp, MapPin, Zap, Shield, Clock
} from 'lucide-react';
import './Home.css';

/* ─── Intersection Observer Reveal ─── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

/* ─── Interactive Particle Canvas ─── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const isDown = useRef(false);
  const clickWave = useRef({ active: false, radius: 0, x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();

    // Increase particle density slightly
    const COUNT = Math.min(Math.floor(W * H / 6000), 150);
    const CONN = 140;
    const MR = 200; // Mouse Interaction Radius

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .8, vy: (Math.random() - .5) * .8,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * .6 + .2,
        phase: Math.random() * Math.PI * 2,
        baseVx: (Math.random() - .5) * .8,
        baseVy: (Math.random() - .5) * .8,
      });
    }

    const tick = (t) => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x, my = mouse.current.y;
      
      // Update click wave
      let wave = clickWave.current;
      if (wave.active) {
        wave.radius += 15;
        if (wave.radius > Math.max(W, H)) wave.active = false;
      }

      for (const p of particles) {
        const dx = mx - p.x, dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        
        // Interaction: Repel from mouse + draw towards mouse on click
        if (d < MR) {
          const force = (1 - d / MR) * 0.15;
          if (isDown.current) {
            // Pull towards mouse when clicking
            p.vx += (dx / d) * force * 3;
            p.vy += (dy / d) * force * 3;
          } else {
            // Repel otherwise
            p.vx -= (dx / d) * force;
            p.vy -= (dy / d) * force;
          }
        }
        
        // Explode on click wave
        if (wave.active) {
          const wdx = wave.x - p.x;
          const wdy = wave.y - p.y;
          const wd = Math.sqrt(wdx * wdx + wdy * wdy);
          if (Math.abs(wd - wave.radius) < 30) {
            p.vx -= (wdx / wd) * 3;
            p.vy -= (wdy / wd) * 3;
          }
        }

        // Return to base velocity smoothly
        p.vx += (p.baseVx - p.vx) * 0.05;
        p.vy += (p.baseVy - p.vy) * 0.05;

        // Apply friction
        p.vx *= .98; p.vy *= .98;
        
        p.x += p.vx; p.y += p.vy;
        
        // Wrap edges smoothly
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;

        const pulse = Math.sin(t * .002 + p.phase) * .3 + .7;
        const glow = d < MR ? (1 - d / MR) * .8 : 0;
        const radius = p.r * pulse + (isDown.current && d < MR ? glow * 4 : glow * 1.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(var(--particle-rgb), ${p.a * pulse + glow * .5})`;
        ctx.fill();
        
        // Draw strong lines from mouse to nearby particles
        if (d < MR) {
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(var(--particle-rgb), ${(1 - d / MR) * 0.4})`;
          ctx.lineWidth = isDown.current ? 1.5 : 0.8;
          ctx.stroke();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) {
            const alpha = (1 - d / CONN) * .15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(var(--particle-rgb), ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const handleMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
      isDown.current = false;
    };
    const handleMouseDown = (e) => {
      isDown.current = true;
      const r = canvas.getBoundingClientRect();
      clickWave.current = { active: true, radius: 0, x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const handleMouseUp = () => {
      isDown.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, display: 'block', cursor: 'crosshair', pointerEvents: 'none' }}
    />
  );
};

/* ─── Home Page ─── */
const Home = () => {
  useReveal();

  return (
    <div className="home">

      {/* ═══ HERO ═══ */}
      <section className="hero">
        {/* Aurora & Particle Background */}
        <div className="hero__aurora-wrap">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__blob hero__blob--3" />
          <ParticleCanvas />
        </div>

        <div className="container hero__inner">
          {/* Left content */}
          <div className="hero__content">
            <div className="hero__eyebrow animate-fade-up delay-1">
              <span className="hero__dot" />
              <span className="mono">US-Based · E-Verified · Nationwide</span>
            </div>

            <h1 className="hero__title animate-fade-up delay-2">
              Accelerate Your<br />
              <span className="hero__title-gradient">Tech Career.</span>
            </h1>

            <p className="hero__desc animate-fade-up delay-3">
              RK Infotech engineers career breakthroughs. ATS-optimized resumes,
              expert training, and guaranteed placements with 500+ hiring partners.
            </p>

            <div className="hero__actions animate-fade-up delay-4">
              <Link to="/pricing" className="btn btn-primary hero__btn-main">
                View Plans <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-outline">
                Our Services
              </Link>
            </div>
          </div>

          {/* Right bento panel */}
          <div className="hero__panel animate-fade-up delay-3">
            <div className="hero__panel-inner">
              <div className="hero-stat-card hero-stat-card--main">
                <div className="hero-stat-card__top">
                  <Activity size={16} />
                  <span className="mono">ATS MATCH RATE</span>
                </div>
                <div className="hero-stat-card__value">98.5%</div>
                <div className="hero-stat-card__bar-track">
                  <div className="hero-stat-card__bar" style={{ '--w': '98.5%', '--c': 'var(--accent)' }} />
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="hero-stat-card__top">
                  <TrendingUp size={16} />
                  <span className="mono">AVG. PLACEMENT</span>
                </div>
                <div className="hero-stat-card__value">42 Days</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <CheckCircle size={13} color="var(--green)" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Offer Accepted</span>
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="hero-stat-card__top">
                  <Users size={16} />
                  <span className="mono">PARTNERS</span>
                </div>
                <div className="hero-stat-card__value">500+</div>
                <div className="hero-stat-card__sublabel">Nationwide Network</div>
              </div>

              <div className="hero-stat-card hero-stat-card--dark">
                <MapPin size={18} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>US-Based</div>
                <div style={{ fontSize: '0.78rem', opacity: .6, marginTop: '0.2rem' }}>From coast to coast</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll-hint">
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ═══ TRUSTED BY MARQUEE ═══ */}
      <div className="marquee-strip">
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="marquee-logo"><span className="mono">MarcoPolo</span><span style={{color: 'var(--accent)', fontWeight: 'bold'}}>Line</span></div>
                <div className="marquee-logo"><span className="mono">GLOBAL</span><span>Logistics</span></div>
                <div className="marquee-logo"><span className="mono">SCHMELZER</span><span style={{color: '#f59e0b', fontSize: '0.8em'}}>SPEDITION</span></div>
                <div className="marquee-logo"><Activity size={24} /> <span className="mono">TCI</span></div>
                <div className="marquee-logo"><MapPin size={24} /> <span className="mono">WAHL & CO</span></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SERVICES — BENTO ═══ */}
      <section className="section-padding">
        <div className="container">
          <div className="reveal text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-title">Everything You Need to<br />Land Your Dream Role</h2>
          </div>

          <div className="services-bento">
            {/* Large featured card */}
            <div className="svc-featured reveal">
              <div className="svc-featured__bg" />
              <div className="svc-featured__content">
                <span className="section-eyebrow" style={{ marginBottom: '1.5rem' }}>Most Popular</span>
                <h3>Complete Placement Package</h3>
                <p style={{ marginTop: '1rem', marginBottom: '2rem', maxWidth: '420px' }}>
                  End-to-end career engineering: resume, training, profile marketing, mock interviews, and placement guarantee.
                </p>
                <Link to="/pricing" className="btn btn-primary">
                  View Packages <ArrowRight size={16} />
                </Link>
              </div>
              <div className="svc-featured__stat">
                <span className="svc-featured__num">98%</span>
                <span className="svc-featured__lbl mono">Placement Rate</span>
              </div>
            </div>

            {[
              { icon: <GraduationCap size={22} />, title: 'Career Advisory', desc: 'One-on-one coaching with senior advisors who map your skills to the right roles.', color: 'var(--accent)' },
              { icon: <FileText size={22} />, title: 'Resume Optimization', desc: 'ATS-tuned resumes that pass filters and land on hiring manager desks.', color: 'var(--green)' },
              { icon: <Code2 size={22} />, title: 'Technical Training', desc: 'Targeted upskilling in cloud, DevOps, data engineering and modern frameworks.', color: 'var(--violet)' },
              { icon: <Users size={22} />, title: 'Profile Marketing', desc: 'Strategic distribution of your profile to our 500+ hiring partner network.', color: 'var(--amber)' },
              { icon: <Briefcase size={22} />, title: 'IT Staffing', desc: 'Pre-vetted senior engineers for contract, direct hire, or staff augmentation.', color: 'var(--rose)' },
              { icon: <Headphones size={22} />, title: 'Job Support', desc: 'Ongoing mentorship and real-time support during your first critical months.', color: 'var(--accent)' },
            ].map((s, i) => (
              <div key={i} className={`svc-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="svc-card__icon" style={{ color: s.color, background: `${s.color}18` }}>
                  {s.icon}
                </div>
                <h4 style={{ marginTop: '1.25rem', marginBottom: '0.6rem' }}>{s.title}</h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.65 }}>{s.desc}</p>
                <Link to="/services" className="svc-card__link">
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAND ═══ */}
      <div className="stats-band">
        <div className="container stats-band__grid">
          {[
            { value: '6+', label: 'Years in Business', accent: 'var(--accent)' },
            { value: '500+', label: 'Hiring Partners', accent: 'var(--green)' },
            { value: '98%', label: 'Placement Rate', accent: 'var(--violet)' },
            { value: '24/7', label: 'Candidate Support', accent: 'var(--amber)' },
          ].map((s, i) => (
            <div key={i} className="stats-band__item reveal">
              <div className="stats-band__value" style={{ color: s.accent }}>{s.value}</div>
              <div className="stats-band__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT — BENTO ═══ */}
      <section className="section-padding">
        <div className="container">
          <div className="about-bento">

            <div className="about-bento__main reveal-left">
              <span className="section-eyebrow">About RK Infotech</span>
              <h2 className="section-title" style={{ marginTop: '1rem' }}>
                We Build Careers,<br />
                <span style={{ color: 'var(--accent)' }}>Not Just Resumes.</span>
              </h2>
              <p style={{ marginTop: '1.25rem', marginBottom: '2rem' }}>
                Founded in 2018, RK Infotech grew from a small career advisory into a nationwide IT talent powerhouse. From Silicon Valley to NYC, we combine deep technical expertise with a people-first approach to connect exceptional talent with world-class companies.
              </p>
              <div className="about-bento__badges">
                <div className="about-badge"><Shield size={16} color="var(--accent)" /> E-Verified</div>
                <div className="about-badge"><MapPin size={16} color="var(--green)" /> US-Based</div>
                <div className="about-badge"><Zap size={16} color="var(--amber)" /> Fast Placement</div>
                <div className="about-badge"><Clock size={16} color="var(--violet)" /> 24/7 Support</div>
              </div>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="about-bento__cards">
              <div className="about-mini-card reveal reveal-delay-1">
                <div className="about-mini-card__num">2018</div>
                <div className="about-mini-card__lbl">Founded</div>
              </div>
              <div className="about-mini-card about-mini-card--accent reveal reveal-delay-2">
                <div className="about-mini-card__num">500+</div>
                <div className="about-mini-card__lbl">Partner Companies</div>
              </div>
              <div className="about-mini-card reveal reveal-delay-3">
                <div className="about-mini-card__num">42</div>
                <div className="about-mini-card__lbl">Avg. Days to Placement</div>
              </div>
              <div className="about-mini-card about-mini-card--dark reveal reveal-delay-4">
                <div className="about-mini-card__num">98%</div>
                <div className="about-mini-card__lbl">Success Rate</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ TRUSTED LOGOS ═══ */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Trusted by engineering teams at
          </span>
        </div>
        <div className="marquee-wrap logos-marquee">
          <div className="marquee-track logos-marquee__track">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {['Walmart', 'Amazon', 'Deloitte', 'Accenture', 'McKesson', 'Visa', 'Mastercard', 'Cognizant'].map(name => (
                  <div key={name} className="logo-pill">{name}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section-padding">
        <div className="container">
          <div className="reveal text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Success Stories</span>
            <h2 className="section-title">Real People, Real Results</h2>
          </div>

          <div className="testimonials-grid">
            {[
              { name: 'Balaji M.', role: 'Business Analyst · San Francisco, CA', stars: 5, text: 'RK Infotech didn\'t just help me get a job — they helped me build my career. From refining my resume to providing targeted technical training, their team ensured I was market-ready. Highly professional and result-oriented!' },
              { name: 'Lakshmi S.', role: 'Software Engineer · New York, NY', stars: 5, text: 'I\'m truly impressed with RK Infotech\'s approach. They took the time to understand my background and helped me rebuild my resume. Thanks to their guidance, I\'ve found a fantastic full-time opportunity.' },
              { name: 'Ravi K.', role: 'Data Engineer · Austin, TX', stars: 5, text: 'The technical training program was exceptional. They covered exactly what the market demands and prepared me thoroughly for interviews. Placed within 5 weeks — incredible results!' },
            ].map((t, i) => (
              <div key={i} className={`testi-card reveal reveal-delay-${i + 1}`}>
                <div className="testi-card__stars">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="var(--amber)" color="var(--amber)" />)}
                </div>
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__author">
                  <div className="testi-card__avatar">{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-box__glow" />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
              Ready to Land Your<br />Dream Role?
            </h2>
            <p>
              Whether you are looking for your next opportunity or building a world-class team, 
              RK Infotech is your strategic partner.
            </p>
            <div className="cta-box__actions">
              <Link to="/pricing" className="btn btn-primary" style={{ background: 'var(--bg-root)', color: 'var(--bg-invert)' }}>
                Explore Pricing <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text-invert)' }}>
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;