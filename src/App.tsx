import { Routes, Route } from "react-router-dom";
import { HeroSection } from "@/sections/HeroSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { AboutSection } from "@/sections/AboutSection";
import { WorkHistorySection } from "@/sections/WorkHistorySection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { FooterSection } from "@/sections/FooterSection";
import { BlogListPage } from "@/pages/BlogListPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { ResumePage } from "@/pages/ResumePage";
import { LandingPage } from "@/pages/LandingPage";
import { OpenClawGuidePage } from "@/pages/OpenClawGuidePage";
function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <SkillsSection />
      <AboutSection />
      <WorkHistorySection />
      <ProjectsSection />
      <TechStackSection />
      <FooterSection />
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/openclaw-guide" element={<OpenClawGuidePage />} />
    </Routes>
  );
}

export default App;
