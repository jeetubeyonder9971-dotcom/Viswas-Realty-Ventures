import { useState } from 'react';
import { CFG, PHONE_TEXT, HOURS, SOCIAL, notify, openWA } from '../config';
import { useUI } from '../context/UIContext';
import { Icon } from './Icons';
import { TelLink, WaLink } from './Links';

const INTERESTS = ['Residential', 'Commercial', 'Plots', 'Villas', 'Selling / Leasing'];
const EMPTY = { name: '', phone: '', interest: INTERESTS[0], message: '' };

export default function Contact() {
  const { toast } = useUI();
  const [f, setF] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });

  // Validates the form; shows a toast and returns null when invalid.
  function read() {
    const ph = f.phone.replace(/\D/g, '').slice(-10), nm = f.name.trim();
    if (nm.length < 2) { toast('Please enter your name'); return null; }
    if (!/^[6-9]\d{9}$/.test(ph)) { toast('Please enter a valid 10-digit mobile number'); return null; }
    return { name: nm, phone: ph, interest: f.interest, message: f.message.trim() };
  }

  async function onSubmit(e) {
    e.preventDefault();
    const d = read();
    if (!d) return;
    setSending(true);
    try {
      notify(d);
      if (CFG.useFormSubmit) {
        const r = await fetch('https://formsubmit.co/ajax/' + CFG.email, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: d.name, phone: d.phone, interest: d.interest, message: d.message || 'No message provided',
            _subject: '🏠 New Property Enquiry from ' + d.name, _replyto: CFG.email, _template: 'table',
          }),
        });
        const res = await r.json().catch(() => null);
        if (r.ok || (res && res.success)) {
          toast('Thank you ' + d.name + '! Enquiry sent successfully.');
          setF(EMPTY);
          return;
        }
      }
    } catch (_) {
      // fall through to the email client
    } finally {
      setSending(false);
    }
    const body = `Name: ${d.name}\nPhone: ${d.phone}\nLooking for: ${d.interest}\nMessage: ${d.message || '-'}`;
    toast('Sending via email client...');
    location.href = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent('Property enquiry from ' + d.name) + '&body=' + encodeURIComponent(body);
  }

  function onWhatsApp() {
    const d = read();
    if (!d) return;
    openWA(`Hi, I am ${d.name} (${d.phone}). Looking for: ${d.interest}. ${d.message}`);
  }

  return (
    <section className="alt" id="contact">
      <div className="w two">
        <div>
          <div className="ey">Contact directly</div>
          <h2>Let's find your property</h2>
          <p className="sub">Reach us the way you like. {HOURS}.</p>
          <div className="cs">
            <TelLink className="cc gl"><i className="ic ph"><Icon id="ph" /></i><span>Call us<b>{PHONE_TEXT}</b></span></TelLink>
            <WaLink className="cc gl" href={'https://wa.me/' + CFG.wa + '?text=Hi%20Vishwas%20Realty%20Ventures%2C%20I%27d%20like%20property%20details.'} target="_blank" rel="noopener noreferrer">
              <i className="ic wa"><Icon id="wa" /></i><span>WhatsApp<b>Chat now</b></span>
            </WaLink>
            <a className="cc gl" href={'mailto:' + CFG.email + '?subject=Property%20enquiry'}><i className="ic ml">✉</i><span>Email<b>{CFG.email}</b></span></a>
            <a className="cc gl" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"><i className="ic ig"><Icon id="ig" /></i><span>Instagram<b>@vishwasrealtyventures</b></span></a>
            <a className="cc gl" href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer"><i className="ic fb"><Icon id="fb" /></i><span>Facebook<b>Vishwas Realty Ventures</b></span></a>
          </div>
        </div>
        <form className="pn gl" id="fm" noValidate onSubmit={onSubmit}>
          <h3 style={{ fontSize: 24 }}>Send an enquiry</h3>
          <label htmlFor="n">Name</label>
          <input id="n" autoComplete="name" required value={f.name} onChange={set('name')} />
          <label htmlFor="p">Mobile number</label>
          <input id="p" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" required value={f.phone} onChange={set('phone')} />
          <label htmlFor="i">I am looking for</label>
          <select id="i" value={f.interest} onChange={set('interest')}>
            {INTERESTS.map(x => <option key={x}>{x}</option>)}
          </select>
          <label htmlFor="s">Message (optional)</label>
          <textarea id="s" rows="3" value={f.message} onChange={set('message')} />
          <div className="fr">
            <button className="btn bg" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send enquiry'}</button>
            <button className="btn bo" type="button" onClick={onWhatsApp}>WhatsApp</button>
          </div>
        </form>
      </div>
    </section>
  );
}
