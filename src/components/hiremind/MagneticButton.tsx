import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export function MagneticButton({ children, href, onClick, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base = "relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium transition-colors select-none";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
      : "border border-white/15 text-foreground hover:border-white/30 hover:bg-white/5";

  const content = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as never}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as never}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
    >
      {content}
    </motion.button>
  );
}
