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

const BatSymbol = () => (
  <svg width="32" height="16" viewBox="0 0 100 50" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C50 0 47 8 42 12C37 16 32 17 27 16C22 15 18 13 14 12C10 11 7 11 5 12C3 13 2 15 2 15C2 15 3 18 6 21C9 24 12 25 14 24C12 27 9 31 6 35C6 35 10 33 15 30C18 28 21 26 24 25C27 24 30 24 33 25C36 26 39 28 42 31C45 34 48 38 50 42C52 38 55 34 58 31C61 28 64 26 67 25C70 24 73 24 76 25C79 26 82 28 85 30C90 33 94 35 94 35C91 31 88 27 86 24C88 25 91 24 94 21C97 18 98 15 98 15C98 15 97 13 95 12C93 11 90 11 86 12C82 13 78 15 73 16C68 17 63 16 58 12C53 8 50 0 50 0Z"/>
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
      const handleEnter = () => gsap.to(el, { y: -2, color: '#FBBF24', duration: 0.25, ease: 'power2.out' });
      const handleLeave = () => gsap.to(el, { y: 0, color: '#94A3B8', duration: 0.25, ease: 'power2.out' });
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
          background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid #2A2A2A' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
            <Link
              to="/"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              <Box sx={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.4))', display: 'flex' }}>
                <BatSymbol />
              </Box>
              <span style={{ color: '#FBBF24' }}>&lt;</span>
              OptimumXRecon
              <span style={{ color: '#FBBF24' }}>/&gt;</span>
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
                        fontWeight: highlightActive ? 600 : 500,
                        color: highlightActive ? '#FBBF24' : '#94A3B8',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
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
                            background: '#FBBF24',
                            borderRadius: 1,
                            boxShadow: '0 0 8px rgba(251,191,36,0.5)',
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                  <IconButton component="a" href="https://linkedin.com/in/avinash-kotarya-0a37b1331" target="_blank" size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#FBBF24' } }}>
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton component="a" href="mailto:avinashkotarya@email.com" size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#FBBF24' } }}>
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
        PaperProps={{ sx: { background: '#0A0A0A', borderLeft: '1px solid #2A2A2A' } }}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BatSymbol />
              <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                <span style={{ color: '#FBBF24' }}>&lt;</span>OptimumXRecon<span style={{ color: '#FBBF24' }}>/&gt;</span>
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
                    '&:hover': { background: 'rgba(251,191,36,0.05)' },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontWeight: highlightActive ? 700 : 500,
                      color: highlightActive ? '#FBBF24' : '#F8FAFC',
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
