import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-background/60 border-b border-white/5" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary opacity-90" />
            <div className="absolute inset-[2px] rounded-[7px] bg-background flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary glow-primary" />
            </div>
          </div>
          <span className="font-display text-xl tracking-tight">HireMind <span className="text-primary">AI</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Intelligence", "Interview", "Roadmap", "Pricing"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition">Sign in</button>
          <a href="#upload" className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform">
            Get started
          </a>
        </div>
      </div>
    </motion.header>
  );
}
