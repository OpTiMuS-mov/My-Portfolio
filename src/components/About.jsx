import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container, Card, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import EditVideoIcon from '@mui/icons-material/VideoCameraFront';
import PythonIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Certifications', value: '4+' },
  { label: 'Languages Known', value: '3+' },
  { label: 'Technologies', value: '5+' },
  { label: 'Years of Learning', value: '2+' },
];

const details = [
  { icon: <LocationOnIcon />, label: 'Location', value: 'Indore, India' },
  { icon: <MenuBookIcon />, label: 'Education', value: 'B.Tech at IPS Academy' },
  { icon: <CalendarTodayIcon />, label: 'Started', value: '2024' },
  { icon: <CodeIcon />, label: 'Focus', value: 'Software Dev & Cybersecurity' },
];

const roles = [
  { icon: <EditVideoIcon />, title: 'Video Editor', desc: 'Creating compelling visual stories', color: '#00D4FF' },
  { icon: <PythonIcon />, title: 'Aspiring Python Developer', desc: 'Building with Python & automation', color: '#0066CC' },
  { icon: <SecurityIcon />, title: 'VAPT Intern', desc: 'Vulnerability Assessment & Penetration Testing', color: '#E31937' },
];

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bioRef = useRef(null);
  const detailCardsRef = useRef([]);
  const rolesContainerRef = useRef(null);
  const roleCardsRef = useRef([]);
  const statsRef = useRef(null);
  const statCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(bioRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: bioRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(detailCardsRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: detailCardsRef.current[0]?.parentElement, start: 'top 80%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(rolesContainerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: rolesContainerRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(roleCardsRef.current,
        { opacity: 0, x: -30, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { opacity: 1, x: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: rolesContainerRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(statCardsRef.current,
        { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (el, enter) => {
    gsap.to(el, { x: enter ? 6 : 0, borderColor: enter ? '#00D4FF' : '#1E2A3A', duration: 0.3, ease: 'power2.out' });
  };
  const handleStatHover = (el, enter) => {
    gsap.to(el, { y: enter ? -5 : 0, borderColor: enter ? '#00D4FF' : '#1E2A3A', boxShadow: enter ? '0 0 20px rgba(0,212,255,0.1)' : 'none', duration: 0.3, ease: 'power2.out' });
  };

  return (
    <Box ref={sectionRef} id="about" sx={{ py: 8, px: 2 }}>
      <Container maxWidth="lg">
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 5, opacity: 0 }}>
          <Typography variant="caption" sx={{ color: '#00D4FF', textTransform: 'uppercase', letterSpacing: 3, fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem' }}>About Me</Typography>
          <Typography variant="h2" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: { xs: '1.8rem', md: '2.8rem' }, letterSpacing: 3 }}>
            Get to know{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #E31937, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>me better</Box>
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card ref={bioRef} className="mech-card" sx={{ p: 3.5, height: '100%', opacity: 0, borderLeft: '3px solid #E31937' }}>
              <Typography variant="h5" sx={{ mb: 1.5, color: '#E31937', fontFamily: "'Orbitron', sans-serif" }}>Hello there!</Typography>
              <Typography variant="body1" sx={{ mb: 1, color: '#8899AA' }}>
                I'm <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>Avinash Kotarya</Box>, a passionate and driven student from
                <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}> Indore, Madhya Pradesh, India</Box>. I'm currently pursuing my
                B.Tech at <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>IPS Academy, Rajendra Nagar, Indore</Box>, where I started
                my academic journey in 2024.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: '#8899AA' }}>
                I have a strong interest in software development, particularly in
                <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}> C++</Box> and <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>Java</Box> programming languages. I'm also
                exploring the fascinating world of <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>Cyber Security</Box>,
                <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}> Generative AI</Box>, and
                <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}> VAPT (Vulnerability Assessment & Penetration Testing)</Box>.
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: '#8899AA' }}>
                Beyond coding, I'm a skilled <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>Video Editor</Box> with a creative eye for
                storytelling through visuals. I've produced event reels and highlight videos for multiple college clubs
                including <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>Netryx Club</Box>, <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}>TCC Club</Box>, and
                <Box component="span" sx={{ fontWeight: 700, color: '#F0F4F8' }}> Creative Club at IPS Academy</Box>.
              </Typography>
              <Typography variant="body1" sx={{ color: '#8899AA' }}>
                My goal is to leverage technology to solve real-world problems and contribute
                meaningfully to the tech industry. I'm always eager to take on new challenges. Transformers, roll out!
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.2 }}>
                {details.map((d, i) => (
                  <Card
                    key={d.label}
                    ref={(el) => (detailCardsRef.current[i] = el)}
                    className="mech-card"
                    sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.2, opacity: 0, cursor: 'default', borderRadius: '2px' }}
                    onMouseEnter={(e) => handleHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleHover(e.currentTarget, false)}
                  >
                    <Box sx={{ color: '#00D4FF', display: 'flex' }}>{d.icon}</Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#556677', textTransform: 'uppercase', letterSpacing: 1, display: 'block', fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem' }}>{d.label}</Typography>
                      <Typography variant="body2" fontWeight={600}>{d.value}</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Card
                ref={rolesContainerRef}
                className="mech-card"
                sx={{
                  p: 2.5, opacity: 0,
                }}
              >
                <Typography variant="caption" sx={{ color: '#00D4FF', textTransform: 'uppercase', letterSpacing: 2, fontFamily: "'Orbitron', sans-serif", display: 'block', mb: 1.5, fontSize: '0.65rem' }}>
                  What I Do
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {roles.map((role, i) => (
                    <Card
                      key={role.title}
                      ref={(el) => (roleCardsRef.current[i] = el)}
                      variant="outlined"
                      className="mech-card"
                      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'default', opacity: 0, '&:hover': { borderColor: role.color } }}
                      onMouseEnter={(e) => handleHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleHover(e.currentTarget, false)}
                    >
                      <Box sx={{ width: 40, height: 40, borderRadius: 1, background: `${role.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: role.color, flexShrink: 0 }}>
                        {role.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>{role.title}</Typography>
                        <Typography variant="caption" sx={{ color: '#556677', lineHeight: 1.3 }}>{role.desc}</Typography>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Box ref={statsRef}>
          <Grid container spacing={1.5} sx={{ mt: 4 }}>
            {stats.map((s, i) => (
              <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                <Card
                  ref={(el) => (statCardsRef.current[i] = el)}
                  className="mech-card"
                  sx={{ p: 2.5, textAlign: 'center', opacity: 0, cursor: 'default', '&:hover': { borderColor: '#00D4FF' } }}
                  onMouseEnter={(e) => handleStatHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleStatHover(e.currentTarget, false)}
                >
                  <Typography variant="h4" sx={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: 2, background: 'linear-gradient(135deg, #E31937, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</Typography>
                  <Typography variant="body2" sx={{ color: '#8899AA', mt: 0.5 }}>{s.label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
