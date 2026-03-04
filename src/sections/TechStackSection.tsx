import { motion } from "framer-motion";
import { techStack } from "@/data/content";
import { TechItem } from "@/components/TechItem";

export function TechStackSection() {
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
            TECH STACK
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            What I Use
          </h2>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Programming Languages
            </h3>
            <div className="space-y-1">
              {techStack.languages.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TechItem {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Business & Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Business & Design
            </h3>
            <div className="space-y-1">
              {techStack.business.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TechItem {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Analytics & Logging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Analytics & Logging
            </h3>
            <div className="space-y-1">
              {techStack.analytics.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TechItem {...tech} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
