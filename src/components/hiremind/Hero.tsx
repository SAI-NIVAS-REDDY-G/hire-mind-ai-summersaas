import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgX = useTransform(sx, [0, 1], ["-5%", "5%"]);
  const bgY = useTransform(sy, [0, 1], ["-5%", "5%"]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Ambient light layers */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 ambient-gradient pointer-events-none"
      />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at center, black, transparent)",
        }}
      />
      {/* Particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full bg-primary/60"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full surface-card text-xs text-muted-foreground mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-primary pulse-ring" />
            <span className="relative w-2 h-2 rounded-full bg-primary" />
          </span>
          AI Career Operating System · v2.0
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[1.02] text-balance">
          {"Your next offer".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="inline-block italic bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent text-glow"
          >
            starts before the interview.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          HireMind AI transforms resumes into personalized interview intelligence —
          mapping skills, signals, and stories the way recruiters actually read them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <MagneticButton href="#upload" variant="primary">
            Analyze my resume
          </MagneticButton>
          <MagneticButton href="#intelligence" variant="ghost">
            Watch the system →
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/60"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-10 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
