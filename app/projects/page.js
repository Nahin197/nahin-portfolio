'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, PROJECTS } from '../data/projects';

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('sqa');

  const filtered = PROJECTS.filter((p) => p.category === activeTab);

  const counts = {
    sqa: PROJECTS.filter((p) => p.category === 'sqa').length,
    ml:  PROJECTS.filter((p) => p.category === 'ml').length,
    web: PROJECTS.filter((p) => p.category === 'web').length,
  };

  const activeMeta = CATEGORIES.find((c) => c.id === activeTab);

  return (
    <main className="main-content">
      <nav className="navbar" style={{ background: 'rgba(3,7,18,0.95)' }}>
        <div className="container navbar-inner" style={{ justifyContent: 'flex-start' }}>
          <Link href="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      <section id="all-projects" className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">All Projects</span>
            <h1 className="section-title">Complete <span>Portfolio</span></h1>
            <p className="section-subtitle">
              Browse through my {PROJECTS.length} projects spanning QA automation, ML research, and full-stack development.
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
                onClick={() => setActiveTab(cat.id)}
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
            {filtered.map((p, i) => (
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
        </div>
      </section>
    </main>
  );
}
