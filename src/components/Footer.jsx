import { CFG, PHONE_TEXT, HOURS, SOCIAL } from '../config';
import { LogoMark } from './Icons';
import { TelLink } from './Links';

export default function Footer() {
  return (
    <footer>
      <div className="w fg">
        <div>
          <div className="logo" style={{ color: '#fff' }}><LogoMark /><span>Vishwas <b>Realty</b> Ventures</span></div>
          <p>Local property advisory in Ranchi, Jharkhand. Verified listings, honest guidance.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#services">Services</a>
          <a href="#founder">Founder</a>
          <a href="#emi">EMI calculator</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h4>Reach us</h4>
          <TelLink>{PHONE_TEXT}</TelLink>
          <a href={'mailto:' + CFG.email}>{CFG.email}</a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram @vishwasrealtyventures</a>
          <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook — Vishwas Realty Ventures</a>
          <p style={{ margin: '5px 0' }}>{HOURS}</p>
        </div>
      </div>
      <div className="w cp">© 2026 Vishwas Realty Ventures, Ranchi. Listings are indicative; verify RERA and title before purchase.</div>
    </footer>
  );
}
