import { useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';

const BAT_SVG = (color = '#FBBF24', scale = 1) => (
  <svg width={24 * scale} height={16 * scale} viewBox="0 0 24 16" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C12 0 10.5 2 8.5 3.5C6.5 5 4 5.5 2 5C1 4.7 0 4 0 4C0 4 1 6 3 7.5C5 9 7 9 8 8.5C7 10 5 12 3 14C3 14 6 12.5 9 11C10.5 10.2 11.5 10 12 10C12.5 10 13.5 10.2 15 11C18 12.5 21 14 21 14C19 12 17 10 16 8.5C17 9 19 9 21 7.5C23 6 24 4 24 4C24 4 23 4.7 22 5C20 5.5 17.5 5 15.5 3.5C13.5 2 12 0 12 0Z"/>
  </svg>
);

const FlyingBats = () => {
  const bats = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      y: 10 + Math.random() * 70,
      size: 0.5 + Math.random() * 0.8,
      reverse: Math.random() > 0.5,
    }))
  ).current;

  return (
    <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {bats.map((bat) => (
        <Box
          key={bat.id}
          sx={{
            position: 'absolute',
            bottom: `${bat.y}%`,
            left: bat.reverse ? '100%' : '-5%',
            opacity: 0,
            animation: `${bat.reverse ? 'batFlyReverse' : 'batFly'} ${bat.duration}s linear ${bat.delay}s infinite`,
            filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.3))',
            '& svg': {
              animation: `batWing 0.3s ease-in-out infinite`,
            },
          }}
        >
          {BAT_SVG('#FBBF2480', bat.size)}
        </Box>
      ))}
    </Box>
  );
};

const CursorTrail = () => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createTrail = useCallback((x, y) => {
    if (!containerRef.current) return;
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: #FBBF24;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 6px #FBBF24, 0 0 12px rgba(251,191,36,0.4);
      transition: all 0.5s ease-out;
    `;
    containerRef.current.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0)';
    });
    setTimeout(() => dot.remove(), 500);
  }, []);

  useEffect(() => {
    let lastX = 0, lastY = 0;
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) > 15) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [createTrail]);

  return <Box ref={containerRef} sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
};

const BatSignalOverlay = () => (
  <Box sx={{
    position: 'fixed',
    top: -200,
    left: '50%',
    width: 400,
    height: 400,
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.03,
    animation: 'batSignalSweep 12s ease-in-out infinite',
    background: 'radial-gradient(circle, #FBBF24 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(40px)',
  }} />
);

export default function BatAnimations() {
  return (
    <>
      <FlyingBats />
      <CursorTrail />
      <BatSignalOverlay />
    </>
  );
}
