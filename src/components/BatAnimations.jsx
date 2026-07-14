import { useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';

const BAT_SVG = (color = '#FBBF24', scale = 1) => (
  <svg width={32 * scale} height={16 * scale} viewBox="0 0 100 50" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C50 0 47 8 42 12C37 16 32 17 27 16C22 15 18 13 14 12C10 11 7 11 5 12C3 13 2 15 2 15C2 15 3 18 6 21C9 24 12 25 14 24C12 27 9 31 6 35C6 35 10 33 15 30C18 28 21 26 24 25C27 24 30 24 33 25C36 26 39 28 42 31C45 34 48 38 50 42C52 38 55 34 58 31C61 28 64 26 67 25C70 24 73 24 76 25C79 26 82 28 85 30C90 33 94 35 94 35C91 31 88 27 86 24C88 25 91 24 94 21C97 18 98 15 98 15C98 15 97 13 95 12C93 11 90 11 86 12C82 13 78 15 73 16C68 17 63 16 58 12C53 8 50 0 50 0Z"/>
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
