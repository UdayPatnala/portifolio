import React, { useEffect, useRef } from 'react';

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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // 3D wireframe shapes datasets
    const octahedronModel = {
      vertices: [
        { x: 0, y: -65, z: 0 },
        { x: 0, y: 65, z: 0 },
        { x: -55, y: 0, z: -55 },
        { x: 55, y: 0, z: -55 },
        { x: 55, y: 0, z: 55 },
        { x: -55, y: 0, z: 55 }
      ],
      edges: [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 3], [3, 4], [4, 5], [5, 2]
      ]
    };

    const cubeModel = {
      vertices: [
        { x: -40, y: -40, z: -40 },
        { x: 40, y: -40, z: -40 },
        { x: 40, y: 40, z: -40 },
        { x: -40, y: 40, z: -40 },
        { x: -40, y: -40, z: 40 },
        { x: 40, y: -40, z: 40 },
        { x: 40, y: 40, z: 40 },
        { x: -40, y: 40, z: 40 }
      ],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 0], // back
        [4, 5], [5, 6], [6, 7], [7, 4], // front
        [0, 4], [1, 5], [2, 6], [3, 7]  // connectors
      ]
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
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 0.5;
            this.y += (dy / distance) * force * 0.5;
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
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
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
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
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

    const draw3DObject = (model, cx, cy, rotX, rotY, parallax, darkTheme) => {
      const projected = [];
      const fov = 350;

      model.vertices.forEach(v => {
        // Rotate coordinate geometry
        let x1 = v.x * Math.cos(rotY) - v.z * Math.sin(rotY);
        let z1 = v.x * Math.sin(rotY) + v.z * Math.cos(rotY);

        let y2 = v.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = v.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const zoom = fov / (fov + z2);
        // Apply smooth cursor parallax pulls
        const px = (x1 - parallax.x * 0.1) * zoom + cx;
        const py = (y2 - parallax.y * 0.1) * zoom + cy;

        projected.push({ x: px, y: py });
      });

      // Draw edges
      ctx.beginPath();
      model.edges.forEach(edge => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      });
      ctx.strokeStyle = darkTheme ? 'rgba(16, 185, 129, 0.14)' : 'rgba(16, 120, 80, 0.18)';
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // Draw tiny node vertices
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = darkTheme ? 'rgba(0, 245, 212, 0.35)' : 'rgba(6, 100, 180, 0.35)';
        ctx.fill();
      });
    };

    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      // Dynamic background base color
      ctx.fillStyle = isDarkMode ? '#03060a' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse coordinates tracking for parallax effects
      if (mouse.x !== null && mouse.y !== null) {
        smoothMouse.x += (mouse.x - canvas.width / 2 - smoothMouse.x) * 0.07;
        smoothMouse.y += (mouse.y - canvas.height / 2 - smoothMouse.y) * 0.07;
      } else {
        smoothMouse.x += (0 - smoothMouse.x) * 0.07;
        smoothMouse.y += (0 - smoothMouse.y) * 0.07;
      }

      // Draw 3D wireframe objects that tilt and rotate
      angleX += 0.003;
      angleY += 0.005;

      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        draw3DObject(octahedronModel, canvas.width * 0.84, canvas.height * 0.28, angleX, angleY, smoothMouse, isDarkMode);
        draw3DObject(cubeModel, canvas.width * 0.15, canvas.height * 0.74, -angleX * 0.8, -angleY * 0.8, smoothMouse, isDarkMode);
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
