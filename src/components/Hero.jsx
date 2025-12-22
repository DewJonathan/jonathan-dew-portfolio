import { motion } from "framer-motion";

export default function Hero() {
  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-6 overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl"
        variants={floatVariants}
        animate="float"
      >
        {/* Name — subtle glow on hover */}
        <a
          href="#about"
          className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6
             hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
             transition-all duration-300 cursor-pointer inline-block"
        >
          Jonathan Dew
        </a>

        {/* Primary headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-snug tracking-tight mb-10">
          Building thoughtful{" "}
          <motion.span
            className="block md:inline text-white/70 cursor-pointer"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 12px rgba(255,255,255,0.6)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            web experiences
          </motion.span>
        </h1>

        {/* Supporting description */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
          Full-stack developer focused on clean React frontends, scalable APIs,
          and products built for real users.
        </p>

        {/* CTA */}
        <motion.a
          href="#projects"
          className="
    relative inline-flex items-center justify-center
    px-9 py-3 rounded-lg font-medium tracking-wide
    border border-white/30 text-white
    backdrop-blur-sm
    overflow-hidden
  "
          whileHover={{
            y: -4,
            scale: 1.05,
            boxShadow: "0 0 25px rgba(168, 85, 247, 0.45)", // purple glow
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          {/* Glow layer */}
          <span
            className="
      absolute inset-0
      bg-linear-to-r from-purple-500/20 via-fuchsia-500/20 to-indigo-500/20
      opacity-0 hover:opacity-100
      transition-opacity duration-300
    "
          />

          {/* Button text */}
          <span className="relative z-10">View Projects</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
