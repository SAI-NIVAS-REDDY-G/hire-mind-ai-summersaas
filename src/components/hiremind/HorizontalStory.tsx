import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const panels = [
  { n: "01", t: "Resume Parsing", d: "Deep semantic parsing — sections, dates, ownership, impact. Not regex. Reasoning.", k: "context window" },
  { n: "02", t: "Skill Intelligence", d: "Vectorize every capability against the live talent graph. See what your resume actually says.", k: "embeddings" },
  { n: "03", t: "ATS Signal Mapping", d: "Decode the exact signals an applicant tracking system will surface to a recruiter.", k: "signal density" },
  { n: "04", t: "Weakness Detection", d: "Identify the silent gaps — leadership scope, quantification, vocabulary mismatch.", k: "gap analysis" },
  { n: "05", t: "AI Mock Interview", d: "A conversational interviewer trained on your role, your story, your weakest answers.", k: "live coach" },
  { n: "06", t: "Offer Readiness", d: "A composite score tracking how close you are to a converting interview. Updated daily.", k: "readiness" },
];

export function HorizontalStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((panels.length - 1) / panels.length) * 100}%`]);

  return (
    <section id="intelligence" ref={ref} className="relative" style={{ height: `${panels.length * 90}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-10 left-0 right-0 z-20 px-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          <span>The Intelligence Pipeline</span>
          <span>06 systems · one mind</span>
        </div>
        <motion.div style={{ x, width: `${panels.length * 100}vw` }} className="flex h-full">
          {panels.map((p, i) => (
            <div key={p.n} className="relative w-screen h-full flex items-center justify-center px-8">
              <div className="relative max-w-4xl w-full">
                <div className="absolute -top-10 left-0 text-[14rem] md:text-[22rem] font-display leading-none text-white/[0.04] select-none">
                  {p.n}
                </div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
                      Module {p.n} / 06
                    </div>
                    <h3 className="font-display text-5xl md:text-7xl text-balance mb-6">
                      {p.t}
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-md text-balance">{p.d}</p>
                    <div className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground/70">
                      <span className="w-8 h-px bg-primary" />
                      <span className="uppercase tracking-widest">{p.k}</span>
                    </div>
                  </div>
                  <PanelVisual index={i} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        {/* Progress bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-px bg-white/10">
          <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-full bg-primary origin-left" />
        </div>
      </div>
    </section>
  );
}

function PanelVisual({ index }: { index: number }) {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-3xl surface-card overflow-hidden">
        <div className="absolute inset-0 ambient-gradient opacity-40" />
        <div className="absolute scan-line top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/20 to-transparent" style={{ animationDelay: `${index * 0.3}s` }} />
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="100" cy="100" r={20 + i * 12}
              fill="none" stroke="currentColor" strokeWidth="0.5"
              className="text-primary/40"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <motion.line
                key={i}
                x1={100} y1={100}
                x2={100 + Math.cos(a) * 80} y2={100 + Math.sin(a) * 80}
                stroke="currentColor" strokeWidth="0.3"
                className="text-secondary/30"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
              />
            );
          })}
          <circle cx="100" cy="100" r="3" className="fill-primary" />
        </svg>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground/60">
          <span>node.{String(index + 1).padStart(2, "0")}</span>
          <span className="text-primary">● live</span>
        </div>
      </div>
    </div>
  );
}
