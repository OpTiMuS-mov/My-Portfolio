import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container, Card, Grid } from '@mui/material';
import AcademicCapIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/MenuBook';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import BugReportIcon from '@mui/icons-material/BugReport';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChatIcon from '@mui/icons-material/Chat';
import BuildIcon from '@mui/icons-material/Build';

gsap.registerPlugin(ScrollTrigger);

const certColors = {
  Cpp: '#0066CC', Java: '#E31937', Cyber: '#E31937', AI: '#00D4FF',
  COFPS: '#0066CC', VAPT: '#FF4060', ICIP: '#00D4FF', Workshop: '#0088DD',
};

const certIcons = {
  Cpp: <CodeIcon />, Java: <BuildIcon />, Cyber: <SecurityIcon />, AI: <ChatIcon />,
  COFPS: <CodeIcon />, VAPT: <BugReportIcon />, ICIP: <WorkspacePremiumIcon />, Workshop: <PsychologyIcon />,
};

const certifications = [
  { title: 'C++ Training', issuer: 'Spoken Tutorial, EduPyramids, SINE, IIT Bombay', colorKey: 'Cpp' },
  { title: 'Java Training', issuer: 'Spoken Tutorial, EduPyramids, SINE, IIT Bombay', colorKey: 'Java' },
  { title: 'Introduction to Cyber Security', issuer: 'Simplilearn', colorKey: 'Cyber' },
  { title: 'Introduction to Generative AI', issuer: 'Simplilearn', colorKey: 'AI' },
  { title: 'COFPS (Certified Offensive & Defensive Python Specialist)', issuer: 'Cyber Security Certification', colorKey: 'COFPS' },
  { title: 'VAPT (Vulnerability Assessment & Penetration Testing)', issuer: 'Cyber Security Certification', colorKey: 'VAPT' },
  { title: 'ICIP (Industry Certified Internship Program)', issuer: 'Professional Certification', colorKey: 'ICIP' },
  { title: 'AI Tools Workshop', issuer: 'AI & Technology Workshop', colorKey: 'Workshop' },
];

export default function Education() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eduCardsRef = useRef([]);
  const certHeaderRef = useRef(null);
  const certCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      eduCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.7, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' } }
        );
      });
      gsap.fromTo(certHeaderRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: certHeaderRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      certCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.5, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: certHeaderRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardHover = (el, enter) => {
    gsap.to(el, { x: enter ? 6 : 0, borderColor: enter ? '#00D4FF' : '#1E2A3A', duration: 0.3, ease: 'power2.out' });
  };
  const handleCertHover = (el, enter) => {
    gsap.to(el, { y: enter ? -5 : 0, borderColor: enter ? '#00D4FF' : '#1E2A3A', duration: 0.3, ease: 'power2.out' });
  };

  const educationData = [
    { title: 'B.Tech (Bachelor of Technology)', school: 'IPS Academy, Rajendra Nagar, Indore', period: '2024 – Present', status: 'In Progress', statusColor: '#00D4FF', desc: 'Pursuing a degree in technology with a focus on computer science and software development. Actively learning programming languages, data structures, and modern technologies.', icon: <AcademicCapIcon /> },
    { title: 'Higher Secondary (12th)', school: 'Kendriya Vidyalaya No.2, Indore, MP', period: 'Completed', status: 'Completed', statusColor: '#0066CC', desc: 'Completed higher secondary education with a focus on Science and Mathematics. Built a strong academic foundation that sparked my interest in technology and problem-solving.', icon: <BookIcon /> },
    { title: 'Secondary (10th)', school: 'Kendriya Vidyalaya No.2, Indore, MP', period: 'Completed', status: 'Completed', statusColor: '#0066CC', desc: 'Completed secondary education at Kendriya Vidyalaya with a solid foundation in Science, Mathematics, and English.', icon: <AcademicCapIcon /> },
  ];

  return (
    <Box ref={sectionRef} id="education" sx={{ py: 8, px: 2, background: '#0A0E14' }}>
      <Container maxWidth="lg">
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 5, opacity: 0 }}>
          <Typography variant="caption" sx={{ color: '#00D4FF', textTransform: 'uppercase', letterSpacing: 3, fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem' }}>Education</Typography>
          <Typography variant="h2" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: { xs: '1.8rem', md: '2.8rem' }, letterSpacing: 3 }}>
            Academic{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #E31937, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>journey</Box>
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {educationData.map((edu, i) => (
                <Card
                  key={edu.title}
                  ref={(el) => (eduCardsRef.current[i] = el)}
                  className="mech-card"
                  sx={{ p: 3, borderLeft: `4px solid ${edu.statusColor}`, opacity: 0, cursor: 'default' }}
                  onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
                >
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 1, background: `${edu.statusColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: edu.statusColor }}>
                      {edu.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{edu.title}</Typography>
                      <Typography variant="body2" sx={{ color: '#8899AA' }}>{edu.school}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontFamily: "'JetBrains Mono', monospace", color: '#556677' }}>{edu.period}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, px: 1, py: 0.25, borderRadius: 50, fontSize: '0.7rem', background: `${edu.statusColor}15`, color: edu.statusColor, fontFamily: "'Orbitron', sans-serif" }}>{edu.status}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#8899AA', lineHeight: 1.7 }}>{edu.desc}</Typography>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box ref={certHeaderRef} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#E31937', opacity: 0 }}>
              <TrophyIcon />
              <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.9rem', letterSpacing: 1 }}>Certifications</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {certifications.map((cert, i) => {
                const color = certColors[cert.colorKey];
                return (
                  <Card
                    key={cert.title}
                    ref={(el) => (certCardsRef.current[i] = el)}
                    variant="outlined"
                    className="mech-card"
                    sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'default', opacity: 0 }}
                    onMouseEnter={(e) => handleCertHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleCertHover(e.currentTarget, false)}
                  >
                    <Box sx={{ width: 40, height: 40, borderRadius: 1, background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                      {certIcons[cert.colorKey]}
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>{cert.title}</Typography>
                      <Typography variant="caption" sx={{ color: '#556677', lineHeight: 1.3 }}>{cert.issuer}</Typography>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
