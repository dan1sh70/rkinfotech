import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X as XIcon, ArrowRight } from 'lucide-react';
import './Pricing.css';

const plans = [
  {
    name: 'Basic',
    price: '$1,500',
    fee: '17%',
    feeLabel: 'Post-Placement Fee',
    days: '180',
    daysLabel: 'Days Support',
    tag: null,
    bg: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&w=600&q=80',
    description: 'Essential toolkit for the self-driven job seeker.',
    features: [
      { text: 'Resume Optimization', ok: true },
      { text: 'Interview Preparation', ok: true },
      { text: 'Profile Marketing', ok: false },
      { text: 'Dedicated Career Coach', ok: false },
      { text: 'Placement Guarantee', ok: false },
    ]
  },
  {
    name: 'Professional',
    price: '$5,000',
    fee: '12%',
    feeLabel: 'Post-Placement Fee',
    days: '150',
    daysLabel: 'Days Support',
    tag: 'Most Popular',
    bg: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80',
    description: 'Full-service coaching with dedicated placement support.',
    features: [
      { text: 'Resume Optimization', ok: true },
      { text: 'Interview Preparation', ok: true },
      { text: 'Profile Marketing', ok: true },
      { text: 'Dedicated Career Coach', ok: true },
      { text: 'Placement Guarantee', ok: false },
    ]
  },
  {
    name: 'Platinum',
    price: '$20,000',
    fee: '0%',
    feeLabel: 'No Placement Fee',
    days: '110',
    daysLabel: 'Days Max to Place',
    tag: 'Elite',
    bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    description: 'White-glove coaching with a full placement guarantee.',
    features: [
      { text: 'Resume Optimization', ok: true },
      { text: 'Interview Preparation', ok: true },
      { text: 'Profile Marketing', ok: true },
      { text: 'Dedicated Senior Coach', ok: true },
      { text: 'Placement Guarantee', ok: true },
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="pricing animate-fade-up">
      <section className="pricing__hero">
        <div className="container text-center">
          <span className="section-tag">Pricing Packages</span>
          <h1 className="section-title">
            Transparent Investment.<br />
            <span className="gradient-text">Exceptional Returns.</span>
          </h1>
          <p className="section-subtitle">
            Choose the placement package that matches your career ambitions. All plans include E-Verify and visa support.
          </p>
        </div>
      </section>

      <section className="pricing__body">
        <div className="container">
          <div className="pricing__grid">
            {plans.map((plan, i) => (
              <div key={i} className={`p-card card bg-card ${plan.tag === 'Most Popular' ? 'p-card--pop' : ''}`} style={{ backgroundImage: `url(${plan.bg})` }}>
                <div className="card-overlay" />
                {plan.tag && (
                  <div className={`p-card__tag ${plan.tag === 'Elite' ? 'p-card__tag--gold' : ''}`}>
                    {plan.tag}
                  </div>
                )}

                <h3 className="p-card__name">{plan.name}</h3>
                <p className="p-card__desc">{plan.description}</p>

                <div className="p-card__price-block">
                  <span className="p-card__price mono">{plan.price}</span>
                  <span className="p-card__price-label">Enrollment Fee</span>
                </div>

                <div className="p-card__data-row">
                  <div className="p-data">
                    <span className="p-data__value mono text-coral">{plan.fee}</span>
                    <span className="p-data__label">{plan.feeLabel}</span>
                  </div>
                  <div className="p-data__sep" />
                  <div className="p-data">
                    <span className="p-data__value mono text-cyan">{plan.days}</span>
                    <span className="p-data__label">{plan.daysLabel}</span>
                  </div>
                </div>

                <ul className="p-card__features">
                  {plan.features.map((f, j) => (
                    <li key={j} className={f.ok ? '' : 'disabled'}>
                      <span className="f-icon">{f.ok ? <Check size={14} /> : <XIcon size={14} />}</span>
                      {f.text}
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn full-width ${plan.tag === 'Most Popular' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => navigate(`/contact?plan=${encodeURIComponent(plan.name)}`)}
                >
                  Select {plan.name} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
