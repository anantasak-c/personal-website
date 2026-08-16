import { useEffect, useRef, useState } from "react";

interface AppleGradientWavesProps {
  speed?: number;
  waveRatio?: number;
  interactive?: boolean;
  className?: string;
}

export function AppleGradientWaves({
  speed = 0.3,
  waveRatio = 3,
  interactive = true,
  className = "",
}: AppleGradientWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameRef = useRef<number | null>(null);
  const [hasReducedMotion, setHasReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMediaChange = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeHandler = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const effectiveAmp = 65 * (waveRatio / 3);

      // Base Apple Porcelain gradient
      const bgGrad = ctx.createRadialGradient(
        width * mouseX,
        height * mouseY * 0.9,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, "rgba(0, 113, 227, 0.04)");
      bgGrad.addColorStop(0.4, "rgba(41, 151, 255, 0.03)");
      bgGrad.addColorStop(0.75, "rgba(245, 245, 247, 0.3)");
      bgGrad.addColorStop(1, "rgba(251, 251, 253, 0.0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Layer 1: Ambient Royal Apple Blue Upper Wave ──
      ctx.save();
      ctx.beginPath();
      const baseBlueY = height * 0.46 + (mouseY - 0.5) * 50;
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 6) {
        const mouseMod = 1 + (1 - Math.abs(x - width * mouseX) / width) * 0.2;
        const y1 = Math.sin(x * 0.0019 + 0.5 + time * 0.008 * speed) * (effectiveAmp * 1.1) * mouseMod;
        const y2 = Math.cos(x * 0.0011 + 1.2 + time * 0.006 * speed) * (effectiveAmp * 0.4);
        const y = baseBlueY + y1 + y2 - 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const blueGrad = ctx.createLinearGradient(0, baseBlueY - 120, width, height);
      blueGrad.addColorStop(0, "rgba(0, 113, 227, 0.08)");
      blueGrad.addColorStop(0.4, "rgba(41, 151, 255, 0.05)");
      blueGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = blueGrad;
      ctx.fill();

      // Top blue highlight line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const mouseMod = 1 + (1 - Math.abs(x - width * mouseX) / width) * 0.2;
        const y1 = Math.sin(x * 0.0019 + 0.5 + time * 0.008 * speed) * (effectiveAmp * 1.1) * mouseMod;
        const y2 = Math.cos(x * 0.0011 + 1.2 + time * 0.006 * speed) * (effectiveAmp * 0.4);
        const y = baseBlueY + y1 + y2 - 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(0, 113, 227, 0.25)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // ── Layer 2: Electric Cyan & Pure White Light Core ──
      ctx.save();
      ctx.beginPath();
      const baseCyanY = height * 0.50 + (mouseY - 0.5) * 60;
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 6) {
        const mouseMod = 1 + (1 - Math.abs(x - width * mouseX) / width) * 0.25;
        const y1 = Math.sin(x * 0.0022 + 1.8 + time * 0.012 * speed) * (effectiveAmp * 1.2) * mouseMod;
        const y2 = Math.cos(x * 0.0014 + 0.3 + time * 0.009 * speed) * (effectiveAmp * 0.35);
        const y = baseCyanY + y1 + y2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const cyanGrad = ctx.createLinearGradient(0, baseCyanY - 100, width, height);
      cyanGrad.addColorStop(0, "rgba(41, 151, 255, 0.12)");
      cyanGrad.addColorStop(0.4, "rgba(0, 199, 190, 0.06)");
      cyanGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = cyanGrad;
      ctx.fill();

      // Core electric cyan-blue highlight
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const mouseMod = 1 + (1 - Math.abs(x - width * mouseX) / width) * 0.25;
        const y1 = Math.sin(x * 0.0022 + 1.8 + time * 0.012 * speed) * (effectiveAmp * 1.2) * mouseMod;
        const y2 = Math.cos(x * 0.0014 + 0.3 + time * 0.009 * speed) * (effectiveAmp * 0.35);
        const y = baseCyanY + y1 + y2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(41, 151, 255, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Pure white center line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const mouseMod = 1 + (1 - Math.abs(x - width * mouseX) / width) * 0.25;
        const y1 = Math.sin(x * 0.0022 + 1.8 + time * 0.012 * speed) * (effectiveAmp * 1.2) * mouseMod;
        const y2 = Math.cos(x * 0.0014 + 0.3 + time * 0.009 * speed) * (effectiveAmp * 0.35);
        const y = baseCyanY + y1 + y2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // ── Layer 3: Soft Slate & Indigo Base ──
      ctx.save();
      ctx.beginPath();
      const baseIndigoY = height * 0.55 + (mouseY - 0.5) * 45;
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 6) {
        const mouseMod = 1 + (1 - Math.abs(x - width * mouseX) / width) * 0.18;
        const y1 = Math.sin(x * 0.0026 + 3.4 + time * 0.014 * speed) * (effectiveAmp * 0.95) * mouseMod;
        const y2 = Math.cos(x * 0.0017 + 2.1 + time * 0.008 * speed) * (effectiveAmp * 0.3);
        const y = baseIndigoY + y1 + y2 + 16;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const indigoGrad = ctx.createLinearGradient(0, baseIndigoY, width, height);
      indigoGrad.addColorStop(0, "rgba(99, 102, 241, 0.05)");
      indigoGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = indigoGrad;
      ctx.fill();
      ctx.restore();

      if (!hasReducedMotion) {
        time += 1;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [speed, waveRatio, interactive, hasReducedMotion]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-95 transition-opacity duration-1000" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,251,253,0.72) 0%, rgba(251,251,253,0.12) 30%, rgba(251,251,253,0.08) 70%, rgba(251,251,253,0.85) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
