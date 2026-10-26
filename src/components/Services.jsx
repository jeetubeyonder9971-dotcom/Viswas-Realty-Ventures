import { useReveal } from '../hooks/useReveal';

const SERVICES = [
  { icon: '🏡', title: 'Buy a home', text: '2, 3 and 4 BHK apartments, duplexes and villas in Harmu, Kanke, Doranda and Ring Road, matched to your budget and commute.', big: true },
  { icon: '🏢', title: 'Commercial', text: 'Showrooms, clinics and offices on prime roads.' },
  { icon: '🌳', title: 'Plots & land', text: 'Verified plots on growth corridors.' },
  { icon: '📑', title: 'Documentation', text: 'RERA checks, agreements and registry.' },
  { icon: '💰', title: 'Loans & valuation', text: 'Bank coordination and comparable-sale price guidance, so you never overpay.', big: true },
];

export default function Services() {
  const rv = useReveal();
  return (
    <section className="alt" id="services">
      <div className="w">
        <div className="ey">What we do</div>
        <h2>Brokerage, start to registry</h2>
        <p className="sub">One team from the first site visit to the final paperwork.</p>
        <div className="bento rv" ref={rv}>
          {SERVICES.map(s => (
            <div key={s.title} className={'sv gl' + (s.big ? ' big' : '')}>
              <i>{s.icon}</i><h3>{s.title}</h3><p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
