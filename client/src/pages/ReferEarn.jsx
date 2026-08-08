import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, DollarSign, Gift, ArrowRight } from 'lucide-react';
import './ReferEarn.css';

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const ReferEarn = () => {
  useReveal();
  return (
    <div className="refer-page">
      <div className="refer-hero">
        <div className="container">
          <span className="section-eyebrow animate-fade-up delay-1">Refer & Earn</span>
          <h1 className="section-title animate-fade-up delay-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
            Earn by Helping Others<br />Land Their Dream Role
          </h1>
          <p className="section-desc animate-fade-up delay-3" style={{ margin: '1.25rem auto 0' }}>
            Refer a friend or colleague to RK Infotech and earn rewards when they get placed.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title reveal">How It Works</h2>
        </div>
        <div className="refer-steps">
          {[
            { icon: <UserPlus size={28} />, step: '01', title: 'Refer Someone', desc: 'Share your unique referral link or simply tell us who to contact.' },
            { icon: <DollarSign size={28} />, step: '02', title: 'They Enroll', desc: 'Your referral signs up for any of our career coaching or placement services.' },
            { icon: <Gift size={28} />, step: '03', title: 'You Earn', desc: 'Receive your reward once your referral completes their program.' },
          ].map((s, i) => (
            <div key={i} className="refer-step reveal">
              <div className="refer-step__num">{s.step}</div>
              <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>{s.icon}</div>
              <h4 style={{ marginBottom: '0.75rem' }}>{s.title}</h4>
              <p style={{ fontSize: '0.88rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="refer-rewards section-padding" style={{ paddingBottom: 0 }}>
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title reveal">Referral Rewards</h2>
          </div>
          <div className="refer-rewards-grid">
            {[
              { amount: '$250', label: 'Per Successful Referral', desc: 'Earn $250 cash reward for every referred candidate who completes enrollment.' },
              { amount: '$500', label: 'Elite Referrer Bonus', desc: 'Refer 3 or more candidates and unlock our elite referrer bonus of $500.' },
            ].map((r, i) => (
              <div key={i} className="reward-card reveal">
                <div className="reward-card__amount">{r.amount}</div>
                <h4 style={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}>{r.label}</h4>
                <p style={{ fontSize: '0.88rem' }}>{r.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/contact" className="btn btn-primary">
              Start Referring <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;