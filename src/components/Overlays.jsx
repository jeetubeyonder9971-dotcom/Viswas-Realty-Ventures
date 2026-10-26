import { useEffect, useRef, useState } from 'react';
import { CFG, PHONE, PHONE_TEXT, HOURS, SOCIAL } from '../config';
import { useUI } from '../context/UIContext';
import { Icon } from './Icons';
import { TelLink, WaLink } from './Links';

// Property detail modal (opened via openProperty({ img, tag, name, loc, price })).
export function PropertyModal() {
  const { property, closeProperty } = useUI();
  const p = property || {};
  return (
    <div id="mod" className={property ? 'o' : ''} onClick={e => { if (e.target.id === 'mod') closeProperty(); }}>
      <div className="pn gl">
        <img src={p.img} alt="" />
        <div className="mb">
          <span className="tag">{p.tag}</span>
          <h2 style={{ fontSize: 26 }}>{p.name}</h2>
          <p className="m">{p.loc}</p>
          <p className="pr">{p.price}</p>
          <div className="fr">
            <WaLink className="btn bg">WhatsApp</WaLink>
            <TelLink className="btn bo">Call</TelLink>
            <button className="btn bo" onClick={closeProperty}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating quick-contact dock: hides while scrolling, slides back in when scrolling stops.
export function Dock() {
  const { property } = useUI();
  const [on, setOn] = useState(false);
  const modalOpen = useRef(false);
  modalOpen.current = !!property;

  useEffect(() => {
    let st;
    const hide = () => {
      setOn(false);
      clearTimeout(st);
      st = setTimeout(() => { if (!modalOpen.current) setOn(true); }, 650);
    };
    const evs = ['scroll', 'wheel', 'touchmove'];
    evs.forEach(t => addEventListener(t, hide, { passive: true }));
    const first = setTimeout(() => setOn(true), 1800);
    return () => {
      evs.forEach(t => removeEventListener(t, hide));
      clearTimeout(st);
      clearTimeout(first);
    };
  }, []);

  return (
    <div className={'dock' + (on ? ' on' : '')} id="dock" role="navigation" aria-label="Quick contact">
      <a className="ig" aria-label="Instagram" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"><Icon id="ig" /></a>
      <a className="fb" aria-label="Facebook" href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer"><Icon id="fb" /></a>
      <WaLink className="wa" aria-label="WhatsApp" href={'https://wa.me/' + CFG.wa + '?text=Hi%20Vishwas%20Realty%20Ventures'} target="_blank" rel="noopener noreferrer"><Icon id="wa" /></WaLink>
      <TelLink className="ph" aria-label="Call"><Icon id="ph" /></TelLink>
    </div>
  );
}

// Fallback sheet shown when tapping a call link doesn't open a dialer (e.g. on desktop).
export function CallSheet() {
  const { callOpen, closeCall, toast } = useUI();
  const copy = async () => {
    try { await navigator.clipboard.writeText(PHONE_TEXT); toast('Number copied'); } catch (_) { toast('Long-press the number to copy it'); }
  };
  return (
    <div id="cs" role="dialog" aria-label="Call us" className={callOpen ? 'o' : ''} onClick={e => { if (e.target.id === 'cs') closeCall(); }}>
      <div className="pn gl">
        <div className="ey">Call us</div>
        <div className="emi" style={{ fontSize: 30, margin: '8px 0 4px' }}><a href={'tel:' + PHONE}>{PHONE_TEXT}</a></div>
        <p className="m">{HOURS}</p>
        <div className="fr">
          <a className="btn bg" href={'tel:' + PHONE}>Tap to call</a>
          <button className="btn bo" type="button" onClick={copy}>Copy number</button>
          <button className="btn bo" type="button" onClick={closeCall}>Close</button>
        </div>
      </div>
    </div>
  );
}

export function Toast() {
  const { toastMsg, toastOn } = useUI();
  return <div id="toast" role="status" className={toastOn ? 'o' : ''}>{toastMsg}</div>;
}
