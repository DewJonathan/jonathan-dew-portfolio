// src/components/AnimatedBackground.jsx
import { useEffect, useRef } from "react";

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= width) this.vx *= -1;
    if (this.y <= 0 || this.y >= height) this.vy *= -1;
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const PARTICLE_COUNT = 60;
  const MAX_DISTANCE = 120;
  const CURSOR_RADIUS = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(width, height));
    }

    const mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    function animate() {
      // Semi-transparent background for trails
      ctx.fillStyle = "rgba(18, 12, 35, 0.85)";
      ctx.fillRect(0, 0, width, height);

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            let alpha = 1 - dist / MAX_DISTANCE;

            // Glow if near cursor
            if (mouse.x !== null && mouse.y !== null) {
              const d1 = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
              const d2 = Math.hypot(p2.x - mouse.x, p2.y - mouse.y);
              if (d1 < CURSOR_RADIUS || d2 < CURSOR_RADIUS) alpha = Math.min(1, alpha + 0.6);
            }

            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.shadowColor = "white";
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw glowing particles
      particles.forEach(p => {
        p.update(width, height);

        let particleSize = p.size;
        let opacity = 0.7;

        if (mouse.x !== null && mouse.y !== null) {
          const distance = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (distance < CURSOR_RADIUS) {
            particleSize += (CURSOR_RADIUS - distance) / 30;
            opacity = 1;
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
}
