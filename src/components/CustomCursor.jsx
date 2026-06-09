import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse Coordinates (Exact cursor position)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth springs for the outer trailing x-ray cursor
  const trailX = useSpring(rawX, { stiffness: 280, damping: 26, mass: 0.6 });
  const trailY = useSpring(rawY, { stiffness: 280, damping: 26, mass: 0.6 });

  // Faster spring for the inner pointer dot to keep click precision instant
  const pointX = useSpring(rawX, { stiffness: 800, damping: 38 });
  const pointY = useSpring(rawY, { stiffness: 800, damping: 38 });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 1024px)').matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      if (!mobile) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e) => {
      // Center coordinates relative to cursor pointer
      // Outer container is 40px wide, so offset is -20px
      rawX.set(e.clientX - 20);
      rawY.set(e.clientY - 20);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], .interactive-target'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();
    };
  }, [rawX, rawY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Outer Trailing X-Ray Element (Diamond/Crosshair, inverts colors) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-50 mix-blend-difference flex items-center justify-center"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: clicked ? 0.75 : hovered ? 1.5 : 1.0,
          rotate: clicked ? 135 : hovered ? 90 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          className="text-white fill-none stroke-current" 
          strokeWidth="1.5"
        >
          {hovered ? (
            // Outer crosshair circle when hovering over buttons/links
            <>
              <circle cx="20" cy="20" r="14" strokeDasharray="3 3" />
              <line x1="20" y1="2" x2="20" y2="7" />
              <line x1="20" y1="33" x2="20" y2="38" />
              <line x1="2" y1="20" x2="7" y2="20" />
              <line x1="33" y1="20" x2="38" y2="20" />
            </>
          ) : (
            // Glowing outer diamond when idle
            <>
              <rect x="13" y="13" width="14" height="14" rx="2" transform="rotate(45 20 20)" />
            </>
          )}
        </svg>
      </motion.div>

      {/* 2. Inner High-Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 bg-[#10b981]"
        style={{
          x: pointX,
          y: pointY,
          // Center inside 40px outer container: offset 19px (40/2 - 2/2 = 19px)
          marginLeft: '19px',
          marginTop: '19px',
        }}
        animate={{
          scale: hovered ? 0 : 1, // Fades pointer dot out when snapping to buttons
          backgroundColor: clicked ? '#00f5d4' : '#10b981',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
