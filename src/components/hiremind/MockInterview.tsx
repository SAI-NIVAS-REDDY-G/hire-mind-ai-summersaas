import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const script = [
  { q: "Let's start light. Walk me through what you're working on this quarter.", topic: "Context" },
  { q: "What's the hardest technical decision you've owned in the last 90 days?", topic: "Judgment" },
  { q: "Tell me about a teammate you grew. What changed because of you?", topic: "Leverage" },
];

export function MockInterview({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [feedback, setFeedback] = useState<null | { clarity: number; structure: number; depth: number; note: string }>(null);

  useEffect(() => { setAnswer(""); setFeedback(null); }, [i]);

  const submit = () => {
    if (!answer.trim()) return;
    setThinking(true);
    setTimeout(() => {
      const len = answer.split(/\s+/).filter(Boolean).length;
      const star = /\b(situation|task|action|result|because|when|then)\b/i.test(answer);
      setFeedback({
        clarity: Math.min(95, 60 + Math.min(30, len)),
        structure: star ? 88 : 64,
        depth: Math.min(92, 50 + Math.min(40, len * 0.8)),
        note: star
          ? "Strong STAR scaffolding. Tighten the 'Result' with a number."
          : "Try anchoring this in Situation → Task → Action → Result. Land the impact.",
      });
      setThinking(false);
    }, 1400);
  };

  const current = script[i];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] backdrop-blur-2xl bg-background/90 flex items-center justify-center p-6"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm z-10">close</button>
      <div className="relative max-w-4xl w-full">
        <div className="absolute -inset-32 ambient-gradient opacity-50 pointer-events-none" />

        <div className="relative flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <span className="absolute inset-0 rounded-full bg-primary/30 pulse-ring" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display text-sm text-primary-foreground">
                AI
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Mira · AI Interviewer</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Listening
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(script.length).padStart(2, "0")}
          </div>
        </div>

        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">{current.topic}</div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={current.q}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="font-display text-3xl md:text-4xl leading-tight text-balance mb-8"
            >
              {current.q}
            </motion.h3>
          </AnimatePresence>

          <div className="rounded-2xl surface-card p-5">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Begin speaking — or type your answer…"
              className="w-full min-h-[140px] bg-transparent resize-none text-base leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none"
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <div className="text-xs text-muted-foreground">{answer.split(/\s+/).filter(Boolean).length} words · STAR ready</div>
              <button
                onClick={submit}
                disabled={!answer.trim() || thinking}
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                {thinking ? "Analyzing…" : "Submit"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 rounded-2xl surface-card p-6"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">Mira's read</div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { l: "Clarity", v: feedback.clarity },
                    { l: "Structure", v: feedback.structure },
                    { l: "Depth", v: feedback.depth },
                  ].map((m, idx) => (
                    <div key={m.l}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{m.l}</span>
                        <span className="font-mono text-primary">{m.v}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${m.v}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.9 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feedback.note}</p>
                <div className="mt-5 flex justify-end gap-3">
                  <button onClick={() => setFeedback(null)} className="text-sm text-muted-foreground hover:text-foreground">Retry</button>
                  <button
                    onClick={() => setI((n) => Math.min(script.length - 1, n + 1))}
                    disabled={i >= script.length - 1}
                    className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm disabled:opacity-40"
                  >
                    {i >= script.length - 1 ? "Session complete" : "Next question →"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
