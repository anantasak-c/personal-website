import { motion } from "framer-motion";
import { projects } from "@/data/content";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              PROJECTS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              My Projects
            </h2>
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4"
            onClick={() => setShowAll(!showAll)}
          >
            View All
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* Add Project Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500">
            💡 เว็บไซต์นี้รองรับการเพิ่มโปรเจกต์ใหม่ได้ง่าย ๆ ผ่านการแก้ไขไฟล์ข้อมูล
          </p>
        </motion.div>
      </div>
    </section>
  );
}
