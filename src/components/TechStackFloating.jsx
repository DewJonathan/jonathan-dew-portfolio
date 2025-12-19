// src/components/TechStackFloating.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLOR_FILTERS = {
  "#61DAFB": "invert(77%) sepia(45%) saturate(4963%) hue-rotate(174deg) brightness(100%) contrast(101%)",
  "#5FA04E": "invert(34%) sepia(50%) saturate(330%) hue-rotate(80deg) brightness(95%) contrast(90%)",
  "#000000": "invert(0%)",
  "#336791": "invert(30%) sepia(85%) saturate(400%) hue-rotate(212deg) brightness(95%) contrast(90%)",
  "#3776AB": "invert(42%) sepia(35%) saturate(650%) hue-rotate(186deg) brightness(92%) contrast(88%)",
  "#3BABC3": "invert(52%) sepia(30%) saturate(2300%) hue-rotate(163deg) brightness(90%) contrast(92%)",
  "#06B6D4": "invert(47%) sepia(83%) saturate(4500%) hue-rotate(163deg) brightness(94%) contrast(95%)",
  "#F7DF1E": "invert(89%) sepia(88%) saturate(7450%) hue-rotate(2deg) brightness(101%) contrast(101%)",
  "#2496ED": "invert(48%) sepia(77%) saturate(4100%) hue-rotate(192deg) brightness(97%) contrast(92%)",
    "#007396": "invert(42%) sepia(70%) saturate(3800%) hue-rotate(190deg) brightness(95%) contrast(92%)",  

};

// Generate non-overlapping icons with precomputed hover rotation
function generateIcons(count, width, height, radius = 32, padding = 16) {
  const icons = [];
  const maxAttempts = 300;

  for (let i = 0; i < count; i++) {
    let x, y, attempts = 0;
    do {
      x = Math.random() * (width - radius * 2 - padding * 2) + radius + padding;
      y = Math.random() * (height - radius * 2 - padding * 2) + radius + padding;
      attempts++;
    } while (
      icons.some(pos => Math.hypot(pos.x - x, pos.y - y) < radius * 2 + padding) &&
      attempts < maxAttempts
    );

    icons.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.15, // gentle drift
      vy: (Math.random() - 0.5) * 0.15,
      radius,
      hoverRotate: (Math.random() * 6 - 3), // precompute hover rotation
    });
  }

  return icons;
}

export default function TechStackFloating({ techStack }) {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [icons, setIcons] = useState([]);

  // Detect container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize icons once container size is known
  useEffect(() => {
    if (containerSize.width && containerSize.height) {
      setIcons(generateIcons(techStack.length, containerSize.width, containerSize.height));
    }
  }, [techStack.length, containerSize]);

  // Animate floating with collisions
  useEffect(() => {
    if (!icons.length) return;
    let frame;

    const animate = () => {
      setIcons(prev =>
        prev.map((icon, i, arr) => {
          let { x, y, vx, vy, radius, hoverRotate } = icon;

          // Gentle drift
          x += vx;
          y += vy;

          // Bounce off walls
          if (x - radius < 0 || x + radius > containerSize.width) vx = -vx;
          if (y - radius < 0 || y + radius > containerSize.height) vy = -vy;

          // Collision avoidance
          arr.forEach((other, j) => {
            if (i === j) return;
            const dx = x - other.x;
            const dy = y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = radius + other.radius + 8;
            if (dist < minDist && dist > 0) {
              const push = (minDist - dist) / dist * 0.5;
              x += dx * push;
              y += dy * push;
              vx += dx * push * 0.005;
              vy += dy * push * 0.005;
            }
          });

          // Clamp inside container
          x = Math.max(radius, Math.min(containerSize.width - radius, x));
          y = Math.max(radius, Math.min(containerSize.height - radius, y));

          return { x, y, vx, vy, radius, hoverRotate };
        })
      );

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [icons, containerSize]);

  return (
    <div ref={containerRef} className="hidden md:block relative w-full h-96">
      {icons.map((icon, i) => {
        const tech = techStack[i];
        if (!tech) return null;
        const { x, y, radius, hoverRotate } = icon;
        const filter = COLOR_FILTERS[tech.color] || "invert(0%)";

        return (
          <motion.div
            key={tech.name}
            className="absolute cursor-pointer"
            style={{ top: y - radius, left: x - radius }}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: containerSize.width - radius * 2,
              bottom: containerSize.height - radius * 2,
            }}
            whileHover={{ scale: 1.2, rotate: hoverRotate }}
          >
            <div className="group relative w-16 h-16 flex items-center justify-center rounded-xl shadow-md bg-gray-800/70">
              <img
  src={tech.icon}
  alt={tech.name}
  className="
    w-10 h-10 cursor-grab transition-all duration-300
    drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] 
    group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
  "
  style={{ filter: "grayscale(100%)" }}
  onMouseEnter={e => (e.currentTarget.style.filter = filter)}
  onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(100%)")}
  draggable={false}
/>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {tech.name}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
