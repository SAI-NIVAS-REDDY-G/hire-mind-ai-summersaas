import { motion } from "framer-motion";

const tiers = [
  { name: "Signal", price: "$0", line: "Start understanding yourself", feat: ["1 resume analysis", "ATS scoring", "Sample questions"] },
  { name: "Operator", price: "$29", line: "For active candidates", feat: ["Unlimited analyses", "AI mock interviews", "28-day roadmap", "Story coach"], featured: true },
  { name: "Elite", price: "$79", line: "For senior + leadership", feat: ["Everything in Operator", "Panel simulations", "Compensation playbook", "Priority routing"] },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">Pricing</div>
          <h2 className="font-display text-5xl md:text-6xl text-balance">Pay for the <span className="italic text-primary">offer</span>, not the tools.</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl ${t.featured ? "surface-card border-primary/30 glow-primary" : "surface-card"}`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-primary text-primary-foreground">
                  Most chosen
                </div>
              )}
              <div className="font-display text-2xl mb-1">{t.name}</div>
              <div className="text-sm text-muted-foreground mb-6">{t.line}</div>
              <div className="font-display text-5xl mb-1">{t.price}<span className="text-base text-muted-foreground"> /mo</span></div>
              <ul className="mt-8 space-y-3 text-sm">
                {t.feat.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full py-3 rounded-full text-sm font-medium ${t.featured ? "bg-primary text-primary-foreground" : "border border-white/15 hover:bg-white/5"}`}>
                Choose {t.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
