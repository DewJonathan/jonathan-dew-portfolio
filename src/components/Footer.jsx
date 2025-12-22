import { motion } from "framer-motion";

export default function Footer() {
  const socials = [
    {
      name: "GitHub",
      icon: "/icons/github.svg",
      url: "https://github.com/DewJonathan",
      color: "#fff",
    },
    {
      name: "LinkedIn",
      icon: "/icons/InBug-Black.png",
      url: "https://www.linkedin.com/in/jonathandew/",
      color: "#0A66C2",
    },
  ];

  return (
    <footer className="relative z-10 py-8">
      <div className="flex justify-center gap-8">
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            {/* Icon background */}
            <div
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-gray-900/60 backdrop-blur-md shadow-md transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.7)]"
            >
              {/* Icon image */}
              <img
                src={social.icon}
                alt={social.name}
                className="w-6 h-6 transition-all duration-300 filter group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              />
            </div>

            {/* Tooltip */}
           <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
  <div className="bg-gray-900 text-gray-200 text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
    {social.name}
  </div>
</div>
          </motion.a>
        ))}
      </div>

      <p className="mt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Jonathan Dew
      </p>
    </footer>
  );
}
