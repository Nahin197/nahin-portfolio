'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */

const TYPED_STRINGS = [
  'Jr. SQA Automation Engineer',
  'Playwright & Postman Expert',
  'API Testing Specialist',
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
      { name: 'PHP', color: '#8892bf' },
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
      { name: 'Next.js', color: '#ffffff' },
      { name: 'Laravel', color: '#ff2d20' },
      { name: 'HTML5', color: '#e34f26' },
      { name: 'CSS3', color: '#1572b6' },
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

const CATEGORIES = [
  { id: 'sqa', label: 'SQA & Testing', emoji: '🧪' },
  { id: 'ml', label: 'Machine Learning', emoji: '🤖' },
  { id: 'web', label: 'Web Development', emoji: '🌐' },
];

const PROJECTS = [
  /* ── SQA ── */
  {
    category: 'sqa',
    icon: '🎪',
    title: 'EverShop E-Commerce — E2E UI Automation with Playwright',
    period: 'Sep 2026',
    badge: 'E2E UI Automation',
    desc: 'Professional E2E UI automation suite for EverShop using Playwright & a two-layer POM (Objects.js + Actions.js). Automates Registration, Login, Logout, Product Search, and Add-to-Cart. Allure reports with screenshot/video on failure, ordered project dependencies, cross-browser & CI-ready.',
    tags: ['Playwright', 'JavaScript ES6+', 'Allure', 'Node.js', 'POM'],
    github: 'https://github.com/Nahin197/demoEvershop-automation-testing',
  },
  {
    category: 'sqa',
    icon: '🛒',
    title: 'E-Commerce API Automation Testing — EverShop',
    period: 'Oct 2026',
    badge: 'API Automation',
    desc: 'End-to-end API automation for EverShop: Product Search → View Cart → Add to Cart → Verify Cart → Delete Item → Bulk Cleanup. 6 chained requests (GET/POST/DELETE), 13 assertions, Math.random() dynamic data, arithmetic assertion (pre_qty + added_qty = post_qty), try/catch for empty cart, pm.sendRequest bulk loop.',
    tags: ['Postman', 'Newman', 'JavaScript ES6', 'REST API', 'HTMLExtra'],
    github: 'https://github.com/Nahin197/demoEverShop-api-automation-testing',
  },
  {
    category: 'sqa',
    icon: '🎭',
    title: 'CartUp E-Commerce E2E Automation Framework',
    period: 'Sep 2026',
    badge: 'E2E Automation',
    desc: 'Professional E2E framework for CartUp (cartup.com) using Playwright & POM. Automates full shopping flow: Login → Search → Product Selection → Add to Cart → Checkout. 5 page classes, cross-browser (Chromium/Firefox/WebKit), test.step(), screenshot-on-failure, trace collection, auto-retry & parallel CI/CD.',
    tags: ['Playwright', 'Node.js', 'JavaScript', 'POM', 'HTML Reporter'],
    github: 'https://github.com/Nahin197/cartup-ecommerce-automation-testing',
  },
  {
    category: 'sqa',
    icon: '🍊',
    title: 'OrangeHRM E2E Automation with Playwright & POM',
    period: 'Aug 2026',
    badge: 'E2E Automation',
    desc: '10-step employee lifecycle: Admin login → PIM navigation → Add Employee → Save → Logout → New employee login → Name verification → Logout. 4 page classes (LoginPage, DashboardPage, PimPage, AddEmployeePage), reusable randomData.js, cross-browser, GitHub Actions CI/CD, built-in HTML reporter.',
    tags: ['Playwright v1.62', 'JavaScript ES Modules', 'Node.js', 'GitHub Actions', 'POM'],
    github: 'https://github.com/Nahin197/orangehrm-automation-testing',
  },
  {
    category: 'sqa',
    icon: '👟',
    title: 'Manual & API Testing — Shoe-Selling E-Commerce (EverShop)',
    period: 'Jul 2026',
    badge: 'Manual + API',
    desc: '10 client requirement questions, 25 manual test cases, 22 executed (77.27% pass rate), 4 detailed bug reports. Full Happy Path: Search → Product Selection → Add to Cart (3 variants) → Cart Verification ($255). Bugs: SKU search, autocomplete, typo tolerance, search history. 9 Postman requests (GET/POST/PATCH/DELETE).',
    tags: ['Postman', 'Manual Testing', 'Bug Reporting', 'API Testing'],
    github: 'https://github.com/Nahin197/Shoe-Selling-E-Commerce-Platform-Manual-API-Testing-Assessment',
  },
  {
    category: 'sqa',
    icon: '🏆',
    title: 'Mock Competitive Programming API — System Testing & Bug Discovery',
    period: 'Oct 2025',
    badge: 'System Testing',
    desc: 'Comprehensive system testing on a mock CP REST API (Node.js + Express) covering JWT auth, contests, problems, submissions, and leaderboard. Test plan for 20+ endpoints with input/output partitioning, boundary analysis, happy path, auth/role checks, time-based logic & data consistency. Bugs reported with Blocker/Major/Minor severity.',
    tags: ['Postman', 'JWT', 'Node.js', 'Express', 'REST API Testing'],
    github: 'https://github.com/Nahin197/Mock-Competitive-Programming-API-Testing-by-Postman',
    report: 'https://drive.google.com/file/d/1_cP1kfBv4zMsr9i53_1B8Uw-U2X-TKCi/view?usp=drive_link',
  },
  {
    category: 'sqa',
    icon: '🅿️',
    title: 'Parking Slot Booking System — Unit Testing & QA (JUnit 5)',
    period: 'Oct 2025',
    badge: 'Unit Testing',
    desc: 'JUnit 5 unit tests for all core modules: Wallet, Vehicle, ParkingSlot, Booking, ParkingSystem. Identified 6+ intentional defects: missing null validations, negative value acceptance, MICROCAR pricing bug, illegal booking state transitions. Documented expected vs. actual behavior, analyzed pricing models, booking lifecycle (ACTIVE→COMPLETED/CANCELLED), and time-window overlap detection.',
    tags: ['Java 17', 'JUnit 5', 'IntelliJ IDEA', 'Git & GitHub', 'SQA'],
    github: 'https://github.com/Nahin197/SQA-unit-Testing-Assignment-Solving',
    report: 'https://drive.google.com/file/d/1LfmjJBQvHKTpEdjYXu3LhkV48UNMIoaO/view?usp=drive_link',
  },
  /* ── Machine Learning ── */
  {
    category: 'ml',
    icon: '🛸',
    title: 'Benchmarking Small-Object Detection on Aerial Imagery (VisDrone)',
    period: 'Jun 2026',
    badge: 'ML Research',
    desc: 'Systematic benchmarking of 6 detection architectures (GOLD-YOLO, DAMO-YOLO, NanoDet-Plus, D-FINE, YOLOv12n, RF-DETR) on VisDrone2019-DET. SAHI sliced inference, IEEE paper.',
    tags: ['Python', 'YOLO', 'SAHI', 'PyTorch', 'IEEE Paper'],
    github: 'https://github.com/Nahin197/small-object-detection-visdrone-benchmark',
  },
  {
    category: 'ml',
    icon: '🏥',
    title: 'Medical Data Mining — Dimensionality Reduction & Clustering',
    period: 'Jan 2026',
    badge: 'ML / Data Mining',
    desc: 'Unsupervised ML pipeline on 4 medical datasets (Diabetes, Heart Disease, Hepatitis, CKD). Benchmarks PCA/t-SNE/UMAP × K-Means/DBSCAN/HDBSCAN. Cluster labels as features for XGBoost/RF with 5-Fold CV.',
    tags: ['Python', 'Scikit-learn', 'UMAP', 'HDBSCAN', 'XGBoost'],
    github: 'https://github.com/Nahin197/Medical-Data-Mining-Dimensionality-Reduction-Clustering-Analysis',
  },
  {
    category: 'ml',
    icon: '⚡',
    title: 'Energy-Accuracy Trade-offs of Small Language Models',
    period: 'Nov 2025',
    badge: 'Green AI Research',
    desc: 'Empirical benchmarking of 17 SLMs (270M–7B params). Used CodeCarbon for CO₂ measurement. Found 18× energy reduction choosing Qwen2.5-0.5B over Mistral-7B with only ~10% accuracy trade-off.',
    tags: ['Python', 'HuggingFace', 'CodeCarbon', 'Google Colab', 'LaTeX'],
    github: 'https://github.com/Nahin197/A-Deep-Dive-into-the-Energy-Accuracy-Trade-offs-of-Small-Language-Models-Green-Computing',
  },
  {
    category: 'ml',
    icon: '🗣️',
    title: 'Bangla Dialect Normalization Using Transformer Models',
    period: 'Nov 2025',
    badge: 'NLP Research',
    desc: '18,920 aligned sentence pairs across 5 Bangla dialects. Fine-tuned BanglaT5, NLLB-200, mBART-50, Small100. BanglaT5 achieved best avg BLEU of 56.04, peaking at 77.53 for Mymensingh.',
    tags: ['Python', 'HuggingFace', 'PyTorch', 'SacreBLEU', 'NLP'],
    github: 'https://github.com/Nahin197/bangla-dialect-normalization-Machine-Learning',
  },
  /* ── Web Development ── */
  {
    category: 'web',
    icon: '🏆',
    title: 'CholoSave — Collaborative Group Savings Platform (Champion 🥇)',
    period: 'May 2025',
    badge: 'Full-Stack · Champion',
    desc: '🏆 Champion at UIU CSE Project Show – Fall 2024. Group savings, DPS plans, AI financial advisor (LLaMA), democratic voting, bKash/Nagad payments, real-time chat, community forum.',
    tags: ['PHP', 'MySQL', 'Python Flask', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/Nahin197/Cholosave--System-Alanysis-Design-Course-Project',
  },
  {
    category: 'web',
    icon: '💸',
    title: 'CrediFlow — P2P Lending & Crowdfunding Platform',
    period: 'Nov 2025',
    badge: 'Full-Stack',
    desc: 'Full-stack P2P lending platform connecting borrowers and lenders. Digital wallet, crowdfunding campaigns, role-based dashboards, Google OAuth (Firebase), real-time notifications, payment gateway concepts.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Firebase'],
    github: 'https://github.com/Nahin197/Crediflow-Web-Programming-Course-Project',
  },
  {
    category: 'web',
    icon: '🔐',
    title: 'Security Implementation on CholoSave',
    period: 'Nov 2025',
    badge: 'Security',
    desc: 'Multi-layered security model: Argon2id hashing, 2FA (OTP via email), SQL Injection prevention (prepared statements), XSS/CSRF protection, RBAC, CAPTCHA, rate limiting, security audit logging.',
    tags: ['PHP', 'MySQL', 'Tailwind CSS', 'Argon2id', '2FA', 'RBAC'],
    github: 'https://github.com/Nahin197/CholoSave-Security-Implementaion-CS-Course-',
  },
  {
    category: 'web',
    icon: '🎨',
    title: 'Virtual Art Gallery — JavaFX Art Marketplace (2nd Runner-Up 🥈)',
    period: 'Mar 2025',
    badge: 'Desktop App',
    desc: '🥈 2nd Runner-Up at UIU CSE Project Show – Summer 2024. Full marketplace with live auctions, NFT trading, real-time chat (Java Sockets), multi-role system (Guest/Customer/Artist/Admin), MVC architecture.',
    tags: ['Java', 'JavaFX', 'MySQL', 'JDBC', 'Maven', 'Multithreading'],
    github: 'https://github.com/Nahin197/Virtual-Art-Gallery-AOOP-Course-project',
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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="navbar" style={scrolled ? { background: 'rgba(3,7,18,0.95)' } : {}} role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        <a href="#hero" className="navbar-logo" id="nav-logo">Nahin.dev</a>
        <div className="navbar-links">
          {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="navbar-link" id={`nav-${s.toLowerCase()}`}>{s}</a>
          ))}
        </div>
        <a href={CV_DOWNLOAD_LINK} download="Nahin_CV.pdf" className="btn btn-primary navbar-cta" id="nav-cv-btn">
          <IconDownload /> Resume
        </a>
      </div>
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
              Beyond QA, I have a solid foundation in C++, Java, Python, PHP, and JavaScript —
              enabling me to understand both frontend and backend systems during testing.
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
                Professional QA training program covering end-to-end software testing life cycle.
                Built real-world automation projects using Playwright, Postman, Newman, and
                JavaScript. Applied SDLC, STLC, and Agile methodologies in practical settings.
                Designed test plans, executed test suites, and reported defects with structured documentation.
              </p>
              <div className="skill-tags">
                {['Playwright', 'Postman', 'Newman', 'Jira', 'STLC', 'Agile', 'API Testing'].map((t) => (
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

  const filtered = PROJECTS.filter((p) => p.category === activeTab);

  const counts = {
    sqa: PROJECTS.filter((p) => p.category === 'sqa').length,
    ml:  PROJECTS.filter((p) => p.category === 'ml').length,
    web: PROJECTS.filter((p) => p.category === 'web').length,
  };

  const activeMeta = CATEGORIES.find((c) => c.id === activeTab);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-subtitle">
            15 real-world projects spanning QA automation, ML research, and full-stack development.
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

        {/*
          key={activeTab} forces React to fully remount the grid on every tab
          switch — this replays the CSS card-enter animation for all new cards
          without needing IntersectionObserver (which fires only once).
        */}
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
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" aria-label={`View ${p.title}`}><IconExternal /></a>
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
    { emoji: '🏆', title: 'Champion', event: 'UIU CSE Project Show – Fall 2024', detail: 'System Analysis & Design (SAD Lab) · December 2024' },
    { emoji: '🥈', title: '2nd Runner-Up', event: 'UIU CSE Project Show – Summer 2024', detail: 'Advanced Object-Oriented Programming (AOOP) · October 2024' },
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
        <p className="footer-text">© {new Date().getFullYear()} <span>Md. Khademul Islam Nahin</span>. Built with <span>Next.js</span> &amp; deployed on <span>Vercel</span>.</p>
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
