import { useEffect, useState } from 'react';
import { LogoMark } from './Icons';

function initialTheme() {
  try { return localStorage.getItem('th') || document.documentElement.dataset.theme; } catch (_) { return document.documentElement.dataset.theme; }
}

export default function Header() {
  const [theme, setTheme] = useState(initialTheme);
  const [navOpen, setNavOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const n = theme === 'dark' ? 'light' : 'dark';
    setTheme(n);
    try { localStorage.setItem('th', n); } catch (_) {}
  };

  // scroll progress bar under the header
  useEffect(() => {
    const onScroll = () => setProgress(Math.min(100, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100));
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header>
      <div className="w hd">
        <a className="logo" href="#top"><LogoMark /><span>Vishwas <b>Realty</b> Ventures</span></a>
        <nav id="nv" className={navOpen ? 'o' : ''} onClick={() => setNavOpen(false)}>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#founder">Founder</a>
          <a href="#emi">EMI</a>
          <a href="#reviews">Reviews</a>
          <a className="btn bg" href="#contact" style={{ padding: '10px 20px' }}>Contact</a>
        </nav>
        <div className="h-actions">
          <button className="ib" id="th" aria-label="Toggle theme" onClick={toggleTheme}>◐</button>
          <button className="ib" id="bg" aria-label="Menu" onClick={() => setNavOpen(o => !o)}>☰</button>
        </div>
      </div>
      <i id="pb" style={{ width: progress + '%' }} />
    </header>
  );
}
