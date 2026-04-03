import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

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
    title: "OPENCLAW INSTALL",
    description: "OpenClaw 1-Click Installation via AI — รัน OpenClaw Agent ในเครื่องคุณแบบอัตโนมัติ ไม่ต้องปวดหัวกับ Terminal เลยสักบรรทัด",
    href: "/openclaw-guide",
    icon: "🪄",
  },
  {
    id: 2,
    title: "Show Case",
    description: "A curated feed of selected product demos, automation flows, and visual prototypes presented in a clean white reading experience.",
    href: "/showcase",
    icon: "◈",
  },
  {
    id: 3,
    title: "My Blog",
    description: "Articles, notes, and insights on AI, business, technology, and the things I am learning along the way.",
    href: "/blog",
    icon: "⬡",
  },
];

/* ─── Mouse-Interactive Particle Network (Canvas) ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  const COLORS = ["#00f0ff", "#ff00ff", "#8b5cf6", "#00f0ff", "#00d4ff"];
  const PARTICLE_COUNT = 90;
  const CONNECT_DIST = 160;
  const MOUSE_RADIUS = 200;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseSize = Math.random() * 2.5 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: baseSize,
        baseSize,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
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

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * 2;
          p.vx += (mdx / mDist) * force * 0.15;
          p.vy += (mdy / mDist) * force * 0.15;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Pulsing size
        p.pulse += p.pulseSpeed;
        p.size = p.baseSize + Math.sin(p.pulse) * 0.5;

        const alpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.18;
            // Color connections based on proximity to mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const toMouse = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
            const isNearMouse = toMouse < MOUSE_RADIUS * 1.5;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isNearMouse
              ? `rgba(255, 0, 255, ${opacity * 1.5})`
              : `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = isNearMouse ? 0.8 : 0.4;
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
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
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

/* ─── Floating Data Streams ─── */
function DataStreams() {
  const streams = useMemo(() => {
    const chars = "01001011010110100101011010011010アイウエオカキクケコ⟁⟐◇⬡".split("");
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      text: Array.from({ length: 8 + Math.floor(Math.random() * 12) }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join(" "),
      opacity: Math.random() * 0.06 + 0.02,
      size: Math.random() * 0.15 + 0.55,
    }));
  }, []);

  return (
    <div className="landing-data-streams" aria-hidden="true">
      {streams.map((s) => (
        <div
          key={s.id}
          className="landing-stream-col"
          style={{
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: s.opacity,
            fontSize: `${s.size}rem`,
          }}
        >
          {s.text}
        </div>
      ))}
    </div>
  );
}

/* ─── Use Case Card ─── */
function UseCaseCard({
  title,
  description,
  href,
  icon,
  index,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
  index: number;
}) {
  const isExternal = href.startsWith("http");
  const content = (
    <>
      {/* Animated neon border overlay */}
      <div className="landing-card-glow" aria-hidden="true" />
      {/* Terminal title bar */}
      <div className="landing-card-bar">
        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
        <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" />
        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
        <span className="ml-auto text-[0.6rem] text-cyan-500/40 font-mono tracking-widest">
          {title}
        </span>
      </div>
      {/* Card body */}
      <div className="landing-card-body">
        <div className="landing-card-icon">{icon}</div>
        <h3 className="landing-card-title">{title}</h3>
        <p className="landing-card-desc">{description}</p>
        <div className="landing-card-footer">
          <span className="landing-card-blink">▸</span>
          <span>EXPLORE</span>
        </div>
      </div>
    </>
  );

  if (isExternal) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="landing-card group"
      style={{ animationDelay: `${0.8 + index * 0.2}s` }}
    >
      {content}
    </a>
  );
  }

  return (
    <Link
      to={href}
      className="landing-card group"
      style={{ animationDelay: `${0.8 + index * 0.2}s` }}
    >
      {content}
    </Link>
  );
}

/* ─── Main Landing Page ─── */
export function LandingPage() {
  const subtitleText =
    "My name is Anantasak :ANAN /A-NAN/ > (N.) THAI ORIGIN, MEANING INFINITY. DISCOVER MY ENDLESS, TECH-DRIVEN USE CASES.";
  const { displayed, done } = useTypewriter(subtitleText, 45, 800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.classList.add("landing-loaded");
  }, []);

  return (
    <div ref={containerRef} className="landing-root">
      {/* Particle network background */}
      <ParticleNetwork />

      {/* Data streams */}
      <DataStreams />

      {/* Scanline overlay */}
      <div className="landing-scanlines" aria-hidden="true" />

      {/* Grid background */}
      <div className="landing-grid-bg" aria-hidden="true" />

      {/* Vignette overlay */}
      <div className="landing-vignette" aria-hidden="true" />

      {/* ─── Header ─── */}
      <header className="landing-header">
        {/* Status indicator */}
        <div className="landing-status">
          <span className="landing-status-dot" />
          <span>SYSTEM ONLINE</span>
        </div>

        {/* Neon decorative lines */}
        <div className="landing-title-deco" aria-hidden="true">
          <span className="landing-deco-line landing-deco-left" />
          <span className="landing-deco-diamond">◆</span>
          <span className="landing-deco-line landing-deco-right" />
        </div>

        {/* Main title */}
        <h1 className="landing-title" data-text="ANAN">
          ANAN
        </h1>

        {/* Decorative sub-line */}
        <div className="landing-title-deco" aria-hidden="true">
          <span className="landing-deco-line landing-deco-left" />
          <span className="landing-deco-diamond">◆</span>
          <span className="landing-deco-line landing-deco-right" />
        </div>

        {/* Subtitle with typewriter */}
        <p className="landing-subtitle">
          {displayed}
          <span className={`landing-cursor ${done ? "landing-blink" : ""}`}>
            _
          </span>
        </p>
      </header>

      {/* ─── Use Case Cards ─── */}
      <section className="landing-cards-section">
        {useCases.map((uc, i) => (
          <UseCaseCard key={uc.id} {...uc} index={i} />
        ))}
      </section>

      {/* ─── Footer ─── */}
      <footer className="landing-footer">
        <div className="landing-footer-line" aria-hidden="true" />
        <a href="/portfolio" className="landing-portfolio-link group">
          <span className="landing-arrow">▶</span>
          <span>About ME</span>
        </a>
      </footer>
    </div>
  );
}
