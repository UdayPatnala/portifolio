import { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 100;
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
    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ctx = canvas.getContext('2d');
    const particleCount = isMobile ? 40 : PARTICLE_COUNT;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from(
        { length: particleCount },
        () => new Particle(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
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

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseenter', onMouseEnter);
    } else {
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    }

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
        const distSqr = dx * dx + dy * dy;
        const attractSqr = CURSOR_ATTRACT_DIST * CURSOR_ATTRACT_DIST;

        if (distSqr < attractSqr && distSqr > 0) {
          const dist = Math.sqrt(distSqr);
          const force = (CURSOR_ATTRACT_DIST - dist) / CURSOR_ATTRACT_DIST;
          p.vx += (dx / dist) * force * 0.018;
          p.vy += (dy / dist) * force * 0.018;
          const speedSqr = p.vx * p.vx + p.vy * p.vy;
          if (speedSqr > 1.96) { // 1.4 * 1.4 = 1.96
            const speed = Math.sqrt(speedSqr);
            p.vx = (p.vx / speed) * 1.4;
            p.vy = (p.vy / speed) * 1.4;
          }
        }
        p.update(w, h);
      });

      // Particle-to-particle lines
      const connectSqr = CONNECTION_DIST * CONNECTION_DIST;
      const cConnectSqr = CONNECTION_DIST * CONNECTION_DIST * 1.44; // 1.2 * 1.2 = 1.44

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSqr = dx * dx + dy * dy;

          if (distSqr < connectSqr) {
            const dist = Math.sqrt(distSqr);
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
        const cdistSqr = cdx * cdx + cdy * cdy;

        if (cdistSqr < cConnectSqr) {
          const cdist = Math.sqrt(cdistSqr);
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
        if (!isMobile) {
          window.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseleave', onMouseLeave);
          document.removeEventListener('mouseenter', onMouseEnter);
          document.body.classList.remove('custom-cursor-active');
        } else {
          window.removeEventListener('touchstart', onTouchStart);
          window.removeEventListener('touchmove', onTouchMove);
          window.removeEventListener('touchend', onTouchEnd);
          window.removeEventListener('touchcancel', onTouchEnd);
        }
      };
    }, [isMobile]);

  return (
    <>
      {/* Constellation canvas — behind all content */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Bright cursor dot — always on top, desktop only */}
      {!isMobile && (
        <div
          ref={dotRef}
          className="custom-cursor-dot fixed top-0 left-0 pointer-events-none"
          style={{
            zIndex: 9999,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 0%, #34d399 45%, rgba(16,185,129,0) 100%)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            willChange: 'transform',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
