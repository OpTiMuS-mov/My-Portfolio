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
    border: '1px solid #334155', borderRadius: 2, color: '#94A3B8',
    textDecoration: 'none', transition: 'all 0.3s ease',
    '&:hover': { borderColor: '#3B82F6', color: '#3B82F6' },
  };

  return (
    <footer ref={footerRef} sx={{ background: '#0F172A', borderTop: '1px solid #334155', py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Box ref={contentRef} sx={{ opacity: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '1.1rem' }}>
                <span style={{ color: '#3B82F6' }}>&lt;</span>Avinash<span style={{ color: '#3B82F6' }}>/&gt;</span>
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>Building the future, one line of code at a time.</Typography>
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

          <Box sx={{ borderTop: '1px solid #334155', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Made with <FavoriteBorderIcon sx={{ color: '#3B82F6', fontSize: 14 }} /> by Avinash Kotarya
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
