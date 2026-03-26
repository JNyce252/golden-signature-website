import React, { useState, useEffect, useRef } from 'react';

const GoldenSignature = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.4s; opacity: 0; }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

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
        <button className="nav-cta" onClick={() => scrollTo('contact')}>Book a Demo</button>
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
            <span className="line-1">We Build Software</span>
            <span className="line-2">That Thinks.</span>
            <span className="line-3">Custom AI Solutions for Real Business Problems</span>
          </h1>
          <p className="hero-sub fade-up fade-up-3">
            The Golden Signature creates intelligent software that automates workflows, 
            generates leads, and drives revenue — purpose-built for your industry.
          </p>
          <div className="hero-actions fade-up fade-up-4">
            <button className="btn-primary" onClick={() => scrollTo('products')}>See Our Products</button>
            <button className="btn-secondary" onClick={() => scrollTo('contact')}>Book a Demo →</button>
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
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Request a Demo →</button>
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

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="contact-inner">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Ready to Build<br />Something Remarkable?</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Book a demo of SmartLift or discuss a custom AI project for your business.</p>
          <div className="contact-form">
            <div className="form-group">
              <input className="form-input" placeholder="Your Name" />
              <input className="form-input" placeholder="Company" />
            </div>
            <div className="form-group">
              <input className="form-input" type="email" placeholder="Email Address" />
              <input className="form-input" placeholder="Phone (optional)" />
            </div>
            <select className="form-input" style={{ cursor: 'pointer' }}>
              <option value="" disabled selected>I'm interested in...</option>
              <option>SmartLift Standard ($299/mo)</option>
              <option>SmartLift Pro ($399/mo)</option>
              <option>Custom AI Development</option>
              <option>General Inquiry</option>
            </select>
            <textarea className="form-input" placeholder="Tell us about your project or questions..." />
            <button className="btn-primary" style={{ alignSelf: 'stretch' }}>Send Message →</button>
          </div>
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