import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { TelLink, WaLink } from './Links';
import HeroScene from './HeroScene';

function CountUp({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const s = performance.now();
    let raf;
    const f = now => {
      const k = Math.min((now - s) / 1600, 1);
      setN(Math.round(to * k));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <b>{n.toLocaleString('en-IN') + (to === 500 ? '+' : '')}</b>;
}

export default function Hero() {
  const rv = useReveal();
  return (
    <div className="hero" id="top">
      <div className="au"><i /><i /></div>
      <div className="w hg">
        <div className="rv" ref={rv}>
          <span className="pill"><u />RANCHI'S LOCAL PROPERTY ADVISORS</span>
          <h1>Your next address in <span className="gt">Ranchi</span>, found with confidence.</h1>
          <p>Homes, plots and commercial spaces from Harmu to Kanke Road and Ormanjhi. Title-verified listings, honest price guidance and full registry support.</p>
          <div className="cta">
            <a className="btn bg" href="#services">Our services</a>
            <TelLink className="btn bo">📞 Call now</TelLink>
            <WaLink className="btn bo">WhatsApp</WaLink>
          </div>
          <div className="stats">
            <div><CountUp to={500} /><span>Families served</span></div>
            <div><CountUp to={100} /><span>% Title checked</span></div>
          </div>
        </div>
        <HeroScene />
      </div>
      <a className="sd" href="#projects" aria-label="Scroll down"><i /></a>
    </div>
  );
}
