import { Sparkles } from "lucide-react";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

interface VisualItem {
  objectImage: string;
  objectAlt: string;
  title: string;
}

interface WorkVisualProps {
  item: VisualItem;
  className?: string;
  eager?: boolean;
  interactive?: boolean;
}

type VisualStyle = CSSProperties & Record<"--rotate-x" | "--rotate-y" | "--glow-x" | "--glow-y", string>;

export function WorkVisual({ item, className = "", eager = false, interactive = false }: WorkVisualProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const [isNudged, setIsNudged] = useState(false);

  const moveObject = (event: PointerEvent<HTMLDivElement>) => {
    if (!visualRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = visualRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    visualRef.current.style.setProperty("--rotate-x", `${(0.5 - y) * 8}deg`);
    visualRef.current.style.setProperty("--rotate-y", `${(x - 0.5) * 12}deg`);
    visualRef.current.style.setProperty("--glow-x", `${x * 100}%`);
    visualRef.current.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const resetObject = () => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty("--rotate-x", "0deg");
    visualRef.current.style.setProperty("--rotate-y", "0deg");
    visualRef.current.style.setProperty("--glow-x", "50%");
    visualRef.current.style.setProperty("--glow-y", "50%");
  };

  return (
    <div
      ref={visualRef}
      className={`work-visual work-visual-3d relative aspect-video overflow-hidden bg-[#fbfbfd] ${isNudged ? "is-nudged" : ""} ${className}`}
      style={{
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
        "--glow-x": "50%",
        "--glow-y": "50%",
      } as VisualStyle}
      onPointerMove={moveObject}
      onPointerLeave={resetObject}
      onAnimationEnd={(event) => {
        if (event.animationName === "work-object-nudge") setIsNudged(false);
      }}
    >
      {/* ── Apple-style ambient specular highlight ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-60 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.8) 0%, rgba(245,245,247,0.2) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ── Product Mockup Image (MacBook Pro) ── */}
      <div className="relative z-[2] h-full w-full overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: "perspective(1200px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(1.02, 1.02, 1.02)",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={item.objectImage}
          alt={item.objectAlt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      {/* ── Bottom HUD Badges (Apple-style clean) ── */}
      <div className="pointer-events-none absolute inset-x-5 bottom-5 z-[3] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#86868b]">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" /> Product Showcase · MacBook Pro
        </span>
        <span className="hidden sm:block rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-xl">
          Move to explore
        </span>
      </div>

      {/* ── Nudge Button (Interactive mode) ── */}
      {interactive ? (
        <button
          type="button"
          onClick={() => setIsNudged(true)}
          className="absolute right-5 top-5 z-[3] inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-3 py-2 text-xs font-medium text-[#1d1d1f] shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
          aria-label={`Nudge the ${item.title} object`}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" /> Nudge 3D
        </button>
      ) : null}
    </div>
  );
}
