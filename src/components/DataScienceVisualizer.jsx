import React, { useEffect, useRef, useState } from 'react';

const DataScienceVisualizer = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.6 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = canvas.width = 320;
    let height = canvas.height = 240;

    const gridRows = 24;
    const gridCols = 24;
    const scale = 110;
    const perspective = 300;

    let ballTime = 0;

    const computeHeight = (x, y) => {
      const nx = x * 7;
      const ny = y * 7;
      const r = Math.hypot(nx, ny) + 0.0001;
      return (Math.sin(r) / r) * 0.4;
    };

    const project = (px, py, pz, rotX, rotY) => {
      let x1 = px * Math.cos(rotY) - pz * Math.sin(rotY);
      let z1 = px * Math.sin(rotY) + pz * Math.cos(rotY);

      let y2 = py * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = py * Math.sin(rotX) + z1 * Math.cos(rotX);

      const depthOffset = 1.8;
      const sz = z2 + depthOffset;

      const screenX = width / 2 + (x1 * scale * perspective) / (perspective + sz);
      const screenY = height / 2 + (y2 * scale * perspective) / (perspective + sz);

      return { x: screenX, y: screenY, z: sz };
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Colors depending on active theme
      const textStyle = isDarkMode ? 'rgba(16, 185, 129, 0.4)' : 'rgba(4, 120, 87, 0.6)';
      const bgStrokeStyle = isDarkMode ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.12)';
      const ballColor = isDarkMode ? 'rgba(239, 68, 68, 0.9)' : 'rgba(220, 38, 38, 0.95)';
      const ballShadowColor = isDarkMode ? '#ef4444' : '#dc2626';
      const pathStyle = isDarkMode ? 'rgba(239, 68, 68, 0.4)' : 'rgba(220, 38, 38, 0.5)';
      const statusStyle = isDarkMode ? 'rgba(239, 68, 68, 0.8)' : 'rgba(220, 38, 38, 0.85)';

      // Draw mathematical grid boundary
      ctx.strokeStyle = bgStrokeStyle;
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);
      ctx.font = '8px monospace';
      ctx.fillStyle = textStyle;
      ctx.fillText("LOSS LANDSCAPE: OPTIMIZATION MODEL v4.0", 8, 12);
      ctx.fillText("ALGORITHM: STOCHASTIC GRADIENT DESCENT", 8, 22);

      const currentRotX = rotation.x;
      const currentRotY = isDraggingRef.current 
        ? rotation.y 
        : rotation.y + Math.sin(Date.now() * 0.0002) * 0.15 + (Date.now() * 0.0001) % (Math.PI * 2);

      const vertices = [];
      for (let r = 0; r <= gridRows; r++) {
        vertices[r] = [];
        const y = (r / gridRows) - 0.5;
        for (let c = 0; c <= gridCols; c++) {
          const x = (c / gridCols) - 0.5;
          const z = computeHeight(x, y);
          vertices[r][c] = project(x, -z, y, currentRotX, currentRotY);
        }
      }

      ctx.lineWidth = 0.5;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const p1 = vertices[r][c];
          const p2 = vertices[r][c + 1];
          const p3 = vertices[r + 1][c];

          const avgZ = (p1.z + p2.z + p3.z) / 3;
          const greenVal = Math.floor(Math.max(50, Math.min(255, 280 - avgZ * 100)));
          
          ctx.strokeStyle = isDarkMode 
            ? `rgba(16, ${greenVal}, 129, 0.18)`
            : `rgba(4, ${Math.floor(greenVal * 0.7)}, 87, 0.24)`;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.stroke();
        }
      }

      ballTime += 0.005;
      const radius = 0.45 * Math.exp(-0.2 * (ballTime % 10)); 
      const angle = (ballTime % 10) * 3;
      const bx = radius * Math.cos(angle);
      const by = radius * Math.sin(angle);
      const bz = computeHeight(bx, by);

      const ballProjected = project(bx, -bz - 0.03, by, currentRotX, currentRotY);

      // Draw descent path trace line
      ctx.strokeStyle = pathStyle;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      const centerProj = project(0, 0, 0, currentRotX, currentRotY);
      ctx.moveTo(centerProj.x, centerProj.y);
      ctx.lineTo(ballProjected.x, ballProjected.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw glowing optimizer node
      ctx.beginPath();
      ctx.arc(ballProjected.x, ballProjected.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = ballColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = ballShadowColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw outer pulse
      ctx.strokeStyle = isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ballProjected.x, ballProjected.y, 7 + Math.sin(Date.now() * 0.01) * 2, 0, Math.PI * 2);
      ctx.stroke();

      // Text status overlay
      ctx.font = '7px monospace';
      ctx.fillStyle = statusStyle;
      ctx.fillText(`OPTIMIZER STATE: CONVERGING`, 8, height - 12);
      ctx.fillText(`MINIMA LOSS: ${(radius * radius).toFixed(5)}`, 8, height - 4);

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      previousMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const currentMouseX = e.clientX - rect.left;
      const currentMouseY = e.clientY - rect.top;

      const dx = currentMouseX - previousMouseRef.current.x;
      const dy = currentMouseY - previousMouseRef.current.y;

      setRotation((prev) => ({
        x: Math.max(-Math.PI/2, Math.min(Math.PI/2, prev.x + dy * 0.01)),
        y: prev.y + dx * 0.01
      }));

      previousMouseRef.current = {
        x: currentMouseX,
        y: currentMouseY
      };
    };

    const handleMouseUpOrLeave = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUpOrLeave);

    drawFrame();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpOrLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotation, isDarkMode]);

  return (
    <div className={`flex flex-col items-center justify-center p-4 glass-panel border rounded-2xl shadow-lg relative group cursor-grab active:cursor-grabbing transition-colors duration-300 ${
      isDarkMode ? 'border-emerald-500/10 bg-black/60' : 'border-emerald-500/20 bg-white/70'
    }`}>
      <div className="absolute top-2 right-2 text-[8px] font-mono px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded">
        INTERACTIVE 3D
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        className="block bg-transparent"
      />
      <span className={`text-[9px] font-mono mt-2 block ${
        isDarkMode ? 'text-gray-500' : 'text-slate-400'
      }`}>
        Drag to rotate coordinates
      </span>
    </div>
  );
};

export default DataScienceVisualizer;
