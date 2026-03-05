import { motion } from "framer-motion";
import { useState } from "react";
import { workHistory } from "@/data/content";
import { WorkCard } from "@/components/WorkCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function WorkHistorySection() {
  const { t } = useLang();
  const [showAll, setShowAll] = useState(false);
  const visibleWork = showAll ? workHistory : workHistory.slice(0, 2);

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-0 -left-16 w-40 h-40 animate-float-delay opacity-10" viewBox="0 0 200 200">
          <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="none" stroke="#818cf8" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-20 h-20 animate-spin-slow opacity-10" viewBox="0 0 60 60">
          <rect x="10" y="10" width="40" height="40" rx="8" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="6 3" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6"
        >
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {t("work.label")}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold shimmer-text mt-1">
            {t("work.title")}
          </h2>
        </motion.div>

        {/* Work Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleWork.map((work) => (
            <div key={work.company} className="h-full">
              <WorkCard {...work} className="h-full" />
            </div>
          ))}
        </div>

        {/* View All / Show Less */}
        {workHistory.length > 2 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="rounded-lg gap-1"
            >
              {showAll ? (
                <>
                  {t("work.showLess")}
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  {t("work.viewAll")} ({workHistory.length})
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
