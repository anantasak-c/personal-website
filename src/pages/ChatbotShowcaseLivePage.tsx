import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import ChatbotShowcaseApp from "../../บ้านรวมทะเล/src/App.jsx";
import "@/styles/showcase-white.css";

export function ChatbotShowcaseLivePage() {
  useSEO({
    title: "ChatBot ShowCase Live App",
    description: "Interactive AI commerce chatbot showcase with live scenarios, Google Sheets sync demo, and multi-platform automation views.",
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/showcase/chatbot-showcase"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Show Case</span>
          </Link>
          <span className="rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Live App Demo
          </span>
        </div>
      </div>

      {/* Embedded app with white theme overrides */}
      <div className="showcase-white">
        <ChatbotShowcaseApp />
      </div>
    </div>
  );
}
