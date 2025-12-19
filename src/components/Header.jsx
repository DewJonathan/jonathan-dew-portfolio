import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      <div
        className={`
          transition-all duration-300
          backdrop-blur-md
          ${
            scrolled
              ? "bg-gray-950/80 border-b border-white/10"
              : "bg-gray-950/30 border-b border-white/5"
          }
        `}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Brand */}
          <span className="text-xl font-extrabold tracking-[0.2em] text-white">
            DEW<span className="text-white/60">STACK</span>
          </span>

          {/* Nav */}
          <ul className="flex gap-8 text-sm text-gray-300">
            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-white transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>

        </nav>
      </div>
    </header>
  );
}
