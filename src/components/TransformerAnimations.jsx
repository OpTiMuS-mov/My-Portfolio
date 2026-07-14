import { useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';

const CYBERTRONIAN_GLYPHS = [
  '\u25C6', '\u25C7', '\u25CA', '\u25CB', '\u25CF', '\u25D0', '\u25D1',
  '\u2666', '\u2667', '\u2726', '\u2727', '\u2728', '\u2736', '\u2737',
  '\u2738', '\u2742', '\u2743', '\u2756', '\u2B21', '\u2B22', '\u2B23',
  '\u2780', '\u2781', '\u2782', '\u2783', '\u2784', '\u2785', '\u2786',
  '\u29BF', '\u29C0', '\u29C1', '\u2B1F', '\u2B20', '\u2BC1',
  '\u{1F700}', '\u{1F701}', '\u{1F702}', '\u{1F703}', '\u{1F704}',
  '\u{1F70D}', '\u{1F70E}', '\u{1F70F}', '\u{1F710}', '\u{1F711}',
  '\u0391', '\u0392', '\u0393', '\u0394', '\u0395', '\u0396',
];

const MatrixColumn = ({ x, speed, delay, glyphs, fontSize }) => {
  const colRef = useRef(null);

  useEffect(() => {
    if (!colRef.current) return;
    let frame;
    let y = -fontSize * glyphs.length;
    const tick = () => {
      y += speed;
      if (colRef.current) {
        colRef.current.style.transform = `translateY(${y}px)`;
      }
      if (y > window.innerHeight + fontSize * glyphs.length) {
        y = -fontSize * glyphs.length;
      }
      frame = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => { frame = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [speed, delay, glyphs.length, fontSize]);

  return (
    <Box
      ref={colRef}
      sx={{
        position: 'absolute',
        left: x,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {glyphs.map((glyph, i) => (
        <Box
          key={i}
          sx={{
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', monospace",
            color: i === 0 ? '#00FFCC' : i < 3 ? '#00D4FF' : '#0066CC40',
            opacity: i === 0 ? 1 : Math.max(0, 1 - i * 0.08),
            textShadow: i === 0 ? '0 0 12px #00D4FF, 0 0 24px #0066CC' : 'none',
            lineHeight: 1.2,
            transition: 'color 0.1s',
          }}
        >
          {glyph}
        </Box>
      ))}
    </Box>
  );
};

const MatrixOfLeadership = () => {
  const columns = useMemo(() => {
    const cols = [];
    const count = Math.floor(window.innerWidth / 28);
    for (let i = 0; i < count; i++) {
      const len = 8 + Math.floor(Math.random() * 15);
      const glyphs = [];
      for (let j = 0; j < len; j++) {
        glyphs.push(CYBERTRONIAN_GLYPHS[Math.floor(Math.random() * CYBERTRONIAN_GLYPHS.length)]);
      }
      cols.push({
        id: i,
        x: i * 28 + Math.random() * 8,
        speed: 0.4 + Math.random() * 0.8,
        delay: Math.random() * 8000,
        glyphs,
        fontSize: 12 + Math.floor(Math.random() * 4),
      });
    }
    return cols;
  }, []);

  return (
    <Box sx={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      opacity: 0.12,
    }}>
      {columns.map((col) => (
        <MatrixColumn key={col.id} {...col} />
      ))}
    </Box>
  );
};

const FloatingGears = () => {
  const GearSVG = ({ size = 20, color = '#00D4FF40', speed = 8 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ animation: `gearSpin ${speed}s linear infinite` }}>
      <path d="M50 10 L55 25 L70 15 L65 30 L85 25 L72 38 L95 42 L75 50 L95 58 L72 62 L85 75 L65 70 L70 85 L55 75 L50 90 L45 75 L30 85 L35 70 L15 75 L28 62 L5 58 L25 50 L5 42 L28 38 L15 25 L35 30 L30 15 L45 25 Z" fill={color} stroke={color.replace('40', '80')} strokeWidth="1"/>
      <circle cx="50" cy="50" r="12" fill="none" stroke={color.replace('40', '60')} strokeWidth="2"/>
      <circle cx="50" cy="50" r="5" fill={color.replace('40', '80')}/>
    </svg>
  );

  const gears = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      y: 5 + Math.random() * 85,
      x: Math.random() * 95,
      size: 12 + Math.random() * 20,
      speed: 6 + Math.random() * 8,
      reverse: Math.random() > 0.5,
    }))
  ).current;

  return (
    <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {gears.map((gear) => (
        <Box
          key={gear.id}
          sx={{
            position: 'absolute',
            top: `${gear.y}%`,
            left: `${gear.x}%`,
            opacity: 0.06,
            animation: `floatDebris ${gear.duration}s ease-in-out ${gear.delay}s infinite`,
            transform: gear.reverse ? 'scaleX(-1)' : 'none',
          }}
        >
          <GearSVG size={gear.size} speed={gear.speed} color={gear.id % 3 === 0 ? '#E3193740' : gear.id % 3 === 1 ? '#0066CC40' : '#00D4FF40'} />
        </Box>
      ))}
    </Box>
  );
};

const CursorTrail = () => {
  const containerRef = useRef(null);

  const createTrail = (x, y) => {
    if (!containerRef.current) return;
    const isSpark = Math.random() > 0.6;
    const dot = document.createElement('div');

    if (isSpark) {
      const colors = ['#E31937', '#0066CC', '#00D4FF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      dot.innerHTML = `<svg width="${8 + Math.random() * 6}" height="${8 + Math.random() * 6}" viewBox="0 0 20 20"><polygon points="10,0 12,7 20,7 14,12 16,20 10,15 4,20 6,12 0,7 8,7" fill="${color}" opacity="0.8"/></svg>`;
      dot.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px;
        pointer-events: none; z-index: 9999; opacity: 0.7;
        transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
        transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
    } else {
      const size = 3 + Math.random() * 4;
      const colors = [`radial-gradient(circle, #E31937, #AA1028)`, `radial-gradient(circle, #00D4FF, #0088AA)`, `radial-gradient(circle, #0066CC, #004488)`];
      dot.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%; pointer-events: none; z-index: 9999;
        box-shadow: 0 0 ${size * 2}px currentColor, 0 0 ${size * 4}px rgba(0,212,255,0.3);
        opacity: 0.8; transform: translate(-50%, -50%) scale(1);
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
    }

    containerRef.current.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = `translate(-50%, -50%) scale(0) translateY(-${20 + Math.random() * 30}px) rotate(${Math.random() * 180 - 90}deg)`;
    });
    setTimeout(() => dot.remove(), 900);
  };

  useEffect(() => {
    let lastX = 0, lastY = 0, frameCount = 0;
    const handleMouseMove = (e) => {
      frameCount++;
      if (frameCount % 2 !== 0) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) > 8) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <Box ref={containerRef} sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
};

const EnergyOverlay = () => (
  <Box sx={{
    position: 'fixed', top: -200, left: '50%', width: 400, height: 400,
    pointerEvents: 'none', zIndex: 0, opacity: 0.04,
    animation: 'circuitPulse 8s ease-in-out infinite',
    background: 'radial-gradient(circle, #00D4FF 0%, #0066CC 30%, transparent 70%)',
    borderRadius: '50%', filter: 'blur(40px)', transform: 'translateX(-50%)',
  }} />
);

const ScanLine = () => (
  <Box sx={{
    position: 'fixed', left: 0, right: 0, height: 2,
    background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.15) 20%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.15) 80%, transparent 100%)',
    pointerEvents: 'none', zIndex: 9998,
    animation: 'scanLine 8s linear infinite', filter: 'blur(1px)',
  }} />
);

export default function TransformerAnimations() {
  return (
    <>
      <MatrixOfLeadership />
      <FloatingGears />
      <CursorTrail />
      <EnergyOverlay />
      <ScanLine />
    </>
  );
}
