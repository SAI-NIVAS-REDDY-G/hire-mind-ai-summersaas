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
      { title: "HireMind AI — Your AI Career Operating System" },
      { name: "description", content: "HireMind AI transforms resumes into personalized interview intelligence. ATS analysis, AI mock interviews, and a 28-day offer-ready roadmap." },
      { property: "og:title", content: "HireMind AI — Your AI Career Operating System" },
      { property: "og:description", content: "Transform your resume into personalized interview intelligence." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const [mock, setMock] = useState(false);

  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <HorizontalStory />
        <UploadStudio onAnalyzed={() => setMock(false)} />
        <AtsSection />
        <InterviewQuestions onStartMock={() => setMock(true)} />
        <Roadmap />
        <Pricing />
      </main>
      <Footer />
      <AnimatePresence>
        {mock && <MockInterview onClose={() => setMock(false)} />}
      </AnimatePresence>
    </div>
  );
}
