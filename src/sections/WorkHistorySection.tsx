import { motion } from "framer-motion";
import { workHistory } from "@/data/content";
import { WorkCard } from "@/components/WorkCard";

export function WorkHistorySection() {
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
            EXPERIENCE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            Work History
          </h2>
        </motion.div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workHistory.map((work, index) => (
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
            >
              <WorkCard {...work} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
