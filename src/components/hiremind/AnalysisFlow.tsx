import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Parsing resume structure",
  "Extracting skill vectors",
  "Mapping ATS signals",
  "Detecting role gaps",
  "Generating interview simulation",
  "Building preparation roadmap",
];

export function AnalysisFlow({ onDone, onClose, filename }: { onDone: () => void; onClose: () => void; filename: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= steps.length) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 850 + Math.random() * 400);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] backdrop-blur-2xl bg-background/85 flex items-center justify-center p-6"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm">esc</button>
      <div className="relative max-w-2xl w-full">
        <div className="absolute -inset-20 ambient-gradient opacity-60 pointer-events-none" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">Analyzing · {filename || "resume.pdf"}</div>
          <h3 className="font-display text-4xl md:text-5xl mb-10 text-balance">
            The system is <span className="italic text-primary">thinking</span>.
          </h3>

          <div className="space-y-3">
            {steps.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= step ? 1 : 0.25, x: 0 }}
                  className="flex items-center gap-4 py-2"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    {done ? (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} viewBox="0 0 20 20" className="w-5 h-5 text-primary">
                        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </motion.svg>
                    ) : active ? (
                      <>
                        <span className="absolute inset-0 rounded-full bg-primary/40 pulse-ring" />
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/15" />
                    )}
                  </div>
                  <div className={`flex-1 ${active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
                    {s}
                  </div>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="text-xs font-mono text-primary"
                      >
                        running
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 h-px bg-white/5 overflow-hidden">
            <motion.div
              animate={{ width: `${(step / steps.length) * 100}%` }}
              transition={{ ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
