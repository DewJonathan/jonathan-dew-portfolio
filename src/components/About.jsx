// src/components/About.jsx
import { useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import TechStackFloating from "./TechStackFloating";

export default function About() {
  // Tech stack data (memoized)
  const techStack = useMemo(
    () => [
      { name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
      { name: "Node.js", icon: "/icons/nodedotjs.svg", color: "#5FA04E" },
      { name: "Express", icon: "/icons/express.svg", color: "#000000" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#336791" },
      { name: "Python", icon: "/icons/python.svg", color: "#3776AB" },
      { name: "Flask", icon: "/icons/flask.svg", color: "#3BABC3" },
      { name: "Tailwind", icon: "/icons/tailwindcss.svg", color: "#06B6D4" },
      { name: "JavaScript", icon: "/icons/javascript.svg", color: "#F7DF1E" },
      { name: "Docker", icon: "/icons/docker.svg", color: "#2496ED" },
      { name: "Java", icon: "/icons/java.svg", color: "#007396" },
      { name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" },
      { name: "Git", icon: "/icons/git.svg", color: "#F05032" },
      { name: "GitHub", icon: "/icons/github.svg", color: "#181717" },
      { name: "JWT", icon: "/icons/jsonwebtokens.svg", color: "#000000" },
      { name: "Prisma", icon: "/icons/prisma.svg", color: "#4DB6AC" },
    ],
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [5, -5]); // tilt front/back
  const rotateY = useTransform(x, [0, 1], [-5, 5]); // tilt left/right

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width;
    const posY = (e.clientY - rect.top) / rect.height;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <section id="about" className="relative py-20 px-6 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[450px_1fr] gap-12 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* About Card with hover tilt */}
        <motion.div
          className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-lg z-10 max-w-112.5 cursor-pointer"
          variants={cardVariants}
          style={{ rotateX, rotateY, perspective: 600 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            y: -8,
            boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.15)",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <h2 className="text-4xl font-bold mb-6 text-white">About</h2>

          <p className="text-lg leading-relaxed mb-4 text-gray-300">
            I’m a full-stack developer with a computer science background who
            builds production-ready web applications with ownership across the
            entire system.
          </p>

          <p className="text-lg leading-relaxed mb-4 text-gray-300">
            I work end-to-end—from React-based user interfaces to Node/Express
            APIs, PostgreSQL data models, and authentication—prioritizing
            clarity, reliability, and maintainability over one-off demos.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            I’m currently building a full-stack flight tracking application with
            authenticated users, persisted profiles, and real-world data flow,
            designed to handle edge cases and long-term growth.
          </p>
        </motion.div>

        {/* Floating Tech Stack */}
        <div className="flex flex-col items-center">
          <TechStackFloating techStack={techStack} />

          {/* Title under icons */}
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-white mt-6 pointer-events-auto 
             transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-pointer"
            animate={{
              x: [0, 8, 0, -8, 0],
              y: [0, -4, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 0.2,
              },
            }}
          >
            Tech Stack
          </motion.h3>
        </div>
      </motion.div>
    </section>
  );
}
