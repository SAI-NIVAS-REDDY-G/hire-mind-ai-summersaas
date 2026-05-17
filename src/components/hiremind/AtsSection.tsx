import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AtsSection({
  analysisData,
  isAnalyzing,
}: {
  analysisData: any;
  isAnalyzing: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  // DYNAMIC DATA
  const score = analysisData?.atsScore || 0;

  const signals = [
    {
      l: "Keyword density",
      v: analysisData?.atsSignals?.keywordMatch || 0,
    },

    {
      l: "Leadership signal",
      v: analysisData?.atsSignals?.leadership || 0,
    },

    {
      l: "Technical depth",
      v: analysisData?.atsSignals?.technicalDepth || 0,
    },

    {
      l: "Communication",
      v: analysisData?.atsSignals?.communication || 0,
    },
  ];

  const keywords = [
    ...(analysisData?.strengths || []),
    ...(analysisData?.weaknesses || []),
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
            ATS Intelligence
          </div>

          <h2 className="font-display text-5xl md:text-6xl text-balance">
            The recruiter's view,{" "}
            <span className="italic text-primary">
              decoded.
            </span>
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          {/* ATS RING */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 ambient-gradient opacity-60" />

            <svg
              viewBox="0 0 200 200"
              className="relative w-full h-full -rotate-90"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="white"
                strokeOpacity="0.05"
                strokeWidth="2"
              />

              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="white"
                strokeOpacity="0.04"
                strokeWidth="1"
              />

              <circle
                cx="100"
                cy="100"
                r="66"
                fill="none"
                stroke="white"
                strokeOpacity="0.04"
                strokeWidth="1"
              />

              <motion.circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#g)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 90}
                initial={{
                  strokeDashoffset: 2 * Math.PI * 90,
                }}
                animate={
                  inView
                    ? {
                        strokeDashoffset:
                          2 *
                          Math.PI *
                          90 *
                          (1 - score / 100),
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2"
              >
                ATS Match
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="font-display text-7xl text-glow"
              >
                <Counter to={inView ? score : 0} />

                <span className="text-2xl text-muted-foreground align-top ml-1">
                  %
                </span>
              </motion.div>

              <div className="mt-2 text-xs text-primary">
                {score >= 80
                  ? "High recruiter alignment"
                  : score >= 60
                  ? "Moderate recruiter alignment"
                  : "Low recruiter alignment"}
              </div>
            </div>
          </div>

          {/* SIGNALS */}
          <div className="space-y-6">
            {signals.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {s.l}
                  </span>

                  <span className="font-mono text-primary">
                    {s.v}
                  </span>
                </div>

                <div className="h-px bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={
                      inView
                        ? { width: `${s.v}%` }
                        : {}
                    }
                    transition={{
                      duration: 1.4,
                      delay: 0.3 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </motion.div>
            ))}

            {/* FLOATING SIGNALS */}
            <div className="pt-6 mt-6 border-t border-white/5">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Recruiter Signals
              </div>

              <div className="flex flex-wrap gap-2">
                {keywords.map((k: string, i: number) => (
                  <motion.span
                    key={k + i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0 }
                        : {}
                    }
                    transition={{
                      delay: 0.4 + i * 0.04,
                    }}
                    className="px-3 py-1 text-xs rounded-full surface-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all cursor-default"
                  >
                    {k}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* LOADING STATE */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-6 text-sm text-primary"
              >
                Analyzing recruiter intelligence...
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  return (
    <motion.span
      key={to}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <CounterInner to={to} />
    </motion.span>
  );
}

function CounterInner({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useRefAnim(ref, to);

  return <span ref={ref}>0</span>;
}

function useRefAnim(
  ref: React.RefObject<HTMLSpanElement | null>,
  to: number
) {
  useEffectOnce(() => {
    const start = performance.now();

    const dur = 1800;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);

      const e = 1 - Math.pow(1 - p, 3);

      if (ref.current) {
        ref.current.textContent = String(
          Math.round(to * e)
        );
      }

      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

function useEffectOnce(fn: () => void) {
  const r = useRef(false);

  if (!r.current && typeof window !== "undefined") {
    r.current = true;
    fn();
  }
}