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
  { icon: <EditVideoIcon />, title: 'Video Editor', desc: 'Creating compelling visual stories', color: '#3B82F6' },
  { icon: <PythonIcon />, title: 'Aspiring Python Developer', desc: 'Building with Python & automation', color: '#2563EB' },
  { icon: <SecurityIcon />, title: 'VAPT Intern', desc: 'Vulnerability Assessment & Penetration Testing', color: '#EAB308' },
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
    gsap.to(el, { x: enter ? 6 : 0, borderColor: enter ? '#3B82F6' : '#334155', duration: 0.3, ease: 'power2.out' });
  };
  const handleStatHover = (el, enter) => {
    gsap.to(el, { y: enter ? -5 : 0, borderColor: enter ? '#3B82F6' : '#1E293B', duration: 0.3, ease: 'power2.out' });
  };

  return (
    <Box ref={sectionRef} id="about" sx={{ py: 8, px: 2 }}>
      <Container maxWidth="lg">
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 5, opacity: 0 }}>
          <Typography variant="caption" sx={{ color: '#3B82F6', textTransform: 'uppercase', letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace" }}>About Me</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
            Get to know{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>me better</Box>
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card ref={bioRef} sx={{ p: 3.5, height: '100%', opacity: 0 }}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>Hello there! 👋</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                I'm <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Avinash Kotarya</Box>, a passionate and driven student from
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}> Indore, Madhya Pradesh, India</Box>. I'm currently pursuing my
                B.Tech at <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>IPS Academy, Rajendra Nagar, Indore</Box>, where I started
                my academic journey in 2024.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                I have a strong interest in software development, particularly in
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}> C++</Box> and <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Java</Box> programming languages. I'm also
                exploring the fascinating world of <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Cyber Security</Box>,
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}> Generative AI</Box>, and
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}> VAPT (Vulnerability Assessment & Penetration Testing)</Box>.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Beyond coding, I'm a skilled <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Video Editor</Box> with a creative eye for
                storytelling through visuals. I've produced event reels and highlight videos for multiple college clubs
                including <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Netryx Club</Box>, <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>TCC Club</Box>, and
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}> Creative Club at IPS Academy</Box>.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                My goal is to leverage technology to solve real-world problems and contribute
                meaningfully to the tech industry. I'm always eager to take on new challenges.
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
                    sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.2, opacity: 0, cursor: 'default' }}
                    onMouseEnter={(e) => handleHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleHover(e.currentTarget, false)}
                  >
                    <Box sx={{ color: '#3B82F6', display: 'flex' }}>{d.icon}</Box>
                    <Box>
                      <Typography variant="caption" color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: 1, display: 'block' }}>{d.label}</Typography>
                      <Typography variant="body2" fontWeight={600}>{d.value}</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Card
                ref={rolesContainerRef}
                sx={{
                  p: 2.5, opacity: 0,
                  background: 'linear-gradient(135deg, #0F172A 0%, #0F172A 50%, #1E293B 100%)',
                  border: '1px solid #334155',
                }}
              >
                <Typography variant="caption" sx={{ color: '#3B82F6', textTransform: 'uppercase', letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace", display: 'block', mb: 1.5 }}>
                  What I Do
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {roles.map((role, i) => (
                    <Card
                      key={role.title}
                      ref={(el) => (roleCardsRef.current[i] = el)}
                      variant="outlined"
                      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.2, borderColor: '#334155', cursor: 'default', opacity: 0 }}
                      onMouseEnter={(e) => handleHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleHover(e.currentTarget, false)}
                    >
                      <Box sx={{ width: 40, height: 40, borderRadius: 2, background: `${role.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: role.color, flexShrink: 0 }}>
                        {role.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>{role.title}</Typography>
                        <Typography variant="caption" color="text.disabled" sx={{ lineHeight: 1.3 }}>{role.desc}</Typography>
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
                  sx={{ p: 2.5, textAlign: 'center', opacity: 0, cursor: 'default', '&:hover': { borderColor: '#3B82F6' } }}
                  onMouseEnter={(e) => handleStatHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleStatHover(e.currentTarget, false)}
                >
                  <Typography variant="h4" sx={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{s.label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
