import { HeroSection } from "@/sections/HeroSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { AboutSection } from "@/sections/AboutSection";
import { WorkHistorySection } from "@/sections/WorkHistorySection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { FooterSection } from "@/sections/FooterSection";

function App() {
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

export default App;
