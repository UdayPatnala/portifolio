import React, { useEffect, useRef, useState } from 'react';

const DataScienceVisualizer = () => {
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

    // Grid details for the 3D surface
    const gridRows = 24;
    const gridCols = 24;
    const scale = 110;
    const perspective = 300;

    // Ball for gradient descent path
    let ballTime = 0;

    // Mathematical formula for the 3D loss surface (Sinc function: sin(r)/r)
    const computeHeight = (x, y) => {
      // Scale coordinates to fit visual boundaries
      const nx = x * 7;
      const ny = y * 7;
      const r = Math.hypot(nx, ny) + 0.0001;
      // Sinc function + subtle sine ripples
      return (Math.sin(r) / r) * 0.4;
    };

    // Project 3D points (x, y, z) into 2D space
    const project = (px, py, pz, rotX, rotY) => {
      // Rotate around Y-axis
      let x1 = px * Math.cos(rotY) - pz * Math.sin(rotY);
      let z1 = px * Math.sin(rotY) + pz * Math.cos(rotY);

      // Rotate around X-axis
      let y2 = py * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = py * Math.sin(rotX) + z1 * Math.cos(rotX);

      // Add depth offset
      const depthOffset = 1.8;
      const sz = z2 + depthOffset;

      // Perspective projection
      const screenX = width / 2 + (x1 * scale * perspective) / (perspective + sz);
      const screenY = height / 2 + (y2 * scale * perspective) / (perspective + sz);

      return { x: screenX, y: screenY, z: sz };
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw mathematical grid boundary
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.fillText("LOSS LANDSCAPE: OPTIMIZATION MODEL v4.0", 8, 12);
      ctx.fillText("ALGORITHM: STOCHASTIC GRADIENT DESCENT", 8, 22);

      // Rotate slightly over time automatically if not dragging
      const currentRotX = rotation.x;
      const currentRotY = isDraggingRef.current 
        ? rotation.y 
        : rotation.y + Math.sin(Date.now() * 0.0002) * 0.15 + (Date.now() * 0.0001) % (Math.PI * 2);

      // Pre-compute grid vertices
      const vertices = [];
      for (let r = 0; r <= gridRows; r++) {
        vertices[r] = [];
        const y = (r / gridRows) - 0.5; // Normalized range [-0.5, 0.5]
        for (let c = 0; c <= gridCols; c++) {
          const x = (c / gridCols) - 0.5;
          const z = computeHeight(x, y);
          // Coordinates: x, height (as -z), depth
          vertices[r][c] = project(x, -z, y, currentRotX, currentRotY);
        }
      }

      // Draw mesh lines
      ctx.lineWidth = 0.5;
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const p1 = vertices[r][c];
          const p2 = vertices[r][c + 1];
          const p3 = vertices[r + 1][c];

          // Calculate height-based coloring for matrix feel
          const avgZ = (p1.z + p2.z + p3.z) / 3;
          const greenVal = Math.floor(Math.max(50, Math.min(255, 280 - avgZ * 100)));
          ctx.strokeStyle = `rgba(16, ${greenVal}, 129, 0.18)`;

          // Draw horizontal line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Draw vertical line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.stroke();
        }
      }

      // Simulate gradient descent ball rolling down the surface
      ballTime += 0.005;
      // Spiral inward to simulate descent to global minimum
      const radius = 0.45 * Math.exp(-0.2 * (ballTime % 10)); 
      const angle = (ballTime % 10) * 3;
      const bx = radius * Math.cos(angle);
      const by = radius * Math.sin(angle);
      const bz = computeHeight(bx, by);

      const ballProjected = project(bx, -bz - 0.03, by, currentRotX, currentRotY);

      // Draw descent path trace line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      // Draw a line down the center vector
      const centerProj = project(0, 0, 0, currentRotX, currentRotY);
      ctx.moveTo(centerProj.x, centerProj.y);
      ctx.lineTo(ballProjected.x, ballProjected.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw glowing optimizer node
      ctx.beginPath();
      ctx.arc(ballProjected.x, ballProjected.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)'; // Red highlight
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ef4444';
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      // Draw outer pulse
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ballProjected.x, ballProjected.y, 7 + Math.sin(Date.now() * 0.01) * 2, 0, Math.PI * 2);
      ctx.stroke();

      // Text status overlay
      ctx.font = '7px monospace';
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.fillText(`OPTIMIZER STATE: CONVERGING`, 8, height - 12);
      ctx.fillText(`MINIMA LOSS: ${(radius * radius).toFixed(5)}`, 8, height - 4);

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    // Canvas Mouse listeners for drag-rotation controls
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
  }, [rotation]);

  return (
    <div className="flex flex-col items-center justify-center p-4 glass-panel border border-emerald-500/10 rounded-2xl shadow-lg bg-black/60 relative group cursor-grab active:cursor-grabbing">
      <div className="absolute top-2 right-2 text-[8px] font-mono px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
        INTERACTIVE 3D
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        className="block bg-transparent"
      />
      <span className="text-[9px] font-mono text-gray-500 mt-2 block">
        Drag to rotate coordinates
      </span>
    </div>
  );
};

export default DataScienceVisualizer;
