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
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            {t("work.title")}
          </h2>
        </motion.div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {visibleWork.map((work, index) => (
            <motion.div
              key={work.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="h-full"
            >
              <WorkCard {...work} />
            </motion.div>
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
