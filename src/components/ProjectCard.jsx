import { motion } from "framer-motion";

export default function ProjectCard({ project, direction = "right" }) {
  const isRight = direction === "right";

  return (
    <div className="w-screen flex justify-center">
      <div
        className={`flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8 w-[95%] md:w-[85%] lg:w-[80%] ${
          isRight ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Image */}
        <div className="shrink-0 overflow-hidden rounded-lg md:w-2/5 lg:w-2/5 flex justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="
              w-full h-auto max-h-125 object-contain
              transition-transform duration-300
              hover:scale-105
              hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]
            "
          />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 gap-4 md:gap-5 p-4 md:p-6 max-w-lg">
          <motion.h3
  className="text-2xl md:text-3xl font-bold text-white transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.85)]"
  whileHover={{
    scale: 1.05,
    textShadow: "0 0 12px #fff, 0 0 20px #7c3aed",
  }}
  transition={{ type: "spring", stiffness: 150, damping: 12 }}
>
  {project.title}
</motion.h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">
            {project.description}
          </p>

          {/* Tech badges */}
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-gray-200 text-xs md:text-sm px-2 py-1 rounded transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded text-sm md:text-base font-semibold transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]"
              >
                Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-gray-200 px-4 py-2 rounded text-sm md:text-base font-semibold transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
