import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Box, Typography, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const roles = ['Python Developer', 'Ethical Tech Advocate', 'Cyber Security Enthusiast', 'AI Learner', 'Tech Student'];

const BatSymbolHero = () => (
  <svg width="160" height="80" viewBox="0 0 100 50" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.4)) drop-shadow(0 0 60px rgba(251,191,36,0.2))' }}>
    <path d="M50 0C50 0 47 8 42 12C37 16 32 17 27 16C22 15 18 13 14 12C10 11 7 11 5 12C3 13 2 15 2 15C2 15 3 18 6 21C9 24 12 25 14 24C12 27 9 31 6 35C6 35 10 33 15 30C18 28 21 26 24 25C27 24 30 24 33 25C36 26 39 28 42 31C45 34 48 38 50 42C52 38 55 34 58 31C61 28 64 26 67 25C70 24 73 24 76 25C79 26 82 28 85 30C90 33 94 35 94 35C91 31 88 27 86 24C88 25 91 24 94 21C97 18 98 15 98 15C98 15 97 13 95 12C93 11 90 11 86 12C82 13 78 15 73 16C68 17 63 16 58 12C53 8 50 0 50 0Z"/>
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
        .fromTo('.hero-bat-symbol', { opacity: 0, scale: 0, rotation: -180 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.5)' }, 0.1)
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
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
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
        <Box sx={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <Box sx={{ position: 'absolute', bottom: '10%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(251,191,36,0.02)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', top: '40%', right: '15%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(220,38,38,0.02)', filter: 'blur(80px)' }} />

        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            className="hero-particle"
            sx={{
              position: 'absolute',
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#DC2626' : '#FBBF24',
              opacity: 0,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
              boxShadow: `0 0 ${4 + Math.random() * 6}px ${i % 3 === 0 ? '#DC2626' : '#FBBF24'}40`,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 0.15 },
                '50%': { transform: `translateY(-${15 + Math.random() * 20}px)`, opacity: 0.4 },
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
            background: 'linear-gradient(0deg, #0A0A0A, transparent)',
            zIndex: 1,
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Box className="hero-bat-symbol" sx={{ opacity: 0, mb: 4, display: 'flex', justifyContent: 'center' }}>
          <BatSymbolHero />
        </Box>

        <Box className="hero-badge" sx={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, border: '1px solid #2A2A2A', borderRadius: 50, mb: 3, background: 'rgba(251,191,36,0.03)' }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#FBBF24', animation: 'pulse 2s ease-in-out infinite', '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }} />
          <Typography variant="body2" color="text.secondary">Welcome to the Gotham Portfolio</Typography>
        </Box>

        <Box className="hero-name" sx={{ opacity: 0 }}>
          <Typography variant="h1" sx={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: { xs: '3rem', md: '5.5rem' }, mb: 1, letterSpacing: 4, lineHeight: 1 }}>
            Hi, I'm{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: 'none', filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.3))' }}>
              Avinash Kotarya
            </Box>
          </Typography>
        </Box>

        <Box className="hero-role-wrapper" sx={{ opacity: 0, mb: 2, minHeight: '2.5rem' }}>
          <Typography variant="h5">
            <span style={{ color: '#64748B', fontWeight: 400 }}>{/^[aeiou]/i.test(roles[roleIndex]) ? "I'm an " : "I'm a "}</span>
            <span
              ref={roleRef}
              style={{ color: '#FBBF24', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, textShadow: '0 0 10px rgba(251,191,36,0.3)' }}
            >
              {roles[roleIndex]}
            </span>
          </Typography>
        </Box>

        <Box className="hero-bio" sx={{ opacity: 0 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 520, mx: 'auto', fontSize: '1.05rem' }}>
            Aspiring software developer from Indore, India. Passionate about
            coding, cybersecurity, and emerging technologies. Currently pursuing
            B.Tech at IPS Academy.
          </Typography>
        </Box>

        <Box className="hero-buttons" sx={{ opacity: 0, display: 'flex', gap: 1.5, justifyContent: 'center', mb: 3 }}>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 1, padding: '12px 28px',
              background: 'linear-gradient(135deg, #FBBF24, #D97706)',
              color: '#0A0A0A', borderRadius: 4, fontWeight: 700, fontSize: '0.95rem',
              textDecoration: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Get In Touch
          </Link>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 1, padding: '12px 28px',
              border: '1px solid #2A2A2A', color: '#F8FAFC', borderRadius: 4,
              fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: 1,
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
              border: '1px solid #2A2A2A', color: '#94A3B8',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': { borderColor: '#FBBF24', color: '#FBBF24', transform: 'translateY(-4px) scale(1.1)', boxShadow: '0 4px 20px rgba(251,191,36,0.2)' },
            }}
          >
            <LinkedInIcon />
          </Box>
          <Box
            component="a" href="mailto:avinashkotarya@email.com"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 1,
              border: '1px solid #2A2A2A', color: '#94A3B8',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': { borderColor: '#FBBF24', color: '#FBBF24', transform: 'translateY(-4px) scale(1.1)', boxShadow: '0 4px 20px rgba(251,191,36,0.2)' },
            }}
          >
            <EmailIcon />
          </Box>
        </Box>

        <Box
          className="hero-scroll"
          sx={{
            opacity: 0, position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
            color: '#64748B',
            animation: 'bounce 2s ease-in-out infinite',
            '@keyframes bounce': { '0%, 100%': { transform: 'translateX(-50%) translateY(0)' }, '50%': { transform: 'translateX(-50%) translateY(10px)' } },
            '&:hover': { color: '#FBBF24' },
          }}
        >
          <ArrowDownwardIcon />
        </Box>
      </Container>
    </Box>
  );
}
