import { useEffect } from 'react';
import { UIProvider } from './context/UIContext';
import { IconSprite } from './components/Icons';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Process from './components/Process';
import EmiCalculator from './components/EmiCalculator';
import Founder from './components/Founder';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PropertyModal, Dock, CallSheet, Toast } from './components/Overlays';

// Cursor-following glow on glass cards (.gl), desktop pointers only.
function useCardGlow() {
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return;
    const move = e => {
      const t = e.target.closest && e.target.closest('.gl');
      if (t) {
        const r = t.getBoundingClientRect();
        t.style.setProperty('--mx', e.clientX - r.left + 'px');
        t.style.setProperty('--my', e.clientY - r.top + 'px');
      }
    };
    document.addEventListener('pointermove', move);
    return () => document.removeEventListener('pointermove', move);
  }, []);
}

export default function App() {
  useCardGlow();
  return (
    <UIProvider>
      <IconSprite />
      <Header />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <EmiCalculator />
      <Founder />
      <Reviews />
      <Contact />
      <Footer />
      <PropertyModal />
      <Dock />
      <CallSheet />
      <Toast />
    </UIProvider>
  );
}
