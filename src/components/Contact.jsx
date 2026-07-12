import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Box, Typography, Container, Card, Grid, Button } from '@mui/material';
import { SiInstagram, SiGithub, SiGmail, SiWhatsapp, SiGooglemaps } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import SendIcon from '@mui/icons-material/Send';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = '917724014443';

const subjects = [
  'Project Collaboration',
  'Freelance Work',
  'Job Opportunity',
  'General Inquiry',
];

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().required('Please select a subject'),
  message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

const sendToWhatsApp = (values) => {
  const text = `Hello, I'm reaching out regarding: *${values.subject}*\n\n👤 Name: ${values.name}\n📧 Email: ${values.email}\n\n💬 Message:\n${values.message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
};

const contactItems = [
  { icon: <SiGmail size={20} />, label: 'Email', value: 'avinashkotarya@email.com' },
  { icon: <SiGooglemaps size={20} />, label: 'Location', value: 'Indore, Madhya Pradesh, India' },
  { icon: <FaLinkedinIn size={20} />, label: 'LinkedIn', value: 'Connect on LinkedIn', link: 'https://linkedin.com/in/avinash-kotarya-0a37b1331' },
  { icon: <SiGithub size={20} />, label: 'GitHub', value: 'View Projects', link: 'https://github.com/OpTiMuS-mov' },
  { icon: <SiInstagram size={20} />, label: 'Instagram', value: '@avinx.mov', link: 'https://instagram.com/avinx.mov' },
  { icon: <SiWhatsapp size={20} />, label: 'WhatsApp', value: '+91 7724014443', link: `https://wa.me/${WHATSAPP_NUMBER}` },
];

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  background: '#0F172A',
  border: '1px solid #334155',
  color: '#F8FAFC',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  transition: 'border-color 0.3s ease',
};


export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const contactCardsRef = useRef([]);
  const formCardRef = useRef(null);
  const formFieldsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, y: 0, clipPath: 'circle(100% at 50% 50%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: leftColRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
      );
      contactCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: -20, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          { opacity: 1, x: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.5, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: leftColRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
        );
      });
      gsap.fromTo(formCardRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: formCardRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
      );
      formFieldsRef.current.forEach((field, i) => {
        if (!field) return;
        gsap.fromTo(field,
          { opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.5, delay: 0.3 + i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: formCardRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleContactHover = (el, enter) => {
    gsap.to(el, { x: enter ? 8 : 0, borderColor: enter ? '#3B82F6' : '#334155', duration: 0.3, ease: 'power2.out' });
  };
  const handleBtnHover = (el, enter) => {
    gsap.to(el, { scale: enter ? 1.02 : 1, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <Box ref={sectionRef} id="contact" sx={{ py: 8, px: 2 }}>
      <Toaster position="top-center" />
      <Container maxWidth="lg">
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 5, opacity: 0 }}>
          <Typography variant="caption" sx={{ color: '#3B82F6', textTransform: 'uppercase', letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace" }}>Contact</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
            Let's{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>connect</Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>Have a question or want to work together? Feel free to reach out!</Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box ref={leftColRef} sx={{ opacity: 0 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Get in touch</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of something exciting.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {contactItems.map((item, i) => (
                  <Card
                    key={item.label}
                    ref={(el) => (contactCardsRef.current[i] = el)}
                    variant="outlined"
                    component={item.link ? 'a' : 'div'}
                    href={item.link || undefined}
                    target={item.link ? '_blank' : undefined}
                    rel={item.link ? 'noreferrer' : undefined}
                    sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderColor: '#334155', cursor: item.link ? 'pointer' : 'default', opacity: 0, textDecoration: 'none', color: 'inherit', '&:hover': { borderColor: '#3B82F6' } }}
                    onMouseEnter={(e) => handleContactHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleContactHover(e.currentTarget, false)}
                  >
                    <Box sx={{ width: 42, height: 42, borderRadius: 2, background: 'rgba(59,130,246,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', flexShrink: 0 }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: 1, display: 'block' }}>{item.label}</Typography>
                      <Typography variant="body2" fontWeight={600} sx={item.link ? { color: '#3B82F6' } : {}}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card ref={formCardRef} sx={{ p: 3.5, opacity: 0 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Send a Message</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Fill out the form below and I'll get back to you soon.</Typography>
              <Formik
                initialValues={{ name: '', email: '', subject: '', message: '' }}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={(values, { resetForm }) => {
                  sendToWhatsApp(values);
                  toast.success('Opening WhatsApp with your message!', {
                    duration: 4000,
                    style: { background: '#1E293B', color: '#F8FAFC', border: '1px solid #3B82F6' },
                    iconTheme: { primary: '#3B82F6', secondary: '#1E293B' },
                  });
                  resetForm();
                }}
              >
                {({ isSubmitting, errors, touched, setFieldTouched, submitForm }) => {
                  const markAllTouched = () => {
                    ['name', 'email', 'subject', 'message'].forEach((f) => setFieldTouched(f, true, false));
                  };
                  return (
                  <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      <Box ref={(el) => (formFieldsRef.current[0] = el)} sx={{ opacity: 0 }}>
                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.75 }}>Name</Typography>
                        <Field
                          name="name" type="text" placeholder="Your name"
                          style={{ ...inputStyle, borderColor: touched.name && errors.name ? '#EF4444' : '#334155' }}
                          onFocus={(e) => { e.target.style.borderColor = touched.name && errors.name ? '#EF4444' : '#3B82F6'; }}
                          onBlur={(e) => { setFieldTouched('name', true); e.target.style.borderColor = touched.name && errors.name ? '#EF4444' : '#334155'; }}
                        />
                        {touched.name && errors.name && (
                          <Typography variant="caption" sx={{ color: '#EF4444', mt: 0.5, display: 'block' }}>{errors.name}</Typography>
                        )}
                      </Box>
                      <Box ref={(el) => (formFieldsRef.current[1] = el)} sx={{ opacity: 0 }}>
                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.75 }}>Email</Typography>
                        <Field
                          name="email" type="email" placeholder="your@email.com"
                          style={{ ...inputStyle, borderColor: touched.email && errors.email ? '#EF4444' : '#334155' }}
                          onFocus={(e) => { e.target.style.borderColor = touched.email && errors.email ? '#EF4444' : '#3B82F6'; }}
                          onBlur={(e) => { setFieldTouched('email', true); e.target.style.borderColor = touched.email && errors.email ? '#EF4444' : '#334155'; }}
                        />
                        {touched.email && errors.email && (
                          <Typography variant="caption" sx={{ color: '#EF4444', mt: 0.5, display: 'block' }}>{errors.email}</Typography>
                        )}
                      </Box>
                      <Box ref={(el) => (formFieldsRef.current[2] = el)} sx={{ opacity: 0 }}>
                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.75 }}>Subject</Typography>
                        <Box sx={{ position: 'relative' }}>
                          <Field
                            as="select"
                            name="subject"
                            style={{
                              ...inputStyle,
                              borderColor: touched.subject && errors.subject ? '#EF4444' : '#334155',
                              cursor: 'pointer',
                              appearance: 'none',
                              paddingRight: 40,
                            }}
                            onFocus={(e) => { e.target.style.borderColor = touched.subject && errors.subject ? '#EF4444' : '#3B82F6'; }}
                            onBlur={(e) => { setFieldTouched('subject', true); e.target.style.borderColor = touched.subject && errors.subject ? '#EF4444' : '#334155'; }}
                          >
                            <option value="" disabled style={{ background: '#0F172A', color: '#94A3B8' }}>Select a subject</option>
                            {subjects.map((s) => (
                              <option key={s} value={s} style={{ background: '#0F172A', color: '#F8FAFC' }}>{s}</option>
                            ))}
                          </Field>
                          <Box sx={{
                            position: 'absolute',
                            right: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Box>
                        </Box>
                        {touched.subject && errors.subject && (
                          <Typography variant="caption" sx={{ color: '#EF4444', mt: 0.5, display: 'block' }}>{errors.subject}</Typography>
                        )}
                      </Box>
                      <Box ref={(el) => (formFieldsRef.current[3] = el)} sx={{ opacity: 0 }}>
                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.75 }}>Message</Typography>
                        <Field
                          name="message" placeholder="Tell me about your project or idea..." as="textarea" rows={4}
                          style={{ ...inputStyle, resize: 'none', borderColor: touched.message && errors.message ? '#EF4444' : '#334155' }}
                          onFocus={(e) => { e.target.style.borderColor = touched.message && errors.message ? '#EF4444' : '#3B82F6'; }}
                          onBlur={(e) => { setFieldTouched('message', true); e.target.style.borderColor = touched.message && errors.message ? '#EF4444' : '#334155'; }}
                        />
                        {touched.message && errors.message && (
                          <Typography variant="caption" sx={{ color: '#EF4444', mt: 0.5, display: 'block' }}>{errors.message}</Typography>
                        )}
                      </Box>
                      <Box
                        ref={(el) => (formFieldsRef.current[4] = el)}
                        sx={{ opacity: 0 }}
                        onMouseEnter={(e) => handleBtnHover(e.currentTarget, true)}
                        onMouseLeave={(e) => handleBtnHover(e.currentTarget, false)}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          fullWidth
                          endIcon={<SendIcon />}
                          onClick={markAllTouched}
                          sx={{
                            py: 1.5,
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            color: '#fff', borderRadius: 2, fontWeight: 600, fontSize: '0.95rem',
                            textTransform: 'none', letterSpacing: 0.5,
                            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                              boxShadow: '0 6px 20px rgba(59,130,246,0.4)',
                            },
                            '&.Mui-disabled': { opacity: 0.6, color: '#fff' },
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Box>
                    </Box>
                  </Form>
                  );
                }}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
