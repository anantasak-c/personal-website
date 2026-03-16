import { useEffect, useRef, useState, useCallback } from "react";

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

/* ─── Particle Network Background (Canvas) ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const COLORS = ["#00f0ff", "#ff00ff", "#8b5cf6", "#00f0ff"];
  const PARTICLE_COUNT = 70;
  const CONNECT_DIST = 150;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    init();

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="landing-particles-canvas"
      aria-hidden="true"
    />
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
      {/* macOS title bar with neon dots */}
      <div className="landing-card-bar">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
      </div>

      {/* Card body */}
      <div className="landing-card-body">
        <h3 className="landing-card-title">{title}</h3>
        <p className="landing-card-desc">{description}</p>
      </div>
    </a>
  );
}

/* ─── Main Landing Page ─── */
export function LandingPage() {
  const subtitleText = '| ANAN /A-NAN/ > (N.) THAI ORIGIN, MEANING INFINITY. DISCOVER MY ENDLESS, TECH-DRIVEN USE CASES.';
  const { displayed, done } = useTypewriter(subtitleText, 35, 800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.classList.add("landing-loaded");
  }, []);

  return (
    <div ref={containerRef} className="landing-root">
      {/* Particle network background */}
      <ParticleNetwork />

      {/* Scanline overlay */}
      <div className="landing-scanlines" aria-hidden="true" />

      {/* Grid background */}
      <div className="landing-grid-bg" aria-hidden="true" />

      {/* Hex pattern overlay */}
      <div className="landing-hex-overlay" aria-hidden="true" />

      {/* ─── Header / Logo ─── */}
      <header className="landing-header">
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
        <a href="/portfolio" className="landing-portfolio-link group">
          <span className="landing-arrow">▶</span>
          <span>VIEW PORTFOLIO</span>
        </a>
      </footer>
    </div>
  );
}
