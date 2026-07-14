import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Box, Typography, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const roles = ['Python Developer', 'Ethical Tech Advocate', 'Cyber Security Enthusiast', 'AI Learner', 'Autobot in Training'];

const AutobotSymbol = () => (
  <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.4)) drop-shadow(0 0 60px rgba(227,25,55,0.2))' }}>
    <defs>
      <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#E31937' }} />
        <stop offset="40%" style={{ stopColor: '#0066CC' }} />
        <stop offset="100%" style={{ stopColor: '#00D4FF' }} />
      </linearGradient>
      <filter id="heroGlow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M50 5 L65 25 L85 18 L78 40 L98 45 L80 55 L92 75 L68 65 L58 90 L50 72 L42 90 L32 65 L8 75 L20 55 L2 45 L22 40 L15 18 L35 25 Z" fill="url(#heroGrad)" stroke="#00D4FF" strokeWidth="1.5" filter="url(#heroGlow)"/>
    <path d="M50 28 L58 42 L50 52 L42 42 Z" fill="#00D4FF" opacity="0.9"/>
    <line x1="50" y1="52" x2="50" y2="68" stroke="#00D4FF" strokeWidth="2.5" opacity="0.7"/>
    <line x1="42" y1="42" x2="30" y2="52" stroke="#E31937" stroke-width="2" opacity="0.8"/>
    <line x1="58" y1="42" x2="70" y2="52" stroke="#E31937" stroke-width="2" opacity="0.8"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4">
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="50" r="46" fill="none" stroke="#E31937" strokeWidth="0.3" opacity="0.15" strokeDasharray="8 4">
      <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="30s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

export default function Hero() {
  const containerRef = useRef(null);
  const roleRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-particle', { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.05 })
        .fromTo('.hero-autobot-symbol', { opacity: 0, scale: 0, rotation: -180 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.4, ease: 'back.out(1.5)' }, 0.1)
        .fromTo('.hero-badge', { opacity: 0, y: 20, clipPath: 'circle(0% at 50% 50%)' }, { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8 }, 0.5)
        .fromTo('.hero-name', { opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 1 }, 0.7)
        .fromTo('.hero-role-wrapper', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo('.hero-bio', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 1.2)
        .fromTo('.hero-buttons', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 1.4)
        .fromTo('.hero-social', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.6)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.8);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (roleRef.current) {
      gsap.fromTo(
        roleRef.current,
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [roleIndex]);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Box sx={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <Box sx={{ position: 'absolute', bottom: '10%', left: '10%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(227,25,55,0.03)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', top: '40%', right: '15%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(0,102,204,0.03)', filter: 'blur(80px)' }} />

        {[...Array(25)].map((_, i) => (
          <Box
            key={i}
            className="hero-particle"
            sx={{
              position: 'absolute',
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              borderRadius: i % 4 === 0 ? '2px' : '50%',
              background: i % 4 === 0 ? '#E31937' : i % 4 === 1 ? '#0066CC' : '#00D4FF',
              opacity: 0,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
              boxShadow: `0 0 ${4 + Math.random() * 8}px ${i % 4 === 0 ? '#E31937' : i % 4 === 1 ? '#0066CC' : '#00D4FF'}50`,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 0.15 },
                '50%': { transform: `translateY(-${15 + Math.random() * 25}px)`, opacity: 0.5 },
              },
            }}
          />
        ))}

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background: 'linear-gradient(0deg, #0A0E14, transparent)',
            zIndex: 1,
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Box className="hero-autobot-symbol" sx={{ opacity: 0, mb: 3, display: 'flex', justifyContent: 'center', animation: 'transformGlow 4s ease-in-out infinite' }}>
          <AutobotSymbol />
        </Box>

        <Box className="hero-badge" sx={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, border: '1px solid #1E2A3A', borderRadius: 50, mb: 3, background: 'rgba(0,212,255,0.03)' }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#00D4FF', animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 8px #00D4FF', '@keyframes pulse': { '0%, 100%': { opacity: 1, boxShadow: '0 0 8px #00D4FF' }, '50%': { opacity: 0.4, boxShadow: '0 0 2px #00D4FF' } } }} />
          <Typography variant="body2" sx={{ color: '#8899AA', fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase' }}>Welcome to the Autobot Portfolio</Typography>
        </Box>

        <Box className="hero-name" sx={{ opacity: 0 }}>
          <Typography variant="h1" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: { xs: '2.2rem', md: '4rem' }, mb: 1, letterSpacing: 4, lineHeight: 1.1 }}>
            Hi, I'm{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #E31937, #0066CC, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: 'none', filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.2))' }}>
              Avinash Kotarya
            </Box>
          </Typography>
        </Box>

        <Box className="hero-role-wrapper" sx={{ opacity: 0, mb: 2, minHeight: '2.5rem' }}>
          <Typography variant="h5">
            <span style={{ color: '#556677', fontWeight: 400, fontFamily: "'Inter', sans-serif" }}>{/^[aeiou]/i.test(roles[roleIndex]) ? "I'm an " : "I'm a "}</span>
            <span
              ref={roleRef}
              style={{ color: '#00D4FF', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, textShadow: '0 0 15px rgba(0,212,255,0.4)' }}
            >
              {roles[roleIndex]}
            </span>
          </Typography>
        </Box>

        <Box className="hero-bio" sx={{ opacity: 0 }}>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 520, mx: 'auto', fontSize: '1.05rem', color: '#8899AA' }}>
            Aspiring software developer from Indore, India. Passionate about
            coding, cybersecurity, and emerging technologies. Currently pursuing
            B.Tech at IPS Academy. Roll out!
          </Typography>
        </Box>

        <Box className="hero-buttons" sx={{ opacity: 0, display: 'flex', gap: 1.5, justifyContent: 'center', mb: 3 }}>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 1, padding: '12px 28px',
              background: 'linear-gradient(135deg, #E31937, #AA1028)',
              color: '#F0F4F8', borderRadius: 4, fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(227, 25, 55, 0.3)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.8rem',
            }}
          >
            Get In Touch
          </Link>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 1, padding: '12px 28px',
              border: '1px solid #1E2A3A', color: '#F0F4F8', borderRadius: 4,
              fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.8rem',
            }}
          >
            View Projects
          </Link>
        </Box>

        <Box className="hero-social" sx={{ opacity: 0, display: 'flex', gap: 1.5, justifyContent: 'center', mb: 6 }}>
          <Box
            component="a" href="https://linkedin.com/in/avinash-kotarya-0a37b1331" target="_blank"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 1,
              border: '1px solid #1E2A3A', color: '#8899AA',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': { borderColor: '#00D4FF', color: '#00D4FF', transform: 'translateY(-4px) scale(1.1)', boxShadow: '0 4px 20px rgba(0,212,255,0.2)' },
            }}
          >
            <LinkedInIcon />
          </Box>
          <Box
            component="a" href="mailto:avinashkotarya@email.com"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 1,
              border: '1px solid #1E2A3A', color: '#8899AA',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': { borderColor: '#E31937', color: '#E31937', transform: 'translateY(-4px) scale(1.1)', boxShadow: '0 4px 20px rgba(227,25,55,0.2)' },
            }}
          >
            <EmailIcon />
          </Box>
        </Box>

        <Box
          className="hero-scroll"
          sx={{
            opacity: 0, position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
            color: '#556677',
            animation: 'bounce 2s ease-in-out infinite',
            '@keyframes bounce': { '0%, 100%': { transform: 'translateX(-50%) translateY(0)' }, '50%': { transform: 'translateX(-50%) translateY(10px)' } },
            '&:hover': { color: '#00D4FF' },
          }}
        >
          <ArrowDownwardIcon />
        </Box>
      </Container>
    </Box>
  );
}
