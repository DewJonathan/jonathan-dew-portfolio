import { motion } from "framer-motion";
import ContactGlobe from "./ContactGlobe";

export default function Contact() {
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="relative py-20 px-6 overflow-hidden">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
    {/* 3D Globe (Left) */}
    <div className="flex-1 w-full h-96 md:h-100 order-1 md:order-1">
      <ContactGlobe />
    </div>

    {/* Contact Form (Right) */}
    <motion.div
      className="flex-1 text-center md:text-left bg-gray-900/60 backdrop-blur-md rounded-xl p-8 shadow-lg cursor-pointer order-2 md:order-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={formVariants}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0px 20px 40px rgba(255,255,255,0.15)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <motion.h2
        className="text-4xl font-bold mb-6 text-white"
        whileHover={{
          textShadow: `
            0 0 8px #7c3aed,
            0 0 16px #7c3aed,
            0 0 24px #7c3aed
          `,
        }}
        transition={{ duration: 0.3 }}
      >
        Contact
      </motion.h2>

          <p className="mb-8 text-gray-300">
            Have a question or want to work together? Reach out!
          </p>

          <form className="space-y-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded bg-gray-800/80 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/70 transition"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              required
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded bg-gray-800/80 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/70 transition"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              required
            />
            <motion.textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded bg-gray-800/80 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/70 transition"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              required
            />
            <motion.button
              type="submit"
              className="bg-white/90 text-gray-900 px-6 py-2 rounded transition"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,1)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
