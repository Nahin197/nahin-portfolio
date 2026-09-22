'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from './data/projects';

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */

const TYPED_STRINGS = [
  'Aspiring Jr. SQA Automation Engineer',
  'Problem Solver',
  'Full-Stack Web Developer',
  'CSE Graduate @ UIU',
];

const SKILLS = [
  {
    title: 'Test Automation',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    tags: [
      { name: 'Playwright', color: '#45ba4b' },
      { name: 'Selenium JS', color: '#43b02a' },
      { name: 'Newman', color: '#ef5b25' },
      { name: 'k6', color: '#7d64ff' },
    ],
  },
  {
    title: 'API Testing',
    color: '#ef5b25',
    glow: 'rgba(239,91,37,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    tags: [
      { name: 'Postman', color: '#ef5b25' },
      { name: 'REST API', color: '#22d3ee' },
      { name: 'Newman HTMLExtra', color: '#8b5cf6' },
      { name: 'Chained Requests', color: '#a78bfa' },
    ],
  },
  {
    title: 'QA Methodologies',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    tags: [
      { name: 'Manual Testing', color: '#94a3b8' },
      { name: 'Functional Testing', color: '#67e8f9' },
      { name: 'Regression', color: '#38bdf8' },
      { name: 'System Testing', color: '#22d3ee' },
      { name: 'SDLC / STLC', color: '#0ea5e9' },
      { name: 'Agile', color: '#6366f1' },
    ],
  },
  {
    title: 'Programming',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    tags: [
      { name: 'JavaScript ES6+', color: '#f7df1e' },
      { name: 'Java', color: '#f89820' },
      { name: 'Python', color: '#3572a5' },
      { name: 'C++', color: '#659ad2' },
      { name: 'C', color: '#8892bf' },
      { name: 'PHP', color: '#3572a5' },
    ],
  },
  {
    title: 'Web Development',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    tags: [
      { name: 'Laravel', color: '#ff2d20' },
      { name: 'HTML5', color: '#e34f26' },
      { name: 'CSS3', color: '#1572b6' },
      { name: 'tailwind CSS', color: '#1e4563ff'},
      { name: 'MySQL', color: '#4479a1' },
      { name: 'Node.js', color: '#6cc24a' },
    ],
  },
  {
    title: 'ML / NLP',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    tags: [
      { name: 'HuggingFace', color: '#ffd21f' },
      { name: 'PyTorch', color: '#ee4c2c' },
      { name: 'Scikit-learn', color: '#f89939' },
      { name: 'Google Colab', color: '#f9ab00' },
      { name: 'CodeCarbon', color: '#22c55e' },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.2)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    tags: [
      { name: 'Jira', color: '#0052cc' },
      { name: 'Git & GitHub', color: '#f05032' },
      { name: 'GitHub Actions', color: '#2088ff' },
      { name: 'VS Code', color: '#007acc' },
      { name: 'IntelliJ IDEA', color: '#fe2d55' },
    ],
  },
];

const CV_DRIVE_LINK = 'https://drive.google.com/file/d/10RJ38-L_79-KUd-jlLlSBt4rx6nIr482/view?usp=drive_link';
const CV_DOWNLOAD_LINK = '/Nahin_CV.pdf';

/* ════════════════════════════════════════
   TYPED TEXT HOOK
════════════════════════════════════════ */
function useTyped(strings, speed = 60, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setStrIdx((i) => (i + 1) % strings.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return display;
}

/* ════════════════════════════════════════
   SCROLL REVEAL HOOK
════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════ */
function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="navbar" style={scrolled ? { background: 'rgba(3,7,18,0.95)' } : {}} role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        <a href="#hero" className="navbar-logo" id="nav-logo">Nahin</a>
        
        <div className="navbar-links">
          {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="navbar-link" id={`nav-${s.toLowerCase()}`}>{s}</a>
          ))}
        </div>
        
        <div className="navbar-actions">
          <a href={CV_DOWNLOAD_LINK} download="Nahin_CV.pdf" className="btn btn-primary navbar-cta" id="nav-cv-btn">
            <IconDownload /> Resume
          </a>
          
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((s) => (
            <a 
              key={s} 
              href={`#${s.toLowerCase()}`} 
              className="mobile-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
function Hero() {
  const typed = useTyped(TYPED_STRINGS, 55, 2000);

  return (
    <section id="hero" className="hero section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container">
        <div className="hero-layout">
          {/* LEFT — text */}
          <div className="hero-content">
            <div className="hero-badge" id="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              Open to opportunities
            </div>

            <h1 className="hero-name" id="hero-name">
              Md. Khademul
              <br />
              <span className="hero-name-gradient">Islam Nahin</span>
            </h1>

            <p className="hero-title" id="hero-title" aria-live="polite">
              <span className="typed-text">{typed}</span>
              <span className="cursor" aria-hidden="true" />
            </p>

            <p className="hero-desc" id="hero-desc">
              Fresh CSE graduate from United International University with hands-on experience in
              SQA automation — building reliable, scalable test suites using Playwright, Postman &
              Newman. Champion at UIU CSE Project Show.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary" id="hero-view-projects">View Projects</a>
              <a href={CV_DOWNLOAD_LINK} download="Nahin_CV.pdf" className="btn btn-outline" id="hero-download-cv">
                <IconDownload /> Download CV
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/Nahin197" target="_blank" rel="noopener noreferrer" className="social-link" id="hero-social-github" aria-label="GitHub profile">
                <IconGitHub />
              </a>
              <a href="https://www.linkedin.com/in/md-khademul-islam-nahin-196200254/" target="_blank" rel="noopener noreferrer" className="social-link" id="hero-social-linkedin" aria-label="LinkedIn profile">
                <IconLinkedIn />
              </a>
              <a href="https://www.facebook.com/nahin197" target="_blank" rel="noopener noreferrer" className="social-link" id="hero-social-facebook" aria-label="Facebook profile">
                <IconFacebook />
              </a>
              <a href="https://wa.me/8801750454515" target="_blank" rel="noopener noreferrer" className="social-link" id="hero-social-whatsapp" aria-label="WhatsApp contact">
                <IconWhatsApp />
              </a>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="hero-photo-wrapper" id="hero-photo">
            <div className="hero-photo-ring" aria-hidden="true" />
            <div className="hero-photo-ring hero-photo-ring-2" aria-hidden="true" />
            <div className="hero-photo-container">
              <Image
                src="/nahin.jpg"
                alt="Md. Khademul Islam Nahin"
                fill
                className="hero-photo-img"
                priority
                sizes="(max-width: 768px) 220px, 320px"
              />
            </div>
            {/* Floating badges */}
            <div className="hero-float-badge hero-float-badge-1">🏆 Champion</div>
            <div className="hero-float-badge hero-float-badge-2">🧪 SQA</div>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ════════════════════════════════════════
   ABOUT
════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Who I <span>Am</span></h2>
          <div className="divider" />
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I&apos;m a Fresh Computer Science and Engineering graduate with hands-on experience
              in <strong style={{ color: 'var(--clr-violet-light)' }}>Software Testing & QA</strong> through
              professional training at CDIP, UIU and real-world automation projects.
            </p>
            <p>
              My practical experience spans Manual Testing, Functional &amp; Regression Testing,
              System Testing, API Testing, and Web Automation using{' '}
              <strong style={{ color: 'var(--clr-cyan)' }}>Playwright, Selenium, Postman, Newman,</strong>{' '}
              Jira, and k6. I have worked within SDLC, STLC, and Agile methodologies.
            </p>
            <p>
              Beyond QA, I have a solid foundation in C, C++, Java, Python, PHP, and JavaScript which enables
              me to understand both frontend and backend systems during testing.
              Proud to be <strong style={{ color: 'var(--clr-violet-light)' }}>Champion</strong> at UIU CSE Project Show (SAD Lab) and{' '}
              <strong style={{ color: 'var(--clr-cyan)' }}>2nd Runner-Up</strong> in AOOP.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href={CV_DRIVE_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-outline" id="about-view-cv">
                <IconExternal /> View Full CV
              </a>
            </div>
          </div>
          <div className="about-stats reveal reveal-delay-2">
            {[
              { value: '3.57', label: 'CGPA / 4.00' },
              { value: '12+', label: 'Projects Built' },
              { value: '2', label: 'Awards Won' },
              { value: '5+', label: 'Months QA Training' },
            ].map((s) => (
              <div key={s.label} className="glass-card stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SKILLS — enhanced
════════════════════════════════════════ */
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Technical Arsenal</span>
          <h2 className="section-title">Skills &amp; <span>Tools</span></h2>
          <div className="divider" />
        </div>

        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div
              key={cat.title}
              className={`skill-card reveal reveal-delay-${(i % 4) + 1}`}
              id={`skill-cat-${i}`}
              style={{ '--skill-color': cat.color, '--skill-glow': cat.glow }}
            >
              {/* Glow blob */}
              <div className="skill-card-glow" aria-hidden="true" />

              {/* Icon */}
              <div className="skill-icon-ring">
                <div className="skill-icon-svg" style={{ color: cat.color }}>
                  {cat.icon}
                </div>
              </div>

              <div className="skill-category-title">{cat.title}</div>

              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="skill-pill"
                    style={{ '--pill-color': tag.color }}
                  >
                    <span className="skill-pill-dot" aria-hidden="true" />
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Work Experience</span>
          <h2 className="section-title">Professional <span>Journey</span></h2>
          <div className="divider" />
        </div>
        <div className="experience-timeline">
          <div className="exp-item">
            <div className="exp-dot-wrapper">
              <div className="exp-dot">🧪</div>
            </div>
            <div className="glass-card exp-card reveal">
              <div className="exp-header">
                <div className="exp-role">QA / STQA Trainee</div>
                <span className="exp-period">May 2026 – Present</span>
              </div>
              <div className="exp-company">Center for Development of IT Professionals (CDIP), UIU · Madani Avenue, Dhaka</div>
              <p className="exp-desc">
                Completed a professional QA training program covering the end-to-end Software Testing Life Cycle (STLC). Gained hands-on experience in manual, API, database, and performance testing while applying SDLC, STLC, and Agile methodologies in practical scenarios. Built real-world automation projects using Playwright, Selenium, Postman, Newman, JavaScript, and performed performance testing using k6. Practiced defect tracking with Jira, designed test plans, executed test cases and test suites, performed database validation using SQL, and documented test results and defects using structured QA practices.
              </p>
              <div className="skill-tags">
                {['Playwright', 'Selenium', 'Postman', 'Newman', 'Jira', 'STLC', 'Agile', 'API Testing', 'Database Testing', 'K6', 'JavaScript', 'SQL', 'Manual Testing', 'Performance Testing'].map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   PROJECTS
════════════════════════════════════════ */
function Projects() {
  const [activeTab, setActiveTab] = useState('sqa');
  const [expanded, setExpanded] = useState(false);

  const filtered = PROJECTS.filter((p) => p.category === activeTab);
  const displayed = expanded ? filtered : filtered.slice(0, 3);

  const counts = {
    sqa: PROJECTS.filter((p) => p.category === 'sqa').length,
    ml:  PROJECTS.filter((p) => p.category === 'ml').length,
    web: PROJECTS.filter((p) => p.category === 'web').length,
  };

  const activeMeta = CATEGORIES.find((c) => c.id === activeTab);

  // Reset expanded state when changing tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setExpanded(false);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-subtitle">
            17 real-world projects spanning QA automation, ML research, and full-stack development.
          </p>
          <div className="divider" />
        </div>

        {/* Category Tabs */}
        <div className="project-tabs reveal" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={activeTab === cat.id}
              className={`project-tab${activeTab === cat.id ? ' project-tab-active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
            >
              <span className="project-tab-emoji" aria-hidden="true">{cat.emoji}</span>
              {cat.label}
              <span className="project-tab-count">{counts[cat.id]}</span>
            </button>
          ))}
        </div>

        {/* Active category label */}
        <div className="category-divider-line" style={{ marginBottom: '1.75rem' }}>
          <span className="category-divider-label">
            {activeMeta?.emoji} {activeMeta?.label}
          </span>
        </div>

        <div key={activeTab} className="projects-grid" role="tabpanel">
          {displayed.map((p, i) => (
            <article
              key={p.title}
              className="glass-card project-card project-card-animated"
              style={{ animationDelay: `${i * 0.08}s` }}
              id={`project-${p.category}-${i}`}
            >
              <div className="project-top">
                <span className="project-icon" aria-hidden="true">{p.icon}</span>
                <div className="project-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" aria-label={`GitHub repo for ${p.title}`}><IconGitHub /></a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link-btn" aria-label={`Live site for ${p.title}`}><IconExternal /></a>
                  )}
                </div>
              </div>
              <div className="project-meta">
                <span className="project-period">{p.period}</span>
                <span className={`project-badge project-badge-${p.category}`}>{p.badge}</span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => <span key={t} className="tech-tag">{t}</span>)}
              </div>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-site-btn"
                  aria-label={`Visit live site for ${p.title}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                  🚀 Live Site
                </a>
              )}
              {p.report && (
                <a
                  href={p.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="report-btn"
                  aria-label={`View test case report for ${p.title}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <line x1="10" y1="9" x2="8" y2="9"/>
                  </svg>
                  View Test Case Report
                </a>
              )}
            </article>
          ))}
        </div>

        {!expanded && filtered.length > 3 && (
          <div className="view-all-projects-container reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button onClick={() => setExpanded(true)} className="hero-btn primary-btn" style={{ cursor: 'pointer', fontFamily: 'inherit', border: 'none' }}>
              View More {activeMeta?.label} Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   EDUCATION
════════════════════════════════════════ */
function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title"><span>Education</span></h2>
          <div className="divider" />
        </div>
        <div className="glass-card education-card reveal" id="education-card">
          <div className="edu-icon">🎓</div>
          <div>
            <div className="edu-degree">B.Sc. in Computer Science &amp; Engineering</div>
            <div className="edu-uni">United International University (UIU)</div>
            <div className="edu-period">Mar 2022 – Jul 2026 · Dhaka, Bangladesh</div>
            <div className="edu-gpa"><span>⭐ CGPA</span><strong>3.57 / 4.00</strong></div>
            <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Data Science','Machine Learning','NLP','Software Engineering','Database Systems','Computer Security','Digital Image Processing'].map((c) => (
                <span key={c} className="tech-tag cyan">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   HONORS
════════════════════════════════════════ */
function Honors() {
  const awards = [
    { 
      emoji: '🏆', 
      title: 'Champion', 
      event: 'UIU CSE Project Show – Fall 2024', 
      detail: 'System Analysis & Design (SAD Lab) · December 2024', 
      evidence: 'https://drive.google.com/drive/folders/1M-7cGar7w_iZjZY-rodbQFIV7NQWFiKc?usp=drive_link',
      image: '/certificate_Champion.jpeg'
    },
    { 
      emoji: '🥈', 
      title: '2nd Runner-Up', 
      event: 'UIU CSE Project Show – Summer 2024', 
      detail: 'Advanced Object-Oriented Programming (AOOP) · October 2024', 
      evidence: 'https://drive.google.com/drive/folders/1yR6fz0gbsrZO0wzXYtIkgDmCKXhGaJsC?usp=drive_link',
      image: '/Certificate_2ndRunnersUp.jpeg'
    },
  ];
  return (
    <section id="honors" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Recognition</span>
          <h2 className="section-title">Honors &amp; <span>Awards</span></h2>
          <div className="divider" />
        </div>
        <div className="honors-grid">
          {awards.map((a, i) => (
            <div key={a.title} className={`glass-card honor-card reveal reveal-delay-${i + 1}`} id={`honor-${i}`}>
              <div className="honor-emoji">{a.emoji}</div>
              <div className="honor-title">{a.title}</div>
              <div className="honor-event">{a.event}</div>
              <div className="honor-detail">{a.detail}</div>
              
              {a.image && (
                <div style={{ marginTop: '1rem', width: '100%' }}>
                  <img 
                    src={a.image} 
                    alt={`${a.title} Certificate`} 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      borderRadius: '8px', 
                      border: '1px solid var(--clr-border)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }} 
                  />
                </div>
              )}

              {a.evidence && (
                <div style={{ marginTop: '1.25rem' }}>
                  <a href={a.evidence} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                    View Evidence <IconExternal />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let&apos;s <span>Connect</span></h2>
          <div className="divider" />
        </div>
        <div className="contact-wrapper reveal">
          <p className="contact-desc">
            I&apos;m actively seeking opportunities as a{' '}
            <strong style={{ color: 'var(--clr-violet-light)' }}>Junior SQA Engineer</strong>,
            QA Automation Engineer, or Software Testing Intern. Whether you have a project,
            an opportunity, or just want to say hi — my inbox is always open!
          </p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/md-khademul-islam-nahin-196200254/" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-linkedin"><IconLinkedIn />LinkedIn</a>
            <a href="https://github.com/Nahin197" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-github"><IconGitHub />GitHub</a>
            <a href="https://www.facebook.com/nahin197" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-facebook"><IconFacebook />Facebook</a>
            <a href="https://wa.me/8801750454515" target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-whatsapp"><IconWhatsApp />WhatsApp</a>
            <a href="mailto:khademulislam.nahin05@gmail.com" className="contact-link" id="contact-email"><IconEmail />Email Me</a>
            <a href={CV_DOWNLOAD_LINK} download="Nahin_CV.pdf" className="contact-link" id="contact-cv"><IconDownload />Download CV</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">© {new Date().getFullYear()} <span>Md. Khademul Islam Nahin</span>.</p>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════ */
export default function Page() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Honors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
