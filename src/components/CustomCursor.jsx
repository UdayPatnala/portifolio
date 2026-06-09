import { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 60;
const CONNECTION_DIST = 120;
const CURSOR_ATTRACT_DIST = 140;
const PARTICLE_SPEED = 0.35;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(w, h) {
    this.reset(w, h);
  }
  reset(w, h) {
    this.x = randomBetween(0, w);
    this.y = randomBetween(0, h);
    this.vx = randomBetween(-PARTICLE_SPEED, PARTICLE_SPEED);
    this.vy = randomBetween(-PARTICLE_SPEED, PARTICLE_SPEED);
    this.r = randomBetween(1.5, 3);
    this.opacity = randomBetween(0.4, 0.9);
  }
  update(w, h) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }
}

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const mobile =
        window.matchMedia('(max-width: 1024px)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      if (!mobile) document.body.classList.add('custom-cursor-active');
      else document.body.classList.remove('custom-cursor-active');
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        () => new Particle(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Move DOM cursor dot instantly
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
        dot.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      if (dot) dot.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (dot) dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      particles.forEach((p) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_ATTRACT_DIST && dist > 0) {
          const force = (CURSOR_ATTRACT_DIST - dist) / CURSOR_ATTRACT_DIST;
          p.vx += (dx / dist) * force * 0.018;
          p.vy += (dy / dist) * force * 0.018;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.4) {
            p.vx = (p.vx / speed) * 1.4;
            p.vy = (p.vy / speed) * 1.4;
          }
        }
        p.update(w, h);
      });

      // Particle-to-particle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Cursor-to-particle lines
        const cdx = mx - particles[i].x;
        const cdy = my - particles[i].y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < CONNECTION_DIST * 1.2) {
          const alpha = (1 - cdist / (CONNECTION_DIST * 1.2)) * 0.55;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw particles (dots)
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Constellation canvas — behind all content */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Bright cursor dot — always on top */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9999,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 0%, #34d399 45%, rgba(16,185,129,0) 100%)',
          boxShadow: '0 0 10px 4px rgba(52,211,153,0.7), 0 0 22px 8px rgba(16,185,129,0.35)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
