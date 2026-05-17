import { motion } from "framer-motion";

export function Roadmap({
  analysisData,
}: {
  analysisData: any;
}) {
  const roadmap = analysisData?.roadmap || [];

  return (
    <section
      id="roadmap"
      className="relative py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
            Roadmap
          </div>

          <h2 className="font-display text-5xl md:text-6xl text-balance">
            A career roadmap,{" "}
            <span className="italic text-primary">
              generated for you.
            </span>
          </h2>
        </motion.div>

        {/* EMPTY STATE */}
        {!analysisData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground"
          >
            Upload your resume and target role to generate
            a personalized preparation roadmap.
          </motion.div>
        ) : (
          <div className="relative pl-6 md:pl-0">
            {/* TIMELINE */}
            <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {roadmap.map(
              (
                d: {
                  week: string;
                  goal: string;
                },
                i: number
              ) => (
                <motion.div
                  key={d.week}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    delay: i * 0.08,
                  }}
                  className={`relative grid md:grid-cols-2 gap-4 md:gap-12 py-8 ${
                    i % 2
                      ? "md:[&>div:first-child]:order-2"
                      : ""
                  }`}
                >
                  {/* NODE */}
                  <div className="absolute left-2 md:left-1/2 top-12 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-primary" />

                  {/* LEFT */}
                  <div
                    className={`pl-8 md:pl-0 ${
                      i % 2
                        ? "md:text-left"
                        : "md:text-right"
                    }`}
                  >
                    <div className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
                      {d.week}
                    </div>

                    <div className="font-display text-3xl">
                      Focus Area
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="pl-8 md:pl-0">
                    <div className="rounded-2xl surface-card p-5 text-sm text-muted-foreground leading-relaxed">
                      {d.goal}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}

        {/* FOOTER INSIGHT */}
        {analysisData && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full surface-card text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />

              Personalized roadmap generated from recruiter
              signal analysis.
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}