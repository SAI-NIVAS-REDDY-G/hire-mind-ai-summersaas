import { motion } from "framer-motion";

const days = [
  { d: "Day 1–3", t: "Foundation reset", n: "Refine resume narrative · 3 STAR stories drafted" },
  { d: "Day 4–7", t: "Signal density", n: "Inject quantified outcomes · ATS recheck" },
  { d: "Week 2", t: "Technical depth", n: "System design drills · 4 mock cases" },
  { d: "Week 3", t: "Conviction reps", n: "Live mocks with Mira · panel simulations" },
  { d: "Week 4", t: "Offer-ready", n: "Negotiation framing · question bank locked" },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">Roadmap</div>
          <h2 className="font-display text-5xl md:text-6xl text-balance">
            A 28-day path, <span className="italic text-primary">authored for you.</span>
          </h2>
        </motion.div>

        <div className="relative pl-6 md:pl-0">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          {days.map((d, i) => (
            <motion.div
              key={d.d}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className={`relative grid md:grid-cols-2 gap-4 md:gap-12 py-8 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className={`absolute left-2 md:left-1/2 top-12 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-primary`} />
              <div className={`pl-8 md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                <div className="text-xs font-mono text-primary uppercase tracking-widest mb-2">{d.d}</div>
                <div className="font-display text-3xl">{d.t}</div>
              </div>
              <div className="pl-8 md:pl-0">
                <div className="rounded-2xl surface-card p-5 text-sm text-muted-foreground leading-relaxed">
                  {d.n}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
