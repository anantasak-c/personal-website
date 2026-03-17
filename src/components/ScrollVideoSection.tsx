import { useRef } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent, motion } from "framer-motion";

export function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value to make video playback less jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to video time
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      // Check if duration is valid (ready)
      if (Number.isFinite(videoRef.current.duration)) {
        const time = latest * videoRef.current.duration;
        videoRef.current.currentTime = time;
      }
    }
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky container for the video */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/scroll-guide.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        
        {/* Overlay Text that fades in/out based on scroll */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          
          {/* Step 1 Overlay */}
          <StepOverlay progress={smoothProgress} start={0.05} end={0.25} text="1. Paste Prompt" subtext="Copy the magic prompt and paste it into Windsurf" />
          
          {/* Step 2 Overlay */}
          <StepOverlay progress={smoothProgress} start={0.35} end={0.65} text="2. Accept & Run" subtext="Allow Windsurf to execute the Docker commands" />
          
          {/* Step 3 Overlay */}
          <StepOverlay progress={smoothProgress} start={0.75} end={0.95} text="3. Done!" subtext="Click the localhost link when ready" />
          
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce"
        >
          Scroll to play
        </motion.div>
      </div>
    </section>
  );
}

function StepOverlay({ progress, start, end, text, subtext }: { progress: any, start: number, end: number, text: string, subtext: string }) {
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    progress,
    [start, end],
    [50, -50]
  );

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center max-w-md"
    >
      <h3 className="text-3xl font-bold text-white mb-2">{text}</h3>
      <p className="text-blue-200 text-lg">{subtext}</p>
    </motion.div>
  );
}
