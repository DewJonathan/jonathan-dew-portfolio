// src/components/Projects.jsx
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";
import { motion } from "framer-motion";

export default function Projects() {
  // Variants for heading/subheading hover glow
  const hoverGlow = {
    hover: {
      textShadow: "0 0 12px rgba(255,255,255,0.8)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <section id="projects" className="relative py-20 text-white">
      {/* Heading */}
      <motion.h2
        className="text-4xl font-bold text-white mb-6 text-center cursor-default"
        variants={hoverGlow}
        whileHover="hover"
      >
        Projects
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-center text-gray-400 mb-12 max-w-2xl mx-auto cursor-default"
        variants={hoverGlow}
        whileHover="hover"
      >
        A selection of applications I’ve built, demonstrating different tech
        stacks and practical problem-solving approaches.
      </motion.p>

      {/* Project Cards */}
      <div className="flex flex-col gap-12 max-w-full overflow-hidden">
        {projects.map((project, index) => {
          const direction = index % 2 === 0 ? "right" : "left"; // alternate sides
          return (
            <ProjectCard
              key={project.id}
              project={project}
              direction={direction}
            />
          );
        })}
      </div>
    </section>
  );
}
