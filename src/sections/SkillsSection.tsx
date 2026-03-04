import { motion } from "framer-motion";
import { skills } from "@/data/content";
import { SkillTag } from "@/components/SkillTag";

export function SkillsSection() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-6"
        >
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            SKILLS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            Tons of skill that I have
          </h2>
        </motion.div>

        {/* Skills Tags - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="relative"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + index * 0.03,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <SkillTag {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
