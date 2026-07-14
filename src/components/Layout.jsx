import { useState, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import TransformerAnimations from './TransformerAnimations';
import AutobotSplash from './AutobotSplash';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname } = useLocation();
  const [splashComplete, setSplashComplete] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.target.closest('.mech-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {!splashComplete && <AutobotSplash onComplete={handleSplashComplete} />}
      <ScrollToTop />
      <TransformerAnimations />
      <Navbar />
      <Outlet />
    </>
  );
}
