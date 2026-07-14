import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import BatAnimations from './BatAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <BatAnimations />
      <Navbar />
      <Outlet />
    </>
  );
}
