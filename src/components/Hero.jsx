import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Box, Typography, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const roles = ['Python Developer', 'Ethical Tech Advocate', 'Cyber Security Enthusiast', 'AI Learner', 'Tech Student'];

export default function Hero() {
  const containerRef = useRef(null);
  const roleRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-particle', { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.05 })
        .fromTo('.hero-badge', { opacity: 0, y: 20, clipPath: 'circle(0% at 50% 50%)' }, { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8 }, 0.2)
        .fromTo('.hero-name', { opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 1 }, 0.4)
        .fromTo('.hero-role-wrapper', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
        .fromTo('.hero-bio', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .fromTo('.hero-buttons', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
        .fromTo('.hero-social', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.6);
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
        <Box sx={{ position: 'absolute', top: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.04)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', bottom: '10%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(37, 99, 235, 0.03)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', top: '40%', left: '50%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(234, 179, 8, 0.03)', filter: 'blur(80px)' }} />
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            className="hero-particle"
            sx={{
              position: 'absolute',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: '#3B82F6',
              opacity: 0,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 0.1 },
                '50%': { transform: 'translateY(-20px)', opacity: 0.3 },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Box className="hero-badge" sx={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, border: '1px solid #334155', borderRadius: 50, mb: 3, background: 'rgba(59, 130, 246, 0.03)' }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', animation: 'pulse 2s ease-in-out infinite', '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }} />
          <Typography variant="body2" color="text.secondary">Welcome to my portfolio</Typography>
        </Box>

        <Box className="hero-name" sx={{ opacity: 0 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '4rem' }, mb: 1 }}>
            Hi, I'm{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Avinash Kotarya
            </Box>
          </Typography>
        </Box>

        <Box className="hero-role-wrapper" sx={{ opacity: 0, mb: 2, minHeight: '2.5rem' }}>
          <Typography variant="h5">
            <span style={{ color: '#64748B', fontWeight: 400 }}>{/^[aeiou]/i.test(roles[roleIndex]) ? "I'm an " : "I'm a "}</span>
            <span
              ref={roleRef}
              style={{ color: '#3B82F6', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}
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
              display: 'inline-flex', alignItems: 'center', gap: 1, padding: '10px 24px',
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            Get In Touch
          </Link>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 1, padding: '10px 24px',
              border: '1px solid #334155', color: '#F8FAFC', borderRadius: 8,
              fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
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
              width: 44, height: 44, borderRadius: 2,
              border: '1px solid #334155', color: '#94A3B8',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': { borderColor: '#3B82F6', color: '#3B82F6', transform: 'translateY(-4px) scale(1.1)' },
            }}
          >
            <LinkedInIcon />
          </Box>
          <Box
            component="a" href="mailto:avinashkotarya@email.com"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 2,
              border: '1px solid #334155', color: '#94A3B8',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': { borderColor: '#3B82F6', color: '#3B82F6', transform: 'translateY(-4px) scale(1.1)' },
            }}
          >
            <EmailIcon />
          </Box>
        </Box>

        <Box
          className="hero-scroll"
          sx={{
            opacity: 0, position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
            color: '#475569',
            animation: 'bounce 2s ease-in-out infinite',
            '@keyframes bounce': { '0%, 100%': { transform: 'translateX(-50%) translateY(0)' }, '50%': { transform: 'translateX(-50%) translateY(10px)' } },
            '&:hover': { color: '#3B82F6' },
          }}
        >
          <ArrowDownwardIcon />
        </Box>
      </Container>
    </Box>
  );
}
