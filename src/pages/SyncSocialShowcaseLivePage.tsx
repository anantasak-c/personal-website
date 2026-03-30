import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { SyncSocialDemoDashboard } from "@/components/showcase2/SyncSocialDemoDashboard";
import "@/styles/syncsocial-showcase.css";

export function SyncSocialShowcaseLivePage() {
  useSEO({
    title: "SyncSocial Demo App",
    description: "Standalone social media publishing demo with multi-platform connection flow, live preview, and analytics dashboard.",
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/showcase/syncsocial-demo"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Show Case</span>
          </Link>
          <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Live Demo
          </span>
        </div>
      </div>

      <SyncSocialDemoDashboard />
    </div>
  );
}
