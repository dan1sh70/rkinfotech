import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

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

const faqs = [
  { q: 'How long does the placement process typically take?', a: 'Our average placement timeline is 42 days from enrollment to offer acceptance. However, this can vary based on your experience level, target roles, and responsiveness to opportunities. We have placed candidates in as little as 2 weeks.' },
  { q: 'Is RK Infotech a legitimate US company?', a: 'Yes. RK Infotech LLC is a fully registered, E-Verified US company based in Nashville, TN. We operate nationwide and have been placing IT professionals since 2018.' },
  { q: 'Do you offer a placement guarantee?', a: 'Our Growth plan includes a placement guarantee. If we do not place you within the agreed timeline, we continue working with you at no additional cost until you are placed.' },
  { q: 'What types of roles do you specialize in?', a: 'We specialize in IT roles including Software Engineers, Data Engineers, Business Analysts, Cloud Architects, DevOps Engineers, QA Engineers, and Project Managers.' },
  { q: 'Can I work with you if I am on a visa?', a: 'Yes. We work with candidates on H1B, OPT, CPT, and other work authorizations. Our team is experienced in navigating visa-related hiring processes.' },
  { q: 'How does the resume optimization service work?', a: 'Our resume experts work with you 1-on-1 to restructure your experience, align it with ATS keywords for your target roles, and highlight achievements over responsibilities. Most clients see a significant increase in interview callbacks within 2 weeks.' },
  { q: 'What is included in the technical training program?', a: 'Programs are customized to your career goals and may include cloud platforms (AWS, Azure, GCP), DevOps tools, data engineering frameworks, agile methodologies, and more. Training is live, instructor-led, and project-based.' },
  { q: 'How much does it cost?', a: 'Our pricing is customized based on the specific services and level of support you need. We offer flexible payment options. Contact us for a personalized quote.' },
];

const FAQ = () => {
  useReveal();
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container">
          <span className="section-eyebrow animate-fade-up delay-1">FAQ</span>
          <h1 className="section-title animate-fade-up delay-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '0.5rem' }}>
            Frequently Asked Questions
          </h1>
          <p className="section-desc animate-fade-up delay-3" style={{ margin: '1.25rem auto 0' }}>
            Everything you need to know about RK Infotech and our services.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'var(--section-gap)' }}>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item reveal">
              <button className="faq-item__trigger" onClick={() => setOpen(open === i ? null : i)}>
                <span>{faq.q}</span>
                {open === i ? <Minus size={18} color="var(--accent)" /> : <Plus size={18} />}
              </button>
              {open === i && <div className="faq-item__body">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;