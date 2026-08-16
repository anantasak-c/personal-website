import type { ReactNode } from "react";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

export function DemoShell({ slug, title, children }: { slug: string; title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
          <Link to={`/work/${slug}`} className="inline-flex items-center gap-2 text-sm text-[#6e6e73] hover:text-[#1d1d1f]"><ArrowLeft className="h-4 w-4" /> Back to Case Study</Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-800"><FlaskConical className="h-3.5 w-3.5" /> Demo Mode</div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <p className="mb-4 text-sm text-[#6e6e73]"><span className="font-medium text-[#1d1d1f]">{title}</span> · All data and external outcomes are simulated.</p>
        {children}
      </div>
    </div>
  );
}
