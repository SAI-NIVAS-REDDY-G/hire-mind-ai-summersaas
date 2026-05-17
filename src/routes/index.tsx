import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLenis } from "@/lib/use-lenis";

import { Navbar } from "@/components/hiremind/Navbar";
import { Hero } from "@/components/hiremind/Hero";
import { HorizontalStory } from "@/components/hiremind/HorizontalStory";
import { UploadStudio } from "@/components/hiremind/UploadStudio";
import { AtsSection } from "@/components/hiremind/AtsSection";
import { InterviewQuestions } from "@/components/hiremind/InterviewQuestions";
import { Roadmap } from "@/components/hiremind/Roadmap";
import { Pricing } from "@/components/hiremind/Pricing";
import { Footer } from "@/components/hiremind/Footer";
import { MockInterview } from "@/components/hiremind/MockInterview";

import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "HireMind AI — Your AI Career Operating System",
      },

      {
        name: "description",

        content:
          "HireMind AI transforms resumes into personalized interview intelligence.",
      },
    ],
  }),

  component: Index,
});

function Index() {
  useLenis();

  const [mock, setMock] = useState(false);

  const [analysisData, setAnalysisData] =
    useState<any>(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  return (
    <div className="relative bg-background text-foreground">
      <Navbar />

      <main>
        <Hero />

        <HorizontalStory />

        <UploadStudio
          setAnalysisData={setAnalysisData}
          setIsAnalyzing={setIsAnalyzing}
          isAnalyzing={isAnalyzing}
          onAnalyzed={() => setMock(false)}
        />

        <AtsSection
  analysisData={analysisData}
  isAnalyzing={isAnalyzing}
/>

        <InterviewQuestions
          analysisData={analysisData}
          onStartMock={() => setMock(true)}
        />

        <Roadmap
          analysisData={analysisData}
        />

        <Pricing />
      </main>

      <Footer />

      <AnimatePresence>
        {mock && (
          <MockInterview
            analysisData={analysisData}
            onClose={() => setMock(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}