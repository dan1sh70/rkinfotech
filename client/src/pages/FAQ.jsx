import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    category: 'For Job Seekers',
    items: [
      { q: 'What is included in the Professional Plan?', a: 'The Professional Plan ($5,000 enrollment + 12% placement fee) includes complete resume optimization, comprehensive interview preparation, profile marketing to 500+ hiring partners, and a dedicated career coach.' },
      { q: 'Is there a guarantee I will get placed?', a: 'Our Platinum Plan ($20,000, no placement fee) includes a strict placement guarantee within 110 days. For other plans, our 90%+ success rate demonstrates our commitment.' },
      { q: 'How does the post-placement fee work?', a: 'After you secure a job, a one-time percentage of your first-year base salary (12% for Professional, 17% for Basic) is payable. Platinum has zero post-placement fees.' },
      { q: 'How long does placement take?', a: 'Most Professional/Platinum candidates receive calls within 2-4 weeks and are placed within 60-90 days.' },
    ]
  },
  {
    category: 'For Employers',
    items: [
      { q: 'What is your typical time-to-fill?', a: 'We present pre-vetted, interview-ready candidates within 48-72 hours.' },
      { q: 'Do you offer contract-to-hire?', a: 'Yes — direct hire, contract, and contract-to-hire, fully customized to your needs.' },
      { q: 'What technologies do your candidates specialize in?', a: 'Cloud (AWS, Azure, GCP), DevOps, data engineering, full-stack development (React, Node, Java, Python), QA automation, and business analysis.' },
    ]
  }
];

const FAQ = () => {
  const [activeCat, setActiveCat] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="faq animate-fade-up">
      <section className="faq__hero">
        <div className="container text-center">
          <span className="section-tag">FAQ</span>
          <h1 className="section-title">Questions? <span className="gradient-text">Answered.</span></h1>
          <p className="section-subtitle">Everything you need to know about our placement packages and staffing solutions.</p>
        </div>
      </section>

      <section className="faq__body">
        <div className="container faq__layout">
          <aside className="faq__side">
            {faqs.map((c, idx) => (
              <button key={idx} className={`faq__cat ${activeCat === idx ? 'faq__cat--on' : ''}`} onClick={() => { setActiveCat(idx); setOpenIdx(null); }}>
                {c.category}
              </button>
            ))}
          </aside>

          <div className="faq__list">
            {faqs[activeCat].items.map((item, idx) => (
              <div key={idx} className={`faq-item card ${openIdx === idx ? 'faq-item--open' : ''}`}>
                <button className="faq-item__q" onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="faq-item__chev" />
                </button>
                <div className="faq-item__a">
                  <div className="faq-item__a-inner"><p>{item.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
