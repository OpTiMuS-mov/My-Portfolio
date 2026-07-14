import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem,
  ListItemText, Container, useScrollTrigger, useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const AutobotLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.4))' }}>
    <defs>
      <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#E31937' }} />
        <stop offset="50%" style={{ stopColor: '#0066CC' }} />
        <stop offset="100%" style={{ stopColor: '#00D4FF' }} />
      </linearGradient>
    </defs>
    <path d="M50 8 L62 25 L80 20 L75 38 L95 42 L78 52 L90 70 L68 62 L58 85 L50 68 L42 85 L32 62 L10 70 L22 52 L5 42 L25 38 L20 20 L38 25 Z" fill="url(#navLogoGrad)" stroke="#00D4FF" strokeWidth="1"/>
    <path d="M50 30 L56 40 L50 48 L44 40 Z" fill="#00D4FF" opacity="0.8"/>
    <line x1="50" y1="48" x2="50" y2="62" stroke="#00D4FF" strokeWidth="2" opacity="0.6"/>
  </svg>
);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Skills', path: '/skills' },
  { name: 'Education', path: '/education' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const navLinksRef = useRef([]);

  const activePath = location.pathname;

  useEffect(() => {
    const cleanups = [];
    navLinksRef.current.forEach((el) => {
      if (!el) return;
      const handleEnter = () => gsap.to(el, { y: -2, color: '#00D4FF', duration: 0.25, ease: 'power2.out' });
      const handleLeave = () => gsap.to(el, { y: 0, color: '#8899AA', duration: 0.25, ease: 'power2.out' });
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
      cleanups.push(() => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [isMobile]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 1 : 0}
        sx={{
          background: scrolled ? 'rgba(10,14,20,0.97)' : 'rgba(10,14,20,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid #1E2A3A' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
            <Link
              to="/"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#F0F4F8',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                letterSpacing: 1,
              }}
            >
              <Box sx={{ display: 'flex', animation: 'transformGlow 4s ease-in-out infinite' }}>
                <AutobotLogo />
              </Box>
              <span style={{ color: '#E31937' }}>&lt;</span>
              OptimumXRecon
              <span style={{ color: '#00D4FF' }}>/&gt;</span>
            </Link>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                {navLinks.map((link, i) => {
                  const highlightActive = link.name === 'Home' ? activePath === '/' :
                    activePath === link.path;

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      ref={(el) => (navLinksRef.current[i] = el)}
                      style={{
                        position: 'relative',
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: highlightActive ? 600 : 500,
                        color: highlightActive ? '#00D4FF' : '#8899AA',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      {link.name}
                      {highlightActive && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: -4,
                            left: 0,
                            right: 0,
                            height: 2,
                            background: 'linear-gradient(90deg, #E31937, #00D4FF)',
                            borderRadius: 1,
                            boxShadow: '0 0 8px rgba(0,212,255,0.5)',
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                  <IconButton component="a" href="https://linkedin.com/in/avinash-kotarya-0a37b1331" target="_blank" size="small" sx={{ color: '#8899AA', '&:hover': { color: '#00D4FF' } }}>
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton component="a" href="mailto:avinashkotarya@email.com" size="small" sx={{ color: '#8899AA', '&:hover': { color: '#E31937' } }}>
                    <EmailIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            )}

            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'text.primary' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { background: '#0A0E14', borderLeft: '1px solid #1E2A3A' } }}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutobotLogo />
              <Typography sx={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: '0.85rem' }}>
                <span style={{ color: '#E31937' }}>&lt;</span>OptimumXRecon<span style={{ color: '#00D4FF' }}>/&gt;</span>
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <List>
            {navLinks.map((link) => {
              const highlightActive = link.name === 'Home' ? activePath === '/' :
                activePath === link.path;

              return (
                <ListItem
                  key={link.name}
                  component={Link}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 1, mb: 0.5, textDecoration: 'none',
                    '&:hover': { background: 'rgba(0,212,255,0.05)' },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: highlightActive ? 700 : 500,
                      color: highlightActive ? '#00D4FF' : '#F0F4F8',
                      fontSize: '0.8rem',
                      letterSpacing: 1,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
