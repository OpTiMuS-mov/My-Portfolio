import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

const AutobotLogoFull = ({ progress }) => (
  <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#E31937' }} />
        <stop offset="50%" style={{ stopColor: '#0066CC' }} />
        <stop offset="100%" style={{ stopColor: '#00D4FF' }} />
      </linearGradient>
      <filter id="splashGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g opacity={progress} transform={`scale(${0.5 + progress * 0.5})`} style={{ transformOrigin: '50px 50px', transition: 'transform 0.1s' }}>
      <path d="M50 5 L65 25 L85 18 L78 40 L98 45 L80 55 L92 75 L68 65 L58 90 L50 72 L42 90 L32 65 L8 75 L20 55 L2 45 L22 40 L15 18 L35 25 Z" fill="url(#splashGrad)" stroke="#00D4FF" strokeWidth="1.5" filter="url(#splashGlow)"/>
      <path d="M50 28 L58 42 L50 52 L42 42 Z" fill="#00D4FF" opacity={0.3 + progress * 0.7}/>
      <line x1="50" y1="52" x2="50" y2="68" stroke="#00D4FF" strokeWidth="2.5" opacity={progress * 0.7}/>
      <line x1="42" y1="42" x2="30" y2="52" stroke="#E31937" strokeWidth="2" opacity={progress * 0.8}/>
      <line x1="58" y1="42" x2="70" y2="52" stroke="#E31937" strokeWidth="2" opacity={progress * 0.8}/>
    </g>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity={progress * 0.3} strokeDasharray="4 4">
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="50" r="46" fill="none" stroke="#E31937" strokeWidth="0.3" opacity={progress * 0.2} strokeDasharray="8 4">
      <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="5s" repeatCount="indefinite"/>
    </circle>
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <line
        key={i}
        x1="50" y1="50"
        x2={50 + Math.cos(angle * Math.PI / 180) * 48}
        y2={50 + Math.sin(angle * Math.PI / 180) * 48}
        stroke="#00D4FF"
        strokeWidth="0.3"
        opacity={progress * 0.15}
      />
    ))}
  </svg>
);

export default function AutobotSplash({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const start = Date.now();
    const totalDuration = 3200;

    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / totalDuration, 1);

      if (p < 0.05) {
        setPhase(0);
        setProgress(p / 0.05);
      } else if (p < 0.4) {
        setPhase(1);
        setProgress((p - 0.05) / 0.35);
      } else if (p < 0.65) {
        setPhase(2);
        setProgress((p - 0.4) / 0.25);
      } else if (p < 0.85) {
        setPhase(3);
        setProgress((p - 0.65) / 0.2);
      } else {
        setPhase(4);
        setProgress((p - 0.85) / 0.15);
      }

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0E14',
        transition: 'opacity 0.4s ease',
        opacity: phase >= 4 ? 0 : 1,
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <Box key={i} sx={{
            position: 'absolute',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            width: 2,
            height: 2,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#E31937' : i % 3 === 1 ? '#0066CC' : '#00D4FF',
            opacity: phase >= 1 ? 0.3 : 0,
            transition: 'opacity 0.8s ease',
            boxShadow: `0 0 ${6 + Math.random() * 8}px currentColor`,
            animation: phase >= 1 ? `float ${2 + Math.random() * 3}s ease-in-out ${Math.random()}s infinite` : 'none',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)', opacity: 0.2 },
              '50%': { transform: `translateY(-${10 + Math.random() * 15}px)`, opacity: 0.5 },
            },
          }} />
        ))}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: phase >= 2 ? 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 60%)' : 'none',
          transition: 'all 1s ease',
        }} />
      </Box>

      <Box sx={{
        position: 'relative',
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 2 ? `scale(${1 + phase * 0.05})` : 'scale(1)',
        transition: 'all 0.5s ease',
      }}>
        <AutobotLogoFull progress={progress} />
      </Box>

      <Typography sx={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: { xs: '1.2rem', md: '1.8rem' },
        fontWeight: 800,
        letterSpacing: 8,
        mt: 4,
        background: 'linear-gradient(135deg, #E31937, #0066CC, #00D4FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease 0.2s',
        textTransform: 'uppercase',
      }}>
        {phase < 2 ? 'Initializing...' : phase < 3 ? 'Autobots' : 'Transform & Roll Out'}
      </Typography>

      <Box sx={{
        mt: 3,
        width: 200,
        height: 2,
        background: '#1E2A3A',
        borderRadius: 1,
        overflow: 'hidden',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <Box sx={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #E31937, #0066CC, #00D4FF)',
          borderRadius: 1,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px #00D4FF',
        }} />
      </Box>

      <Box sx={{
        position: 'absolute',
        bottom: 30,
        display: 'flex',
        gap: 1,
        opacity: phase >= 1 ? 0.4 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00D4FF',
            animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            '@keyframes dotPulse': {
              '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
              '50%': { opacity: 1, transform: 'scale(1.2)' },
            },
          }} />
        ))}
      </Box>
    </Box>
  );
}
