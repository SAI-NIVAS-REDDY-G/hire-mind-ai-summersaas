import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type QuestionItem = {
  q: string;
  h: string;
};

export function InterviewQuestions({
  onStartMock,
  analysisData,
}: {
  onStartMock: () => void;
  analysisData: any;
}) {
  const tabs = {
    HR:
      analysisData?.questions?.hr?.map((q: string) => ({
        q,
        h: "Focus on clarity, confidence, and leadership communication.",
      })) || [],

    Technical:
      analysisData?.questions?.technical?.map((q: string) => ({
        q,
        h: "Demonstrate depth, tradeoffs, and structured technical thinking.",
      })) || [],

    Behavioral:
      analysisData?.questions?.behavioral?.map((q: string) => ({
        q,
        h: "Use STAR framework and emphasize ownership + impact.",
      })) || [],
  };

  const [active, setActive] =
    useState<keyof typeof tabs>("HR");

  return (
    <section
      id="interview"
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
            Question Engine
          </div>

          <h2 className="font-display text-5xl md:text-6xl text-balance">
            Every question,{" "}
            <span className="italic text-primary">
              curated to you.
            </span>
          </h2>
        </motion.div>

        {/* TABS */}
        <div className="flex justify-center gap-2 mb-10">
          {(Object.keys(tabs) as Array<
            keyof typeof tabs
          >).map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`relative px-5 py-2 text-sm rounded-full transition-colors ${
                active === t
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === t && (
                <motion.span
                  layoutId="tab-bg"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-primary glow-primary"
                />
              )}

              <span className="relative">
                {t}
              </span>
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!analysisData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground"
          >
            Upload your resume and target role to generate
            personalized interview intelligence.
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-5"
            >
              {tabs[active].map(
                (item: QuestionItem, i: number) => (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group relative p-7 rounded-2xl surface-card overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all" />

                    <div className="relative">
                      <div className="text-xs font-mono text-primary/80 mb-3">
                        Q.
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <div className="font-display text-xl leading-snug mb-4">
                        {item.q}
                      </div>

                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {item.h}
                      </div>

                      <button
                        onClick={onStartMock}
                        className="mt-6 inline-flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Practice with AI →
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* CTA */}
        {analysisData && (
          <div className="mt-12 text-center">
            <button
              onClick={onStartMock}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium glow-primary hover:scale-105 transition-transform"
            >
              <span className="w-2 h-2 rounded-full bg-primary-foreground/80 animate-pulse" />

              Start mock interview
            </button>
          </div>
        )}
      </div>
    </section>
  );
}