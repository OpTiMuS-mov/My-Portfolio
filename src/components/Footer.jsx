import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

gsap.registerPlugin(ScrollTrigger);

const AutobotLogoFooter = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#E31937' }} />
        <stop offset="100%" style={{ stopColor: '#00D4FF' }} />
      </linearGradient>
    </defs>
    <path d="M50 8 L62 25 L80 20 L75 38 L95 42 L78 52 L90 70 L68 62 L58 85 L50 68 L42 85 L32 62 L10 70 L22 52 L5 42 L25 38 L20 20 L38 25 Z" fill="url(#footerGrad)" stroke="#00D4FF" strokeWidth="1"/>
    <path d="M50 30 L56 40 L50 48 L44 40 Z" fill="#00D4FF" opacity="0.8"/>
  </svg>
);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' } }
        );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleBtnHover = (el, enter) => {
    gsap.to(el, { y: enter ? -3 : 0, scale: enter ? 1.1 : 1, duration: 0.25, ease: 'power2.out' });
  };

  const socialBtnSx = {
    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid #1E2A3A', borderRadius: 1, color: '#8899AA',
    textDecoration: 'none', transition: 'all 0.3s ease',
    '&:hover': { borderColor: '#00D4FF', color: '#00D4FF' },
  };

  return (
    <footer ref={footerRef} sx={{ background: '#0A0E14', borderTop: '1px solid #1E2A3A', py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Box ref={contentRef} sx={{ opacity: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutobotLogoFooter />
              <Box>
                <Typography sx={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: '1rem', letterSpacing: 1 }}>
                  <span style={{ color: '#E31937' }}>&lt;</span>Avinash<span style={{ color: '#00D4FF' }}>/&gt;</span>
                </Typography>
                <Typography variant="body2" sx={{ color: '#556677', mt: 0.5 }}>Building the future, one line of code at a time.</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component="a" href="https://github.com/OpTiMuS-mov" target="_blank" rel="noreferrer"
                size="small" sx={socialBtnSx}
                onMouseEnter={(e) => handleBtnHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleBtnHover(e.currentTarget, false)}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a" href="https://linkedin.com/in/avinash-kotarya-0a37b1331" target="_blank" rel="noreferrer"
                size="small" sx={socialBtnSx}
                onMouseEnter={(e) => handleBtnHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleBtnHover(e.currentTarget, false)}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a" href="mailto:avinashkotarya@email.com"
                size="small" sx={socialBtnSx}
                onMouseEnter={(e) => handleBtnHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleBtnHover(e.currentTarget, false)}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ borderTop: '1px solid #1E2A3A', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#556677', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Made with <FavoriteBorderIcon sx={{ color: '#E31937', fontSize: 14 }} /> by Avinash Kotarya
            </Typography>
            <IconButton
              component={Link} to="/"
              size="small" sx={socialBtnSx}
              onMouseEnter={(e) => handleBtnHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleBtnHover(e.currentTarget, false)}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
