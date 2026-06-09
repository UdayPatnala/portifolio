import { useEffect, useRef } from 'react';

const ParticleBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 160 };
    let smoothMouse = { x: 0, y: 0 };
    let gridOffset = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1.2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.updateColor();
      }

      updateColor() {
        // Data science colors synchronized to theme
        this.color = isDarkMode 
          ? (Math.random() > 0.4 ? 'rgba(16, 185, 129, 0.45)' : 'rgba(0, 245, 212, 0.45)') 
          : (Math.random() > 0.4 ? 'rgba(16, 120, 80, 0.45)' : 'rgba(6, 100, 180, 0.45)');
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce borders
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        // Proximity attraction to simulate gravitational cluster pulls
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSqr = dx * dx + dy * dy;
          const radiusSqr = mouse.radius * mouse.radius;

          if (distSqr < radiusSqr) {
            const distance = Math.sqrt(distSqr);
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / (distance || 0.001)) * force * 0.5;
            this.y += (dy / (distance || 0.001)) * force * 0.5;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const numberOfParticles = isMobile ? 35 : 90;

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const drawLines = () => {
      const maxDistance = 115;
      const maxDistSqr = maxDistance * maxDistance;
      const mouseRadiusSqr = mouse.radius * mouse.radius;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSqr = dx * dx + dy * dy;

          if (distSqr < maxDistSqr) {
            const distance = Math.sqrt(distSqr);
            const alpha = (1 - distance / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Draw node edge lines
            ctx.strokeStyle = isDarkMode 
              ? `rgba(16, 185, 129, ${alpha})` 
              : `rgba(16, 120, 80, ${alpha * 1.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw line connecting node to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distSqr = dx * dx + dy * dy;

          if (distSqr < mouseRadiusSqr) {
            const distance = Math.sqrt(distSqr);
            const alpha = (1 - distance / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDarkMode 
              ? `rgba(0, 245, 212, ${alpha})` 
              : `rgba(6, 100, 180, ${alpha * 1.3})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawCyberGrid = () => {
      const horizon = canvas.height * 0.45;
      const linesCount = 15;
      
      gridOffset = (gridOffset + 0.2) % 40;
      
      // Horizontal perspective grid lines scrolling forward
      for (let i = 0; i <= linesCount; i++) {
        const ratio = (i + gridOffset / 40) / linesCount;
        const y = horizon + (canvas.height - horizon) * Math.pow(ratio, 2.8);
        const baseAlpha = isDarkMode ? 0.06 : 0.08;
        const alpha = Math.min(1, ratio) * baseAlpha; // Fades out towards horizon
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = isDarkMode 
          ? `rgba(16, 185, 129, ${alpha})` 
          : `rgba(16, 120, 80, ${alpha * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      
      // Vertical converging grid lines
      const vLinesCount = 30;
      const centerX = canvas.width / 2;
      for (let i = 0; i <= vLinesCount; i++) {
        const ratio = i / vLinesCount;
        const startX = canvas.width * ratio;
        
        ctx.beginPath();
        ctx.moveTo(centerX, horizon);
        ctx.lineTo(startX, canvas.height);
        ctx.strokeStyle = isDarkMode 
          ? 'rgba(16, 185, 129, 0.03)' 
          : 'rgba(16, 120, 80, 0.03)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    const animate = () => {
      // Dynamic background base color
      ctx.fillStyle = isDarkMode ? '#03060a' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the scrolling 3D grid in the background
      drawCyberGrid();

      // Smooth mouse coordinates tracking for parallax effects
      if (mouse.x !== null && mouse.y !== null) {
        smoothMouse.x += (mouse.x - canvas.width / 2 - smoothMouse.x) * 0.07;
        smoothMouse.y += (mouse.y - canvas.height / 2 - smoothMouse.y) * 0.07;
      } else {
        smoothMouse.x += (0 - smoothMouse.x) * 0.07;
        smoothMouse.y += (0 - smoothMouse.y) * 0.07;
      }

      // Particles loop
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 w-full h-full block pointer-events-none transition-colors duration-300 ${
        isDarkMode ? 'bg-[#03060a]' : 'bg-[#f8fafc]'
      }`}
    />
  );
};

export default ParticleBackground;
