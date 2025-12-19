import { motion } from "framer-motion";

export default function Hero() {
  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-6 overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl"
        variants={floatVariants}
        animate="float"
      >
        {/* Name — subtle glow on hover */}
        <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6
                      hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
                      transition-all duration-300 cursor-pointer">
          Jonathan Dew
        </p>

        {/* Primary headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-snug tracking-tight mb-10">
          Building thoughtful{" "}
          <span className="block md:inline text-white/70">
            web experiences
          </span>
        </h1>

        {/* Supporting description */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
          Full-stack developer focused on clean React frontends, scalable APIs, and products built for real users.
        </p>

        {/* CTA */}
        <a
          href="#projects"
          className="inline-block border border-white/60 px-8 py-3 rounded-md
                     hover:bg-white/20 hover:text-white transition-all transform hover:scale-105"
        >
          View Projects
        </a>
      </motion.div>
    </section>
  );
}
