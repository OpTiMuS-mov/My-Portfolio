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

const BatSymbolFooter = () => (
  <svg width="24" height="12" viewBox="0 0 100 50" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C50 0 47 8 42 12C37 16 32 17 27 16C22 15 18 13 14 12C10 11 7 11 5 12C3 13 2 15 2 15C2 15 3 18 6 21C9 24 12 25 14 24C12 27 9 31 6 35C6 35 10 33 15 30C18 28 21 26 24 25C27 24 30 24 33 25C36 26 39 28 42 31C45 34 48 38 50 42C52 38 55 34 58 31C61 28 64 26 67 25C70 24 73 24 76 25C79 26 82 28 85 30C90 33 94 35 94 35C91 31 88 27 86 24C88 25 91 24 94 21C97 18 98 15 98 15C98 15 97 13 95 12C93 11 90 11 86 12C82 13 78 15 73 16C68 17 63 16 58 12C53 8 50 0 50 0Z"/>
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
    border: '1px solid #2A2A2A', borderRadius: 1, color: '#94A3B8',
    textDecoration: 'none', transition: 'all 0.3s ease',
    '&:hover': { borderColor: '#FBBF24', color: '#FBBF24' },
  };

  return (
    <footer ref={footerRef} sx={{ background: '#0A0A0A', borderTop: '1px solid #2A2A2A', py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Box ref={contentRef} sx={{ opacity: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BatSymbolFooter />
              <Box>
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '1.1rem' }}>
                  <span style={{ color: '#FBBF24' }}>&lt;</span>Avinash<span style={{ color: '#FBBF24' }}>/&gt;</span>
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>Building the future, one line of code at a time.</Typography>
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

          <Box sx={{ borderTop: '1px solid #2A2A2A', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Made with <FavoriteBorderIcon sx={{ color: '#DC2626', fontSize: 14 }} /> by Avinash Kotarya
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
