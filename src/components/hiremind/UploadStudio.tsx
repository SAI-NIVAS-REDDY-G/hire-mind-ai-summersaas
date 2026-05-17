import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { MagneticButton } from "./MagneticButton";
import { AnalysisFlow } from "./AnalysisFlow";

export function UploadStudio({
  onAnalyzed,
  setAnalysisData,
  setIsAnalyzing,
  isAnalyzing,
}: {
  onAnalyzed: () => void;

  setAnalysisData: (data: any) => void;

  setIsAnalyzing: (value: boolean) => void;

  isAnalyzing: boolean;
}) {
  const [file, setFile] = useState<File | null>(
    null
  );

  const [jd, setJd] = useState("");

  const [drag, setDrag] = useState(false);

  const [progress, setProgress] = useState(0);

  const [uploaded, setUploaded] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  // FILE VALIDATION
  const accept = (
    f: File | undefined | null
  ) => {
    setError(null);

    if (!f) return;

    const ok = /\.(pdf|docx?)$/i.test(
      f.name
    );

    if (!ok) {
      setError(
        "Please upload a PDF or DOCX file."
      );

      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");

      return;
    }

    setFile(f);

    setUploaded(false);

    setProgress(0);

    let p = 0;

    const id = setInterval(() => {
      p += 8 + Math.random() * 14;

      if (p >= 100) {
        p = 100;

        clearInterval(id);

        setUploaded(true);
      }

      setProgress(p);
    }, 90);
  };

  // DRAG DROP
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      setDrag(false);

      accept(e.dataTransfer.files?.[0]);
    },
    []
  );

  // FAKE AI ANALYSIS
  const generateFakeAnalysis = () => {
    return {
      selectionProbability:
        Math.floor(Math.random() * 30) + 60,

      atsScore:
        Math.floor(Math.random() * 20) + 75,

      atsSignals: {
        keywordMatch:
          Math.floor(Math.random() * 20) + 75,

        leadership:
          Math.floor(Math.random() * 20) + 60,

        technicalDepth:
          Math.floor(Math.random() * 20) + 70,

        communication:
          Math.floor(Math.random() * 20) + 65,
      },

      strengths: [
        "Strong React ecosystem knowledge",

        "Excellent UI/UX execution",

        "Modern frontend architecture understanding",
      ],

      weaknesses: [
        "Limited quantified achievements",

        "Missing cloud deployment metrics",

        "Leadership impact not clearly highlighted",
      ],

      questions: {
        hr: [
          "Tell us about a challenging frontend project you handled.",

          "Why do you want to work in this role?",
        ],

        technical: [
          "Explain React rendering lifecycle.",

          "How would you optimize performance in a large dashboard app?",
        ],

        behavioral: [
          "Describe a time you handled tight deadlines.",

          "Tell us about a conflict within your team.",
        ],
      },

      roadmap: [
        {
          week: "Week 1",

          goal:
            "Improve quantified resume achievements",
        },

        {
          week: "Week 2",

          goal:
            "Strengthen system design explanations",
        },

        {
          week: "Week 3",

          goal:
            "Practice mock interviews daily",
        },
      ],
    };
  };

  // START ANALYSIS
  const startAnalyze = async () => {
    if (!file || !jd.trim()) return;

    const analysis =
      generateFakeAnalysis();

    setAnalysisData(analysis);

    setIsAnalyzing(true);
  };

  return (
    <section
      id="upload"
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-4">
            The Intake
          </div>

          <h2 className="font-display text-5xl md:text-6xl text-balance">
            Hand the AI{" "}
            <span className="italic text-primary">
              two artifacts.
            </span>
          </h2>

          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Your resume and the role you're
            chasing. The system does the rest.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* DROPZONE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="md:col-span-3"
          >
            <div
              onDragOver={(e) => {
                e.preventDefault();

                setDrag(true);
              }}
              onDragLeave={() =>
                setDrag(false)
              }
              onDrop={onDrop}
              onClick={() =>
                !file &&
                inputRef.current?.click()
              }
              className={`relative rounded-3xl surface-card overflow-hidden transition-all cursor-pointer ${
                drag
                  ? "border-primary/60 glow-primary"
                  : ""
              }`}
              style={{ minHeight: 360 }}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  accept(
                    e.target.files?.[0]
                  )
                }
              />

              <div className="absolute inset-0 ambient-gradient opacity-40 pointer-events-none" />

              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-full p-10 flex flex-col items-center justify-center text-center"
                    style={{
                      minHeight: 360,
                    }}
                  >
                    <div className="font-display text-2xl mb-2">
                      Drop your resume
                    </div>

                    <div className="text-sm text-muted-foreground">
                      PDF or DOCX · up to 10MB
                    </div>

                    {error && (
                      <div className="mt-4 text-sm text-destructive">
                        {error}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="file"
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="relative p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-14 rounded-md bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/10 flex items-center justify-center text-[10px] font-mono text-primary">
                        {file.name
                          .split(".")
                          .pop()
                          ?.toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {file.name}
                        </div>

                        <div className="text-xs text-muted-foreground mt-1">
                          {(
                            file.size / 1024
                          ).toFixed(0)}{" "}
                          KB ·{" "}
                          {uploaded
                            ? "Ready"
                            : "Uploading…"}
                        </div>

                        <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            animate={{
                              width: `${progress}%`,
                            }}
                            transition={{
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* JD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="md:col-span-2 rounded-3xl surface-card p-6 flex flex-col"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Target role
            </div>

            <textarea
              value={jd}
              onChange={(e) =>
                setJd(e.target.value)
              }
              placeholder="Paste the job description…"
              className="flex-1 min-h-[220px] w-full bg-transparent resize-none text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{jd.length} chars</span>

              <span>
                {
                  jd
                    .split(/\s+/)
                    .filter(Boolean).length
                }{" "}
                words
              </span>
            </div>
          </motion.div>
        </div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={startAnalyze}
            variant={
              uploaded && jd.trim()
                ? "primary"
                : "ghost"
            }
          >
            {uploaded && jd.trim()
              ? "Run intelligence sweep →"
              : "Upload resume + JD first"}
          </MagneticButton>
        </motion.div>
      </div>

      {/* ANALYSIS FLOW */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnalysisFlow
            onDone={() => {
              setIsAnalyzing(false);
            }}
            onClose={() =>
              setIsAnalyzing(false)
            }
            filename={file?.name ?? ""}
          />
        )}
      </AnimatePresence>
    </section>
  );
}