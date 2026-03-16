import { useEffect, useRef, useState } from "react";

/* ─── Typewriter Hook ─── */
function useTypewriter(text: string, speed = 50, startDelay = 1200) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ─── Use Case Data ─── */
const useCases = [
  {
    id: 1,
    title: "USE CASE 1",
    description: "Automation & Workflow — Building intelligent n8n pipelines, personal finance bots, and AI-powered assistants.",
    href: "#",
  },
  {
    id: 2,
    title: "USE CASE 2",
    description: "Data & Analytics — Transforming raw data into actionable insights with Python, SQL, Tableau, and Looker.",
    href: "#",
  },
  {
    id: 3,
    title: "USE CASE 3",
    description: "Web & Creative Dev — Crafting modern web experiences with React, Sanity CMS, and cutting-edge design.",
    href: "#",
  },
];

/* ─── Animated Infinity SVG ─── */
function InfinitySVG() {
  return (
    <svg
      className="landing-infinity-svg"
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#00f0ff" floodOpacity="0.7" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M50 50 C50 20, 10 20, 10 50 C10 80, 50 80, 50 50 C50 20, 90 20, 90 50 S150 80, 150 50 S190 20, 150 20 C130 20, 110 35, 100 50 C90 65, 70 80, 50 50"
        stroke="url(#infinityGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#neonGlow)"
        className="landing-infinity-path"
      />
      <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="50%" stopColor="#ff00ff" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </svg>
  );
}

/* ─── Use Case Card ─── */
function UseCaseCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="landing-card group"
    >
      {/* Terminal dots */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" />
        <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
        <span className="ml-auto text-xs text-cyan-400/50 font-mono">&#47;&#47; {title.toLowerCase()}</span>
      </div>

      <h3 className="landing-card-title">{title}</h3>
      <p className="landing-card-desc">{description}</p>

      <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-mono text-cyan-400/70 group-hover:text-cyan-300 transition-colors">
        <span className="landing-blink">▶</span> EXPLORE
      </div>
    </a>
  );
}

/* ─── Main Landing Page ─── */
export function LandingPage() {
  const subtitleText = '| ANAN /A-NAN/ > (N.) THAI ORIGIN, MEANING INFINITY. DISCOVER MY ENDLESS, TECH-DRIVEN USE CASES.';
  const { displayed, done } = useTypewriter(subtitleText, 35, 800);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scanline + grid animation on mount
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.classList.add("landing-loaded");
  }, []);

  return (
    <div ref={containerRef} className="landing-root">
      {/* Scanline overlay */}
      <div className="landing-scanlines" aria-hidden="true" />

      {/* Grid background */}
      <div className="landing-grid-bg" aria-hidden="true" />

      {/* ─── Header / Logo ─── */}
      <header className="landing-header">
        {/* Infinity SVG behind title */}
        <div className="landing-infinity-wrap">
          <InfinitySVG />
        </div>

        {/* Main title */}
        <h1 className="landing-title" data-text="ANAN">
          ANAN
        </h1>

        {/* Subtitle with typewriter */}
        <p className="landing-subtitle">
          {displayed}
          <span className={`landing-cursor ${done ? "landing-blink" : ""}`}>_</span>
        </p>
      </header>

      {/* ─── Use Case Cards ─── */}
      <section className="landing-cards-section">
        {useCases.map((uc) => (
          <UseCaseCard key={uc.id} {...uc} />
        ))}
      </section>

      {/* ─── Footer ─── */}
      <footer className="landing-footer">
        <a href="/" className="landing-portfolio-link group">
          <span className="landing-arrow">▶</span>
          <span>VIEW PORTFOLIO</span>
        </a>
      </footer>
    </div>
  );
}
