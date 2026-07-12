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

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Skills', path: '/skills' },
  { name: 'Education', path: '/education' },
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
      const handleEnter = () => gsap.to(el, { y: -2, color: '#3B82F6', duration: 0.25, ease: 'power2.out' });
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
          background: scrolled ? 'rgba(15,23,42,0.95)' : 'rgba(15,23,42,0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid #334155' : '1px solid transparent',
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
                fontSize: '1.3rem',
                color: '#F8FAFC',
                display: 'flex',
                gap: '2px',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#3B82F6' }}>&lt;</span>
              OptimumXRecon Developer
              <span style={{ color: '#3B82F6' }}>/&gt;</span>
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
                        color: highlightActive ? '#3B82F6' : '#94A3B8',
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
                            background: '#3B82F6',
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                  <IconButton component="a" href="https://linkedin.com/in/avinash-kotarya-0a37b1331" target="_blank" size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#3B82F6' } }}>
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton component="a" href="mailto:avinashkotarya@email.com" size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#3B82F6' } }}>
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

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
              <span style={{ color: '#3B82F6' }}>&lt;</span>OptimumXRecon developer<span style={{ color: '#3B82F6' }}>/&gt;</span>
            </Typography>
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
                    borderRadius: 2, mb: 0.5, textDecoration: 'none',
                    '&:hover': { background: 'rgba(59,130,246,0.05)' },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontWeight: highlightActive ? 700 : 500,
                      color: highlightActive ? '#3B82F6' : '#F8FAFC',
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
