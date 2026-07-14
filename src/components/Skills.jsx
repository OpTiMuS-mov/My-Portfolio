import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container, Card, LinearProgress, Grid } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import MemoryIcon from '@mui/icons-material/Memory';
import DevicesIcon from '@mui/icons-material/Devices';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Cyber Security',
    icon: <SecurityIcon />,
    color: '#E31937',
    skills: [
      { name: 'Cyber Security', color: '#E31937', level: 85 },
      { name: 'Penetration Testing', color: '#FF4060', level: 80 },
      { name: 'Network Security', color: '#0066CC', level: 75 },
      { name: 'OSINT', color: '#00D4FF', level: 70 },
    ],
  },
  {
    title: 'Security Tools',
    icon: <DevicesIcon />,
    color: '#0066CC',
    skills: [
      { name: 'Kali Linux', color: '#0066CC', level: 80 },
      { name: 'Wireshark', color: '#00D4FF', level: 75 },
      { name: 'Burp Suite', color: '#E31937', level: 70 },
      { name: 'Nmap', color: '#0088DD', level: 75 },
    ],
  },
  {
    title: 'Programming & Development',
    icon: <MemoryIcon />,
    color: '#00D4FF',
    skills: [
      { name: 'Python', color: '#00D4FF', level: 80 },
      { name: 'Java', color: '#E31937', level: 75 },
      { name: 'Git & GitHub', color: '#0066CC', level: 70 },
    ],
  },
];

function SkillBar({ color, level }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={600}></Typography>
        <Typography variant="caption" sx={{ color: '#556677' }}>{level}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={level}
        sx={{
          height: 6, borderRadius: 3,
          backgroundColor: '#0D1520',
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 10px ${color}50`,
          },
        }}
      />
    </Box>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const categoryCardsRef = useRef([]);
  const skillTilesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      categoryCardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, clipPath: 'circle(0% at 50% 50%)' },
          { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' } }
        );
      });
      const flatTiles = skillTilesRef.current.filter(Boolean);
      gsap.fromTo(flatTiles,
        { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.5, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' } }
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTileHover = (el, enter) => {
    gsap.to(el, {
      y: enter ? -6 : 0,
      boxShadow: enter ? `0 10px 30px ${el.dataset.color || '#00D4FF'}20` : 'none',
      borderColor: enter ? '#00D4FF' : '#1E2A3A',
      duration: 0.3, ease: 'power2.out',
    });
  };

  const emojis = {
    'Cyber Security': '🛡️', 'Penetration Testing': '🎯', 'Network Security': '🌐', 'OSINT': '🔍',
    'Kali Linux': '🐧', 'Wireshark': '📡', 'Burp Suite': '⚔️', 'Nmap': '🛰️',
    'Python': '🐍', 'Java': '☕', 'Git & GitHub': '🌿',
  };

  return (
    <Box ref={sectionRef} id="skills" sx={{ py: 8, px: 2, background: '#0A0E14' }}>
      <Container maxWidth="lg">
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 5, opacity: 0 }}>
          <Typography variant="caption" sx={{ color: '#00D4FF', textTransform: 'uppercase', letterSpacing: 3, fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem' }}>Skills</Typography>
          <Typography variant="h2" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: { xs: '1.8rem', md: '2.8rem' }, letterSpacing: 3 }}>
            Technologies I{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #E31937, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>work with</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {categories.map((cat, ci) => (
            <Card key={cat.title} ref={(el) => (categoryCardsRef.current[ci] = el)} className="mech-card" sx={{ p: 3, opacity: 0, borderTop: `2px solid ${cat.color}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, color: cat.color }}>
                {cat.icon}
                <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.9rem', letterSpacing: 1 }}>{cat.title}</Typography>
              </Box>
              <Grid container spacing={2}>
                {cat.skills.map((skill, si) => (
                  <Grid key={skill.name} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      ref={(el) => { skillTilesRef.current[ci * 10 + si] = el; }}
                      variant="outlined"
                      className="mech-card"
                      sx={{ p: 2.5, textAlign: 'center', cursor: 'default', opacity: 0 }}
                      data-color={skill.color}
                      onMouseEnter={(e) => handleTileHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleTileHover(e.currentTarget, false)}
                    >
                      <Typography variant="h5" sx={{ mb: 0.5, fontSize: '1.8rem' }}>{emojis[skill.name]}</Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{skill.name}</Typography>
                      <SkillBar color={skill.color} level={skill.level} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
