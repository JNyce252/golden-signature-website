import React, { useState, useEffect, useRef } from 'react';

const GoldenSignature = () => {
  const [scrollY, setScrollY] = useState(0);
  const [introPhase, setIntroPhase] = useState(0); // 0=loading, 1=logo, 2=burst, 3=reveal, 4=done
  const [typedText, setTypedText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ step: 1, name: '', company: '', email: '', phone: '', industry: '', appType: '', primaryUsers: '', problem: '', features: [], integrations: [], additionalFeatures: '', timeline: '', budget: '', designNotes: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) { setFormError('Name and email are required'); return; }
    setFormLoading(true);
    setFormError('');
    try {
      const message = [
        'NEW PROJECT INTAKE — AI ANALYSIS REQUEST',
        '',
        'CLIENT INFORMATION:',
        'Name: ' + formData.name,
        'Company: ' + (formData.company || 'Not provided'),
        'Email: ' + formData.email,
        'Phone: ' + (formData.phone || 'Not provided'),
        'Industry: ' + (formData.industry || 'Not specified'),
        '',
        'PROJECT DETAILS:',
        'Application Type: ' + (formData.appType || 'Not specified'),
        'Primary Users: ' + (formData.primaryUsers || 'Not specified'),
        'Problem to Solve: ' + (formData.problem || 'Not described'),
        '',
        'FEATURES REQUESTED:',
        (formData.features && formData.features.length > 0 ? formData.features.join(', ') : 'None selected'),
        '',
        'INTEGRATIONS NEEDED:',
        (formData.integrations && formData.integrations.length > 0 ? formData.integrations.join(', ') : 'None selected'),
        '',
        'ADDITIONAL REQUIREMENTS:',
        (formData.additionalFeatures || 'None'),
        '',
        'TIMELINE: ' + (formData.timeline || 'Not specified'),
        'BUDGET: ' + (formData.budget || 'Not specified'),
        'DESIGN NOTES: ' + (formData.designNotes || 'None'),
      ].join('\n');

      const res = await fetch('https://aup3wz6azh.execute-api.us-east-1.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          type: 'project_intake',
          subject: 'New Project Intake: ' + (formData.appType || 'Custom App') + ' for ' + (formData.company || formData.name) + ' (' + (formData.industry || 'Unknown Industry') + ')',
          message: message
        })
      });
      if (res.ok) { setFormSent(true); }
      else setFormError('Something went wrong. Please try again.');
    } catch (e) { setFormError('Failed to send. Please email us directly at nyceguy@thegoldensignature.com'); }
    finally { setFormLoading(false); }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Phase 1: show logo after brief pause
    const t1 = setTimeout(() => setIntroPhase(1), 300);
    // Phase 2: burst
    const t2 = setTimeout(() => setIntroPhase(2), 1800);
    // Phase 3: reveal site
    const t3 = setTimeout(() => setIntroPhase(3), 2400);
    // Phase 4: done — remove intro
    const t4 = setTimeout(() => setIntroPhase(4), 3200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (introPhase < 4) return;
    const text = 'We Build Software That Thinks.';
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [introPhase]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: '#050508', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
          --gold: #D4A843;
          --gold-light: #F0C866;
          --gold-dim: #8B6914;
          --bg: #050508;
          --bg-2: #0A0A10;
          --bg-3: #0F0F18;
          --text: #F5F5F0;
          --text-dim: #888880;
          --accent: #6C63FF;
        }

        html { scroll-behavior: smooth; }

        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 48px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
        }
        nav.scrolled {
          background: rgba(5,5,8,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,168,67,0.1);
          padding: 16px 48px;
        }

        .logo {
          font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          cursor: pointer;
        }

        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { color: var(--text-dim); text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; transition: color 0.2s; cursor: pointer; }
        .nav-links a:hover { color: var(--gold-light); }

        .nav-cta {
          padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;
          background: linear-gradient(135deg, var(--gold), var(--gold-dim));
          color: #000; cursor: pointer; border: none; letter-spacing: 0.3px;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.9; }

        .hero {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 120px 48px 80px; text-align: center; position: relative;
        }

        .hero-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 100px;
          background: rgba(212,168,67,0.1); border: 1px solid rgba(212,168,67,0.25);
          font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
          color: var(--gold-light); margin-bottom: 32px;
        }

        .hero-title {
          font-size: clamp(56px, 8vw, 96px); font-weight: 800; line-height: 1.0;
          letter-spacing: -3px; margin-bottom: 28px;
        }

        .hero-title .line-1 { display: block; color: var(--text); }
        .hero-title .line-2 {
          display: block;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, #FF6B35 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-title .line-3 { display: block; color: var(--text-dim); font-weight: 400; font-size: 0.6em; letter-spacing: -1px; margin-top: 8px; }

        .hero-sub {
          font-family: 'DM Sans', sans-serif; font-size: 18px; line-height: 1.7;
          color: var(--text-dim); max-width: 560px; margin: 0 auto 48px;
          font-weight: 300;
        }

        .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

        .btn-primary {
          padding: 16px 36px; border-radius: 8px; font-size: 15px; font-weight: 700;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          color: #000; cursor: pointer; border: none; letter-spacing: 0.3px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 32px rgba(212,168,67,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(212,168,67,0.4); }

        .btn-secondary {
          padding: 16px 36px; border-radius: 8px; font-size: 15px; font-weight: 600;
          background: transparent; color: var(--text); cursor: pointer;
          border: 1px solid rgba(255,255,255,0.15); letter-spacing: 0.3px;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover { border-color: var(--gold); color: var(--gold-light); }

        .stats-bar {
          display: flex; justify-content: center; gap: 64px; flex-wrap: wrap;
          padding: 48px; border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin: 0; background: var(--bg-2);
        }
        .stat { text-align: center; }
        .stat-num { font-size: 36px; font-weight: 800; color: var(--gold-light); letter-spacing: -1px; }
        .stat-label { font-size: 13px; color: var(--text-dim); margin-top: 4px; font-family: 'DM Sans', sans-serif; }

        section { position: relative; z-index: 2; }

        .section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 16px;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 56px); font-weight: 800; letter-spacing: -2px;
          line-height: 1.1; color: var(--text);
        }

        .section-sub {
          font-family: 'DM Sans', sans-serif; font-size: 17px; color: var(--text-dim);
          line-height: 1.7; font-weight: 300; max-width: 520px;
        }

        /* Products */
        .products { padding: 120px 48px; background: var(--bg); }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-top: 64px; max-width: 1200px; margin-left: auto; margin-right: auto; }

        .product-card {
          border-radius: 16px; padding: 40px; position: relative; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06); background: var(--bg-2);
          transition: transform 0.3s, border-color 0.3s;
        }
        .product-card:hover { transform: translateY(-4px); border-color: rgba(212,168,67,0.3); }
        .product-card.featured { border-color: rgba(212,168,67,0.25); background: linear-gradient(135deg, rgba(212,168,67,0.05), rgba(108,99,255,0.05)); }

        .product-icon {
          width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 24px;
        }
        .product-tag {
          display: inline-block; padding: 4px 12px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .product-name { font-size: 26px; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.5px; }
        .product-desc { font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--text-dim); line-height: 1.6; margin-bottom: 28px; }
        .product-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
        .product-features li { font-size: 14px; color: var(--text-dim); display: flex; align-items: center; gap-: 8px; font-family: 'DM Sans', sans-serif; }
        .product-features li::before { content: '→'; color: var(--gold); margin-right: 10px; font-weight: 700; }
        .product-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 700; color: var(--gold-light);
          text-decoration: none; cursor: pointer; border: none; background: none;
          transition: gap 0.2s;
        }
        .product-link:hover { gap: 12px; }

        /* Services */
        .services { padding: 120px 48px; background: var(--bg-2); }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2px; margin-top: 64px; max-width: 1200px; margin-left: auto; margin-right: auto; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; }
        .service-item {
          padding: 40px; background: var(--bg-2); transition: background 0.3s;
          border-right: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .service-item:hover { background: var(--bg-3); }
        .service-num { font-size: 48px; font-weight: 800; color: rgba(212,168,67,0.15); letter-spacing: -2px; margin-bottom: 16px; }
        .service-name { font-size: 20px; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.3px; }
        .service-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dim); line-height: 1.6; }

        /* Pricing */
        .pricing { padding: 120px 48px; background: var(--bg); }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 64px; max-width: 1000px; margin-left: auto; margin-right: auto; }
        .pricing-card {
          border-radius: 16px; padding: 48px; border: 1px solid rgba(255,255,255,0.06);
          background: var(--bg-2); position: relative;
        }
        .pricing-card.popular {
          border-color: var(--gold); background: linear-gradient(135deg, rgba(212,168,67,0.08), var(--bg-2));
        }
        .popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          padding: 6px 20px; border-radius: 100px; font-size: 11px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          background: linear-gradient(135deg, var(--gold-light), var(--gold)); color: #000;
        }
        .price { font-size: 56px; font-weight: 800; letter-spacing: -2px; color: var(--text); }
        .price span { font-size: 20px; color: var(--text-dim); font-weight: 400; }
        .pricing-name { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
        .pricing-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dim); margin-bottom: 32px; line-height: 1.6; }
        .pricing-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
        .pricing-features li { font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dim); display: flex; align-items: flex-start; gap: 10px; }
        .pricing-features li::before { content: '✓'; color: var(--gold); font-weight: 700; flex-shrink: 0; }

        /* About */
        .about { padding: 120px 48px; background: var(--bg-2); }
        .about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-visual {
          border-radius: 20px; aspect-ratio: 1; background: linear-gradient(135deg, rgba(212,168,67,0.1), rgba(108,99,255,0.1));
          border: 1px solid rgba(212,168,67,0.15); display: flex; align-items: center; justify-content: center;
          font-size: 120px; position: relative; overflow: hidden;
        }
        .about-visual::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(212,168,67,0.15), transparent 60%);
        }

        /* Contact */
        .contact { padding: 120px 48px; background: var(--bg); }
        .contact-inner { max-width: 640px; margin: 0 auto; text-align: center; }
        .contact-form { margin-top: 48px; display: flex; flex-direction: column; gap: 16px; text-align: left; }
        .form-group { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-input {
          padding: 16px 20px; border-radius: 8px; font-size: 15px;
          background: var(--bg-2); border: 1px solid rgba(255,255,255,0.08);
          color: var(--text); outline: none; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .form-input:focus { border-color: var(--gold); }
        .form-input::placeholder { color: var(--text-dim); }
        textarea.form-input { resize: vertical; min-height: 120px; }

        /* Footer */
        footer {
          padding: 48px; background: var(--bg-2);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px;
        }
        .footer-logo { font-size: 18px; font-weight: 800; background: linear-gradient(135deg, var(--gold-light), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .footer-links { display: flex; gap: 32px; }
        .footer-links a { color: var(--text-dim); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
        .footer-links a:hover { color: var(--gold-light); }
        .footer-copy { font-size: 13px; color: var(--text-dim); font-family: 'DM Sans', sans-serif; }

        @media (max-width: 768px) {
          nav { padding: 16px 24px; }
          .nav-links { display: none; }
          .hero { padding: 100px 24px 60px; }
          .stats-bar { gap: 32px; padding: 32px 24px; }
          .products, .services, .pricing, .about, .contact { padding: 80px 24px; }
          .about-inner { grid-template-columns: 1fr; gap: 48px; }
          .form-group { grid-template-columns: 1fr; }
          footer { padding: 32px 24px; flex-direction: column; text-align: center; }
        }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }

        @keyframes letterReveal { from { opacity: 0; transform: translateY(20px) rotateX(-90deg); } to { opacity: 1; transform: translateY(0) rotateX(0deg); } }
        @keyframes goldenPulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes particleBurst { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
        @keyframes introSlideUp { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }
        @keyframes siteReveal { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        .intro-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: #050508;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 32px;
        }
        .intro-overlay.slide-out { animation: introSlideUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards; }

        .intro-logo-wrap { display: flex; align-items: center; gap: 0; perspective: 800px; }
        .intro-letter {
          font-size: clamp(28px, 5vw, 52px); font-weight: 800;
          background: linear-gradient(135deg, var(--gold-light), var(--gold), #FF6B35);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          opacity: 0; display: inline-block;
          animation: letterReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .intro-tagline {
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
          color: rgba(212,168,67,0.5); letter-spacing: 4px; text-transform: uppercase;
          opacity: 0; transition: opacity 0.8s ease 1.2s;
        }
        .intro-tagline.visible { opacity: 1; }

        .intro-line {
          width: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transition: width 1s ease 0.8s;
        }
        .intro-line.expanded { width: 240px; }

        .particle {
          position: absolute; width: 4px; height: 4px; border-radius: 50%;
          background: var(--gold); pointer-events: none;
          animation: particleBurst 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .site-content { transition: none; }
        .site-content.revealed { animation: siteReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        .typed-cursor { display: inline-block; animation: cursorBlink 0.8s infinite; color: var(--gold); }

        .shimmer-text {
          background: linear-gradient(90deg, var(--gold-light) 0%, #fff 40%, var(--gold-light) 60%, var(--gold) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.4s; opacity: 0; }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Intro Loader */}
      {introPhase < 4 && (
        <div className={`intro-overlay${introPhase === 3 ? ' slide-out' : ''}`} style={{ position: 'fixed' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            {/* Particles */}
            {introPhase >= 2 && Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const dist = 80 + Math.random() * 120;
              return (
                <div key={i} className="particle" style={{
                  left: '50%', top: '50%',
                  '--tx': Math.cos(angle) * dist + 'px',
                  '--ty': Math.sin(angle) * dist + 'px',
                  animationDelay: (i * 0.03) + 's',
                  background: i % 3 === 0 ? 'var(--gold-light)' : i % 3 === 1 ? 'var(--gold)' : '#FF6B35',
                  width: (2 + Math.random() * 4) + 'px',
                  height: (2 + Math.random() * 4) + 'px',
                }} />
              );
            })}
            <div className="intro-logo-wrap">
              {'The Golden Signature'.split('').map((char, i) => (
                <span key={i} className="intro-letter" style={{
                  animationDelay: introPhase >= 1 ? (i * 0.04) + 's' : '999s',
                  marginRight: char === ' ' ? '0.25em' : '0',
                }}>
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </div>
            <div className={`intro-line${introPhase >= 1 ? ' expanded' : ''}`} />
            <div className={`intro-tagline${introPhase >= 1 ? ' visible' : ''}`}>
              AI-Powered Business Software
            </div>
          </div>
        </div>
      )}

      <div className="noise" />
      <div className="grid-bg" />

      {/* Nav */}
      <nav className={scrollY > 50 ? 'scrolled' : ''}>
        <div className="logo" onClick={() => scrollTo('home')}>The Golden Signature</div>
        <ul className="nav-links">
          <li><a onClick={() => scrollTo('products')}>Products</a></li>
          <li><a onClick={() => scrollTo('services')}>Services</a></li>
          <li><a onClick={() => scrollTo('pricing')}>Pricing</a></li>
          <li><a onClick={() => scrollTo('about')}>About</a></li>
          <li><a onClick={() => scrollTo('contact')}>Contact</a></li>
        </ul>

      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-glow" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge fade-up fade-up-1">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            AI-Powered Business Software
          </div>
          <h1 className="hero-title fade-up fade-up-2">
            {introPhase >= 4 ? (
              <>
                <span className="line-1">We Build Software</span>
                <span className="line-2 shimmer-text">That Thinks.</span>
                <span className="line-3">Custom AI Solutions for Real Business Problems</span>
              </>
            ) : (
              <>
                <span className="line-1">We Build Software</span>
                <span className="line-2">That Thinks.</span>
                <span className="line-3">Custom AI Solutions for Real Business Problems</span>
              </>
            )}
          </h1>
          <p className="hero-sub fade-up fade-up-3">
            The Golden Signature creates intelligent software that automates workflows, 
            generates leads, and drives revenue — purpose-built for your industry.
          </p>
          <div className="hero-actions fade-up fade-up-4">
            <button className="btn-primary" onClick={() => scrollTo('products')}>See Our Products</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        {[['AI-Powered', 'Platforms Built'], ['37,000+', 'Data Records Integrated'], ['100%', 'Cloud Native on AWS'], ['Custom', 'Every Solution']].map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <section id="products" className="products">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label">Our Products</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Software Built for<br />Your Industry</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>Each product is purpose-built with AI at its core — not bolted on as an afterthought.</p>
          <div style={{ maxWidth: 600, margin: '64px auto 0' }}>
            <div className="product-card featured">
              <div className="product-icon" style={{ background: 'rgba(212,168,67,0.15)' }}>🏗️</div>
              <span className="product-tag" style={{ background: 'rgba(212,168,67,0.15)', color: 'var(--gold-light)' }}>Live ✦</span>
              <div className="product-name">SmartLift</div>
              <p className="product-desc">AI-powered lead generation and CRM platform for elevator service companies. Discover prospects, score leads, generate proposals, and close deals — all in one place.</p>
              <ul className="product-features">
                <li>Google Places prospect discovery with 60-mile radius search</li>
                <li>AI lead scoring via Amazon Bedrock</li>
                <li>TDLR inspection data integration (37,000+ records)</li>
                <li>Automated proposal & introduction email generation</li>
                <li>Pipeline management, route optimizer & analytics</li>
                <li>Hunter.io contact intelligence</li>
              </ul>
              <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 12 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--gold)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Client Deployment</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>Southwest Cabs Elevator Services</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', marginBottom: 12, lineHeight: 1.6 }}>Since 1984, Southwest Cabs has delivered custom elevator cab interiors, ADA-compliant upgrades, LED lighting, and lobby modernization across Texas, Oklahoma, and the Midwest. Built in Texas. Trusted everywhere.</p>
                <a href="https://southwestcabs.com" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--gold-light)', textDecoration: 'none', fontWeight: 600 }}>southwestcabs.com →</a>
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div style={{ marginTop: 64 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-dim)', textAlign: 'center', marginBottom: 32, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Platform Screenshots</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {[
                ['https://s3.us-east-1.amazonaws.com/thegoldensignature.com/assets/smartlift-prospect.png', 'Prospect Intelligence — AI analysis, TDLR records, contact data'],
                ['https://s3.us-east-1.amazonaws.com/thegoldensignature.com/assets/smartlift-dashboard.png', 'Main Dashboard — pipeline value, quick actions, urgent alerts'],
                ['https://s3.us-east-1.amazonaws.com/thegoldensignature.com/assets/smartlift-analytics.png', 'Analytics Dashboard — AI lead intelligence and performance metrics'],
              ].map(([src, caption]) => (
                <div key={src} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'var(--bg-3)' }}>
                  <img src={src} alt={caption} style={{ width: '100%', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', padding: '12px 16px', margin: 0, lineHeight: 1.5 }}>{caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-label">What We Do</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Custom AI Development<br />For Your Business</h2>
          <p className="section-sub">We design, build, and deploy AI-powered software tailored to your specific industry and workflow.</p>
          <div className="services-grid">
            {[
              ['01', 'AI Lead Generation Systems', 'Automated prospect discovery, scoring, and outreach pipelines using machine learning and real-time data sources.'],
              ['02', 'Custom CRM & Sales Tools', 'Purpose-built sales platforms with AI proposal generation, pipeline management, and contact intelligence.'],
              ['03', 'Data Integration Platforms', 'Connect government databases, APIs, and internal data sources into unified intelligence dashboards.'],
              ['04', 'Workflow Automation', 'Replace manual processes with intelligent automation that learns and improves over time.'],
              ['05', 'AWS Cloud Architecture', 'Scalable, secure cloud infrastructure on AWS — Lambda, Aurora, Bedrock, Amplify, and beyond.'],
              ['06', 'AI Strategy Consulting', 'Help your business identify where AI delivers the most value and build a roadmap to get there.'],
            ].map(([num, name, desc]) => (
              <div className="service-item" key={num}>
                <div className="service-num">{num}</div>
                <div className="service-name">{name}</div>
                <p className="service-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label">Pricing</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Simple, Transparent Pricing</h2>
          <p className="section-sub" style={{ margin: '0 auto 16px' }}>All pricing is custom — scoped to your business needs and managed on a monthly basis.</p>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 64 }}>
              {[
                ['🔨', 'Custom Build', 'Every solution is scoped and priced based on your specific requirements, data sources, and complexity.'],
                ['📅', 'Monthly Management', 'Ongoing hosting, support, updates, and AI costs covered under a monthly agreement tailored to your usage.'],
                ['🚀', 'Scalable Packages', 'Start with what you need. Scale up as your business grows — pricing grows with you, not against you.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ background: 'var(--bg-2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.08), rgba(108,99,255,0.08))', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 20, padding: '48px 40px', textAlign: 'center' }}>
              <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>Every Project Is Unique</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 32px', fontWeight: 300 }}>
                We don't believe in one-size-fits-all pricing. After a discovery conversation, 
                we'll provide a transparent proposal outlining exactly what we'll build, 
                what it costs, and what you'll pay monthly for us to manage it.
              </p>
              <button className="btn-primary" onClick={() => scrollTo('contact')}>Schedule a Discovery Call</button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="about-inner">
          <div>
            <div className="section-label">About Us</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>Built by a Developer<br />Who Understands Business</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 24, fontWeight: 300 }}>
              The Golden Signature was founded by Jeremy Wilson — a developer and AWS Cloud Engineer 
              with a Security domain background, based in Texas. With roots in the U.S. Army and 
              a strong foundation in project management, Jeremy brings discipline, structure, and 
              strategic thinking to every solution he builds.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
              We don't just build software — we build solutions that solve real problems 
              for real businesses. Every product is built on AWS infrastructure, powered by the 
              latest AI models, and designed with the end user in mind.
            </p>
            <div style={{ display: 'flex', gap: 32 }}>
              {[['AWS', 'Cloud Engineer'], ['Army', 'Veteran'], ['Texas', 'Based & Built']].map(([tech, label]) => (
                <div key={tech}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold-light)' }}>{tech}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual float">
            <span style={{ position: 'relative', zIndex: 1 }}>✦</span>
          </div>
        </div>
      </section>

      {/* Contact — AI Intake Form */}
      <section id="contact" style={{ padding: '120px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">Start Your Project</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Tell Us What You're Building</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Answer a few questions and our AI will analyze your requirements. You'll hear from us within 24 hours with a detailed proposal outline.</p>
          </div>

          {formSent ? (
            <div style={{ padding: 64, background: 'linear-gradient(135deg, rgba(212,168,67,0.08), rgba(108,99,255,0.08))', border: '1px solid rgba(212,168,67,0.25)', borderRadius: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 24 }}>✦</div>
              <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, letterSpacing: -1 }}>We're On It</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-dim)', fontSize: 17, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 32px' }}>
                Our AI has analyzed your requirements. You'll receive a detailed project brief and proposal outline within 24 hours.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 100, fontSize: 14, color: 'var(--gold-light)', fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                AI Analysis Complete
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--bg-2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, overflow: 'hidden' }}>

              {/* Progress Bar */}
              <div style={{ padding: '28px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1,2,3,4].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: formData.step >= s ? 'linear-gradient(135deg, var(--gold-light), var(--gold))' : 'rgba(255,255,255,0.06)', color: formData.step >= s ? '#000' : 'var(--text-dim)', border: formData.step >= s ? 'none' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s' }}>
                        {formData.step > s ? '✓' : s}
                      </div>
                      {s < 4 && <div style={{ width: 32, height: 2, background: formData.step > s ? 'var(--gold)' : 'rgba(255,255,255,0.06)', borderRadius: 2, transition: 'background 0.3s' }} />}
                    </div>
                  ))}
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)' }}>
                  Step {formData.step} of 4
                </span>
              </div>

              <div style={{ padding: 40 }}>

                {/* Step 1 — About You */}
                {formData.step === 1 && (
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>About You</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-dim)', marginBottom: 32, fontSize: 15 }}>Let's start with the basics.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <input className="form-input" placeholder="Your Name *" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} />
                      <input className="form-input" placeholder="Company / Business Name" value={formData.company} onChange={e => setFormData(p => ({...p, company: e.target.value}))} />
                      <input className="form-input" type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} />
                      <input className="form-input" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Industry / Vertical</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Elevator Services', 'HVAC', 'Healthcare', 'Real Estate', 'Construction', 'Retail', 'Logistics', 'Financial Services', 'Legal', 'Restaurant / Food Service', 'Manufacturing', 'Other'].map(ind => (
                          <button key={ind} onClick={() => setFormData(p => ({...p, industry: ind}))} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.industry === ind ? 'rgba(212,168,67,0.15)' : 'rgba(255,255,255,0.04)', borderColor: formData.industry === ind ? 'var(--gold)' : 'rgba(255,255,255,0.08)', color: formData.industry === ind ? 'var(--gold-light)' : 'var(--text-dim)' }}>
                            {ind}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 — Your Project */}
                {formData.step === 2 && (
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Your Project</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-dim)', marginBottom: 32, fontSize: 15 }}>Help us understand what you need built.</p>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Type of Application</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          ['🌐', 'Web Application', 'Browser-based software'],
                          ['📱', 'Mobile App', 'iOS and/or Android'],
                          ['🤖', 'AI Automation Tool', 'Automate workflows with AI'],
                          ['📊', 'Dashboard / Analytics', 'Data visualization & insights'],
                          ['🏪', 'Customer Portal', 'Client-facing self-service'],
                          ['⚙️', 'Internal Tool', 'Internal team operations'],
                        ].map(([icon, type, desc]) => (
                          <button key={type} onClick={() => setFormData(p => ({...p, appType: type}))} style={{ padding: '16px 20px', borderRadius: 12, textAlign: 'left', cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.appType === type ? 'rgba(212,168,67,0.08)' : 'rgba(255,255,255,0.02)', borderColor: formData.appType === type ? 'var(--gold)' : 'rgba(255,255,255,0.08)' }}>
                            <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: formData.appType === type ? 'var(--gold-light)' : 'var(--text)', marginBottom: 2 }}>{type}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Who are the primary users?</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['My employees / team', 'My customers', 'Field technicians', 'Sales team', 'Management only', 'General public'].map(u => (
                          <button key={u} onClick={() => setFormData(p => ({...p, primaryUsers: u}))} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.primaryUsers === u ? 'rgba(212,168,67,0.15)' : 'rgba(255,255,255,0.04)', borderColor: formData.primaryUsers === u ? 'var(--gold)' : 'rgba(255,255,255,0.08)', color: formData.primaryUsers === u ? 'var(--gold-light)' : 'var(--text-dim)' }}>
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>What is the main problem you're solving? *</label>
                      <textarea className="form-input" rows={6} placeholder="Describe your biggest pain point or opportunity. What's broken, slow, or missing in your current workflow?" value={formData.problem} onChange={e => setFormData(p => ({...p, problem: e.target.value}))} style={{ resize: 'vertical', minHeight: 140, width: '100%', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                )}

                {/* Step 3 — Features */}
                {formData.step === 3 && (
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Features & Capabilities</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-dim)', marginBottom: 32, fontSize: 15 }}>Select everything that applies to your project.</p>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Core Features Needed</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['User login / accounts', 'AI / machine learning', 'Dashboard & analytics', 'Mobile responsive', 'Payment processing', 'Email notifications', 'SMS notifications', 'File uploads', 'API integrations', 'Reporting & exports', 'Multi-user roles', 'Customer portal', 'Scheduling / calendar', 'Maps & location', 'Real-time updates', 'Data imports', 'Document generation', 'E-signature'].map(f => (
                          <button key={f} onClick={() => setFormData(p => ({ ...p, features: p.features && p.features.includes(f) ? p.features.filter(x => x !== f) : [...(p.features || []), f] }))} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.features && formData.features.includes(f) ? 'rgba(212,168,67,0.15)' : 'rgba(255,255,255,0.04)', borderColor: formData.features && formData.features.includes(f) ? 'var(--gold)' : 'rgba(255,255,255,0.08)', color: formData.features && formData.features.includes(f) ? 'var(--gold-light)' : 'var(--text-dim)' }}>
                            {formData.features && formData.features.includes(f) ? '✓ ' : ''}{f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Integrations needed</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Stripe / Payments', 'QuickBooks', 'Google Maps', 'Salesforce', 'HubSpot', 'Twilio / SMS', 'SendGrid', 'Zapier', 'Slack', 'Google Calendar', 'DocuSign', 'None needed'].map(i => (
                          <button key={i} onClick={() => setFormData(p => ({ ...p, integrations: p.integrations && p.integrations.includes(i) ? p.integrations.filter(x => x !== i) : [...(p.integrations || []), i] }))} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.integrations && formData.integrations.includes(i) ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.04)', borderColor: formData.integrations && formData.integrations.includes(i) ? '#6C63FF' : 'rgba(255,255,255,0.08)', color: formData.integrations && formData.integrations.includes(i) ? '#A8A3FF' : 'var(--text-dim)' }}>
                            {formData.integrations && formData.integrations.includes(i) ? '✓ ' : ''}{i}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Anything else to add?</label>
                      <textarea className="form-input" rows={3} placeholder="Any specific requirements, data sources, or features not listed above..." value={formData.additionalFeatures} onChange={e => setFormData(p => ({...p, additionalFeatures: e.target.value}))} style={{ resize: 'none' }} />
                    </div>
                  </div>
                )}

                {/* Step 4 — Timeline & Budget */}
                {formData.step === 4 && (
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Timeline & Budget</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-dim)', marginBottom: 32, fontSize: 15 }}>Help us scope your project accurately.</p>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>When do you need this?</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['ASAP — within 2 weeks', '1 month', '2-3 months', '3-6 months', 'Flexible / not urgent'].map(t => (
                          <button key={t} onClick={() => setFormData(p => ({...p, timeline: t}))} style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.timeline === t ? 'rgba(212,168,67,0.15)' : 'rgba(255,255,255,0.04)', borderColor: formData.timeline === t ? 'var(--gold)' : 'rgba(255,255,255,0.08)', color: formData.timeline === t ? 'var(--gold-light)' : 'var(--text-dim)' }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Project budget range</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          ['Under $5,000', 'Small project or MVP'],
                          ['$5,000 – $15,000', 'Medium complexity'],
                          ['$15,000 – $30,000', 'Full platform build'],
                          ['$30,000+', 'Enterprise solution'],
                          ['Not sure yet', 'Need guidance on scoping'],
                        ].map(([range, desc]) => (
                          <button key={range} onClick={() => setFormData(p => ({...p, budget: range}))} style={{ padding: '14px 18px', borderRadius: 12, textAlign: 'left', cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', background: formData.budget === range ? 'rgba(212,168,67,0.08)' : 'rgba(255,255,255,0.02)', borderColor: formData.budget === range ? 'var(--gold)' : 'rgba(255,255,255,0.08)' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: formData.budget === range ? 'var(--gold-light)' : 'var(--text)', marginBottom: 2 }}>{range}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', display: 'block', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Do you have any design references or examples you like?</label>
                      <textarea className="form-input" rows={3} placeholder="Links to websites, apps, or describe the style you're going for..." value={formData.designNotes} onChange={e => setFormData(p => ({...p, designNotes: e.target.value}))} style={{ resize: 'none' }} />
                    </div>


                  </div>
                )}

                {/* Error */}
                {formError && <p style={{ color: '#FF6B6B', fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginTop: 16 }}>{formError}</p>}

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {formData.step > 1 ? (
                    <button onClick={() => setFormData(p => ({...p, step: p.step - 1}))} style={{ padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}>
                      ← Back
                    </button>
                  ) : <div />}

                  {formData.step < 4 ? (
                    <button className="btn-primary" onClick={() => {
                      if (formData.step === 1 && (!formData.name || !formData.email)) { setFormError('Name and email are required'); return; }
                      if (formData.step === 2 && !formData.problem) { setFormError('Please describe the problem you are solving'); return; }
                      setFormError('');
                      setFormData(p => ({...p, step: p.step + 1}));
                    }}>
                      Continue →
                    </button>
                  ) : (
                    <button className="btn-primary" onClick={handleSubmit} disabled={formLoading} style={{ minWidth: 200 }}>
                      {formLoading ? '✦ Analyzing with AI...' : 'Submit & Get AI Brief →'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-logo">The Golden Signature</div>
        <div className="footer-links">
          <a onClick={() => scrollTo('products')}>Products</a>
          <a onClick={() => scrollTo('services')}>Services</a>
          <a onClick={() => scrollTo('pricing')}>Pricing</a>
          <a onClick={() => scrollTo('contact')}>Contact</a>
        </div>
        <div className="footer-copy">© 2026 The Golden Signature · Built on AWS</div>
      </footer>
    </div>
  );
};

export default GoldenSignature;