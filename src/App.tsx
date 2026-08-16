import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";

const WorkPage = lazy(() => import("@/pages/WorkPage").then((module) => ({ default: module.WorkPage })));
const WorkDetailPage = lazy(() => import("@/pages/WorkDetailPage").then((module) => ({ default: module.WorkDetailPage })));
const BlogListPage = lazy(() => import("@/pages/BlogListPage").then((module) => ({ default: module.BlogListPage })));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage").then((module) => ({ default: module.BlogPostPage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then((module) => ({ default: module.AboutPage })));
const ResumePage = lazy(() => import("@/pages/ResumePage").then((module) => ({ default: module.ResumePage })));
const OpenClawGuidePage = lazy(() => import("@/pages/OpenClawGuidePage").then((module) => ({ default: module.OpenClawGuidePage })));

const legacyWorkSlugs: Record<string, string> = {
  "chatbot-showcase": "ai-commerce-chatbot",
  "syncsocial-demo": "syncsocial",
};

function LegacyWorkRedirect() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <Navigate to={`/work/${legacyWorkSlugs[slug] ?? slug}`} replace />;
}

function LegacyNoteRedirect() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <Navigate to={`/notes/${slug}`} replace />;
}

function App() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#fbfbf9] font-mono text-[11px] uppercase tracking-[0.16em] text-[#6e6e73]">Loading story…</div>}>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<WorkDetailPage />} />
      <Route path="/work/cloud-assistant/demo" element={<Navigate to="/work/cloud-assistant" replace />} />
      <Route path="/work/tracking-sender/demo" element={<Navigate to="/work/tracking-sender" replace />} />
      <Route path="/work/ai-news-curation/demo" element={<Navigate to="/work/ai-news-curation" replace />} />
      <Route path="/work/ai-commerce-chatbot/demo" element={<Navigate to="/work/ai-commerce-chatbot" replace />} />
      <Route path="/work/syncsocial/demo" element={<Navigate to="/work/syncsocial" replace />} />
      <Route path="/notes" element={<BlogListPage />} />
      <Route path="/notes/:slug" element={<BlogPostPage />} />
      <Route path="/openclaw-guide" element={<OpenClawGuidePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/resume" element={<ResumePage />} />

      <Route path="/impeccable" element={<Navigate to="/" replace />} />
      <Route path="/portfolio" element={<Navigate to="/about" replace />} />
      <Route path="/showcase" element={<Navigate to="/work" replace />} />
      <Route path="/showcase/chatbot-showcase/live" element={<Navigate to="/work/ai-commerce-chatbot" replace />} />
      <Route path="/showcase/syncsocial-demo/live" element={<Navigate to="/work/syncsocial" replace />} />
      <Route path="/showcase/:slug" element={<LegacyWorkRedirect />} />
      <Route path="/blog" element={<Navigate to="/notes" replace />} />
      <Route path="/blog/:slug" element={<LegacyNoteRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
