import { useEffect, useRef, useState } from "react";
import { Lightbulb, Pause, Play, Sparkles, Waves } from "lucide-react";
import { GradientWaves } from "@/components/reactbits/GradientWaves";
import { Spotlight } from "@/components/ui/spotlight-new";

export type BackgroundMode = "gradient-waves" | "spotlight" | "sci-fi-wave" | "quantum-orb" | "cinematic-video" | "pure-minimal";

interface BackgroundVideoProps {
  src?: string;
  poster?: string;
  opacity?: number;
  showControls?: boolean;
}

export function BackgroundVideo({
  src = "/videos/cinematic-apple-keynote.mp4",
  poster = "/media/backgrounds/neural-wave.jpg",
  opacity = 0.45,
  showControls = true,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bgMode, setBgMode] = useState<BackgroundMode>("gradient-waves");
  const [hasReducedMotion, setHasReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hasReducedMotion || !isPlaying || bgMode !== "cinematic-video") {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsLoaded(true))
        .catch(() => undefined);
    }
  }, [hasReducedMotion, isPlaying, bgMode]);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const cycleBgMode = () => {
    setBgMode((prev) => {
      if (prev === "gradient-waves") return "spotlight";
      if (prev === "spotlight") return "sci-fi-wave";
      if (prev === "sci-fi-wave") return "quantum-orb";
      if (prev === "quantum-orb") return "cinematic-video";
      if (prev === "cinematic-video") return "pure-minimal";
      return "gradient-waves";
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#fbfbfd]">
      {/* ── 1. Official React Bits WebGL2 Gradient Waves (Clean Apple White & Blue) ── */}
      {bgMode === "gradient-waves" && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <GradientWaves
            horizonColor="#F5F5F7"
            waveColor="#0071E3"
            crestColor="#FFFFFF"
            speed={isPlaying ? 0.3 : 0}
            amplitude={2.8}
            waveScale={0.4}
            waveRatio={1.2}
            swell={30}
            turbulence={18}
            tilt={1.11}
            zoom={1.2}
            height={5.5}
            fogDepth={18}
            detail="medium"
            brightness={1.0}
            opacity={0.45}
            mouseInteraction={true}
            parallaxStrength={0.5}
            grain={true}
            grainIntensity={0.02}
            className="h-full w-full"
          />

          {/* Apple porcelain frosted mask ensuring 100% typography legibility */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(251,251,253,0.72) 0%, rgba(251,251,253,0.12) 30%, rgba(251,251,253,0.08) 70%, rgba(251,251,253,0.85) 100%)",
            }}
          />

          {/* Delicate micro-grid */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
      )}

      {/* ── 2. Aceternity UI Spotlight New Background Mode ── */}
      {bgMode === "spotlight" && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <Spotlight
            gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(0, 113, 227, 0.16) 0, rgba(0, 113, 227, 0.04) 50%, rgba(0, 113, 227, 0) 80%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(41, 151, 255, 0.14) 0, rgba(41, 151, 255, 0.03) 80%, transparent 100%)"
            gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(0, 199, 190, 0.10) 0, rgba(0, 199, 190, 0.02) 80%, transparent 100%)"
            translateY={-300}
            width={600}
            height={1400}
            smallWidth={260}
            duration={7}
            xOffset={120}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(circle at 50% 20%, rgba(251,251,253,0.1) 0%, rgba(251,251,253,0.8) 70%, #fbfbfd 100%)",
            }}
          />
        </div>
      )}

      {/* ── 3. Minimal Sci-Fi Neural Wave Backdrop ── */}
      {bgMode === "sci-fi-wave" && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
            src="/media/backgrounds/neural-wave.jpg"
            alt="Minimal Sci-Fi Neural Wave"
            className="h-full w-full object-cover object-center animate-float-slow scale-105"
            style={{
              opacity: 0.52,
              filter: "saturate(1.15) contrast(1.02) brightness(1.03)",
            }}
          />
        </div>
      )}

      {/* ── 4. Quantum Orb Sci-Fi Backdrop ── */}
      {bgMode === "quantum-orb" && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
            src="/media/backgrounds/quantum-orb.jpg"
            alt="Minimal Sci-Fi Quantum Core"
            className="h-full w-full object-cover object-center animate-pulse-soft scale-105"
            style={{
              opacity: 0.48,
              filter: "saturate(1.2) contrast(1.05) brightness(1.02)",
            }}
          />
        </div>
      )}

      {/* ── 5. Cinematic Video Backdrop (Keynote Video) ── */}
      {bgMode === "cinematic-video" && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 mix-blend-multiply ${
            isLoaded && isPlaying ? "opacity-100" : "opacity-0"
          }`}
          style={{
            opacity: isLoaded && isPlaying ? opacity : 0,
            filter: "saturate(1.2) contrast(1.08) brightness(1.06)",
            transform: "scale(1.05)",
          }}
        />
      )}

      {/* ── 6. Subtle Ambient Caustic Light Refractions (for other modes) ── */}
      {bgMode !== "gradient-waves" && bgMode !== "spotlight" && (
        <div
          className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage: `
              radial-gradient(circle at 18% 22%, rgba(0, 113, 227, 0.16) 0%, transparent 45%),
              radial-gradient(circle at 82% 75%, rgba(41, 151, 255, 0.12) 0%, transparent 45%),
              radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)
            `,
          }}
        />
      )}

      {/* ── 7. Apple Light Vignette Mask (for other modes) ── */}
      {bgMode !== "gradient-waves" && bgMode !== "spotlight" && (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 32%, rgba(251, 251, 253, 0.25) 0%, rgba(251, 251, 253, 0.82) 65%, #fbfbfd 100%),
              linear-gradient(to bottom, rgba(251, 251, 253, 0.15) 0%, rgba(251, 251, 253, 0.75) 60%, #fbfbfd 100%)
            `,
          }}
        />
      )}

      {/* ── 8. Ambient Minimal Switcher Controls ── */}
      {showControls && (
        <div className="pointer-events-auto absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/85 p-1 shadow-sm backdrop-blur-2xl transition hover:border-black/20 hover:bg-white sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={cycleBgMode}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1d1d1f] transition hover:bg-black/[0.04]"
            title="Switch Background Theme"
          >
            {bgMode === "gradient-waves" && <Waves className="h-3 w-3 text-[#0071e3]" />}
            {bgMode === "spotlight" && <Lightbulb className="h-3 w-3 text-[#0071e3]" />}
            {bgMode !== "gradient-waves" && bgMode !== "spotlight" && <Sparkles className="h-3 w-3 text-[#0071e3]" />}
            <span>
              {bgMode === "gradient-waves" && "React Bits Gradient Waves"}
              {bgMode === "spotlight" && "Spotlight (Aceternity UI)"}
              {bgMode === "sci-fi-wave" && "Sci-Fi Wave"}
              {bgMode === "quantum-orb" && "Quantum Orb"}
              {bgMode === "cinematic-video" && "Keynote Video"}
              {bgMode === "pure-minimal" && "Pure White"}
            </span>
          </button>

          {(bgMode === "cinematic-video" || bgMode === "gradient-waves") && (
            <button
              type="button"
              onClick={togglePlayback}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#86868b] transition hover:bg-black/[0.04] hover:text-[#1d1d1f]"
              aria-label={isPlaying ? "Pause ambient motion" : "Play ambient motion"}
              title={isPlaying ? "Pause Motion" : "Play Motion"}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 text-[#0071e3]" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
