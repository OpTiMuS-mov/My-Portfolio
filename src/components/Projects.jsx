import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiVideo, FiCode } from 'react-icons/fi';
import { SiInstagram } from 'react-icons/si';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'OptimumXRecon',
    description: 'A modular cybersecurity reconnaissance toolkit written in Python. Features DNS Lookup, Threaded Port Scanner, SSL Certificate Analysis, Security Header Analysis, Technology Fingerprinting, WHOIS Lookup, Subdomain Enumeration, and VirusTotal Reputation Analysis.',
    tech: ['Python', 'Socket', 'dnspython', 'VirusTotal API', 'Rich'],
    color: '#FBBF24',
    github: 'https://github.com/OpTiMuS-mov/OptimumXRecon',
    type: 'code',
  },
  {
    title: 'Netryx Club Inauguration',
    description: 'Event highlight reel capturing the official inauguration of the Netryx Club — marking the beginning of a new chapter in tech and innovation at IPS Academy.',
    tech: ['Event Production', 'Video Editing'],
    color: '#16a34a',
    reel: 'https://www.instagram.com/reel/DOst5qVATsL/',
    type: 'reel',
  },
  {
    title: 'Netryx Club Reveal',
    description: 'A high-energy reveal video unveiling the Netryx Club identity, building hype and excitement among the student community at IPS Academy.',
    tech: ['Event Production', 'Video Editing'],
    color: '#22C55E',
    reel: 'https://www.instagram.com/reel/DOqaTmiCXAK/',
    type: 'reel',
  },
  {
    title: 'TCC x BEIYO Collaboration',
    description: 'A dynamic collaboration project between TCC Club and BEIYO, showcasing the synergy of creativity and innovation through compelling visual content.',
    tech: ['Collaboration', 'Content Creation'],
    color: '#F59E0B',
    reel: 'https://www.instagram.com/reel/DPveCtmkk7E/',
    type: 'reel',
  },
  {
    title: 'TCC Club Rishikesh Travel',
    description: "A travel vlog documenting the TCC Club's journey to Rishikesh — capturing adventure, bonding, and unforgettable moments amidst the mountains and Ganges.",
    tech: ['Travel Vlog', 'Storytelling'],
    color: '#DC2626',
    reel: 'https://www.instagram.com/reel/DPZEg7_jD00/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    type: 'reel',
  },
  {
    title: 'Netryx x Ai Open sec x Cloud Ai Tech Collaboration',
    description: 'A creative showcase of the collaborative efforts between Netryx, Ai Open Sec, and Cloud Ai Tech, highlighting innovative projects and shared visions in the tech community.',
    tech: ['Creative Direction', 'Visual Design'],
    color: '#FBBF24',
    reel: 'https://www.instagram.com/reel/Dang9JUofrt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    type: 'reel',
  },
  {
    title: 'TCC Reveal',
    description: 'An exciting surprise reveal video for the TCC Club, crafted to surprise and engage the audience with a dramatic unveiling.',
    tech: ['Video Production', 'Event Coverage'],
    color: '#8B5CF6',
    reel: 'https://www.instagram.com/reel/DPMsy-OjGKT/',
    type: 'reel',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectCardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      const clipPaths = [
        'polygon(0 0, 0 0, 0 100%, 0 100%)', 'inset(0 0 100% 0)',
        'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', 'inset(100% 0 0 0)',
        'circle(0% at 50% 50%)', 'inset(0 100% 0 0)', 'inset(0 100% 0 0)',
      ];
      const clipPathsTo = [
        'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 'inset(0 0 0% 0)',
        'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 'inset(0% 0 0 0)',
        'circle(100% at 50% 50%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 'inset(0 0% 0 0)',
      ];
      projectCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40, clipPath: clipPaths[i % clipPaths.length] },
          { opacity: 1, y: 0, clipPath: clipPathsTo[i % clipPathsTo.length], duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardHover = (el, enter, color) => {
    gsap.to(el, { y: enter ? -10 : 0, boxShadow: enter ? `0 20px 60px ${color}15` : 'none', borderColor: enter ? '#FBBF24' : '#2A2A2A', duration: 0.4, ease: 'power2.out' });
  };
  const handleLinkHover = (el, enter) => {
    gsap.to(el, { scale: enter ? 1.15 : 1, color: enter ? '#FBBF24' : '#94A3B8', duration: 0.25, ease: 'power2.out' });
  };

  return (
    <section ref={sectionRef} id="projects" className="projects">
      <div className="section-container">
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <span className="section-tag">Projects</span>
          <h2 className="section-title" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: '2.8rem' }}>
            Things I've <span className="gradient-text">built</span>
          </h2>
          <p className="section-subtitle">A collection of projects that showcase my skills and creative journey</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={project.title} ref={(el) => (projectCardsRef.current[i] = el)}
              className={`project-card ${project.type === 'code' ? 'project-featured' : ''}`}
              style={{ opacity: 0 }}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true, project.color)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false, project.color)}>
              <div className="project-header">
                <div className="project-icon" style={{ color: project.color }}>
                  {project.type === 'code' ? <FiCode size={28} /> : <FiVideo size={28} />}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link-btn"
                      onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}>
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.reel && (
                    <a href={project.reel} target="_blank" rel="noreferrer" className="project-link-btn"
                      onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                      onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}>
                      <SiInstagram size={18} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag" style={{ borderColor: `${project.color}30`, color: project.color, background: `${project.color}08` }}>{t}</span>
                ))}
              </div>
              <div className="project-glow" style={{ background: project.color }} />
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="projects-cta" style={{ opacity: 0 }}>
          <FiCode size={20} />
          <span>More projects coming soon as I continue learning!</span>
        </div>
      </div>
    </section>
  );
}
