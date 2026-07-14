import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container, Card, Chip } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BugReportIcon from '@mui/icons-material/BugReport';
import SecurityIcon from '@mui/icons-material/Security';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Video Editor',
    company: 'Netryx Club, IPS Academy',
    location: 'Indore, MP',
    period: '2024 – Present',
    type: 'Club',
    typeColor: '#16a34a',
    icon: <VideoCameraBackIcon />,
    description: 'Creating and editing promotional videos, event coverage, and social media content for the college club. Managing video production workflow from concept to final output.',
    skills: ['Video Editing', 'Adobe Premiere Pro', 'After Effects', 'Content Creation'],
  },
  {
    title: 'Freelance Security Consultant',
    company: 'Self-Employed',
    location: 'Remote',
    period: '2024 – Present',
    type: 'Freelance',
    typeColor: '#F59E0B',
    icon: <RocketLaunchIcon />,
    description: 'Providing cybersecurity consultation and penetration testing services to small businesses. Conducting security audits and vulnerability assessments.',
    skills: ['OSINT', 'Network Security', 'Python', 'Kali Linux'],
  },
  {
    title: 'VAPT Analyst',
    company: 'Cybergrow',
    location: 'Indore, MP',
    period: '2024 – Present',
    type: 'Specialization',
    typeColor: '#DC2626',
    icon: <BugReportIcon />,
    description: 'Performing Vulnerability Assessment and Penetration Testing on web applications and networks. Identifying security loopholes and suggesting mitigation strategies.',
    skills: ['VAPT', 'Burp Suite', 'Nmap', 'Metasploit', 'OWASP Top 10'],
  },
  {
    title: 'Cyber Security Intern',
    company: 'Cybergrow',
    location: 'Indore, MP',
    period: 'Jan 2025 – Apr 2025',
    type: 'Internship',
    typeColor: '#FBBF24',
    icon: <SecurityIcon />,
    description: 'Conducted vulnerability assessments and penetration testing for client applications. Identified critical security flaws and provided remediation recommendations.',
    skills: ['VAPT', 'Burp Suite', 'Nmap', 'Report Writing'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);
  const centerLineRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(centerLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } }
      );
      leftCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: -60, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.7, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });
      rightCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: 60, clipPath: 'inset(0 0 0 100%)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)', duration: 0.7, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.fromTo(dot,
          { scale: 0 },
          { scale: 1, duration: 0.4, delay: 0.3 + i * 0.15, ease: 'back.out(2)',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardHover = (el, enter) => {
    gsap.to(el, { y: enter ? -6 : 0, boxShadow: enter ? '0 10px 30px rgba(251,191,36,0.1)' : 'none', duration: 0.3, ease: 'power2.out' });
  };

  return (
    <Box ref={sectionRef} id="experience" sx={{ py: 8, px: 2, background: '#0A0A0A', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 6, opacity: 0 }}>
          <Typography variant="caption" sx={{ color: '#FBBF24', textTransform: 'uppercase', letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace" }}>Experience</Typography>
          <Typography variant="h2" sx={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: { xs: '2rem', md: '3.2rem' }, letterSpacing: 3 }}>
            Professional{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>journey</Box>
          </Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box
            ref={centerLineRef}
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(180deg, #FBBF24, #DC2626, #F59E0B, #16a34a)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
              borderRadius: 2,
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
              boxShadow: '0 0 10px rgba(251,191,36,0.2)',
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Box key={exp.title} sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box
                    ref={(el) => (dotRefs.current[i] = el)}
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: exp.typeColor,
                      border: '3px solid #0A0A0A',
                      zIndex: 2,
                      display: { xs: 'none', md: 'block' },
                      boxShadow: `0 0 12px ${exp.typeColor}60`,
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      height: 2,
                      background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, ${exp.typeColor}80, transparent)`,
                      zIndex: 1,
                      display: { xs: 'none', md: 'block' },
                      ...(isLeft
                        ? { right: '50%', width: 'calc(5% + 12px)', transform: 'translateY(-50%)' }
                        : { left: '50%', width: 'calc(5% + 12px)', transform: 'translateY(-50%)' }
                      ),
                    }}
                  />

                  <Box sx={{
                    width: { xs: '100%', md: '45%' },
                    ml: { xs: 0, md: isLeft ? 0 : 'auto' },
                    mr: { xs: 0, md: isLeft ? 'auto' : 0 },
                    pr: { xs: 0, md: isLeft ? 6 : 0 },
                    pl: { xs: 0, md: isLeft ? 0 : 6 },
                  }}>
                    <Card
                      ref={(el) => {
                        if (isLeft) leftCardsRef.current[i] = el;
                        else rightCardsRef.current[i] = el;
                      }}
                      sx={{
                        p: 3,
                        borderTop: `4px solid ${exp.typeColor}`,
                        opacity: 0,
                        cursor: 'default',
                        background: '#141414',
                        '&:hover': { borderColor: exp.typeColor },
                      }}
                      onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
                    >
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: 1, background: `${exp.typeColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: exp.typeColor, flexShrink: 0 }}>
                          {exp.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="h6" sx={{ fontSize: '1.05rem', color: '#F8FAFC' }}>{exp.title}</Typography>
                            <Chip label={exp.type} size="small" sx={{ height: 20, fontSize: '0.7rem', background: `${exp.typeColor}20`, color: exp.typeColor }} />
                          </Box>
                          <Typography variant="body2" sx={{ color: '#94A3B8' }}>{exp.company} · {exp.location}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <TimelineIcon sx={{ fontSize: 14, color: '#64748B' }} />
                        <Typography variant="caption" sx={{ fontFamily: "'JetBrains Mono', monospace", color: '#64748B' }}>{exp.period}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2, color: '#CBD5E1' }}>{exp.description}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {exp.skills.map((skill) => (
                          <Chip key={skill} label={skill} size="small" sx={{ background: '#0A0A0A', color: '#94A3B8', fontSize: '0.75rem', border: '1px solid #2A2A2A' }} />
                        ))}
                      </Box>
                    </Card>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
