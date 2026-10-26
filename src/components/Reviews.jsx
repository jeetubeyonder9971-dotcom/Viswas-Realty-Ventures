import { useReveal } from '../hooks/useReveal';

const REVIEWS = [
  { initials: 'SS', color: '#1d7a56', name: 'Shreya Sharma', loc: '3 BHK, Harmu', text: 'Vishwas Realty Ventures provided helpful guidance while we explored property options. The team was approachable, answered our questions, and explained the process clearly.' },
  { initials: 'AK', color: '#b8892b', name: 'Amit Kumar', loc: 'Investor, Kanke Road', text: 'I was exploring property options from an investment point of view. The team explained the location, available configurations, and pricing, which helped me evaluate the property against my requirements.' },
  { initials: 'SP', color: '#833ab4', name: 'Suresh Patel', loc: 'Plot, Ormanjhi', text: 'Vishwas Realty Ventures ke saath experience bahut achha raha. Inki team customers ke saath sirf business relationship nahi, balki ek achha personal connection bhi banati hai. Trust aur communication dono kaafi achhe hain.' },
  { initials: 'PM', color: '#e1306c', name: 'Priya Mehta', loc: '2 BHK, Doranda', text: 'Maine 6 mahine alag-alag brokers se baat ki — koi clear answer nahi deta tha. Vishwas ki team ne pehli meeting mein hi budget, location aur paperwork sab samjha diya. Registry tak ka poora kaam smooth tha.' },
  { initials: 'NK', color: '#1877f2', name: 'Nikhil Kashyap', loc: 'Commercial, Main Road', text: "My biggest fear was hidden charges and title issues. Vishwas team showed me every document upfront — no surprises, no pressure. That kind of transparency is rare in Ranchi's real estate market." },
  { initials: 'DG', color: '#25d366', name: 'Deepika Gupta', loc: 'Villa, Ring Road', text: "We were relocating from Delhi and had zero knowledge of Ranchi's property market. Jeetu bhai personally drove us to 5 different sites, explained the pros and cons honestly, and never once pushed us toward a costlier option." },
];

export default function Reviews() {
  const rv = useReveal();
  return (
    <section className="alt" id="reviews">
      <div className="w">
        <div className="ey">Real stories, real trust</div>
        <h2>What our clients say about us</h2>
        <p className="sub">Every family has a story. Here's what working with Vishwas Realty Ventures felt like for them.</p>
        <div className="review-grid rv" ref={rv}>
          {REVIEWS.map(r => (
            <div key={r.name} className="rcard gl">
              <div className="rcard-top">
                <div className="ravatar" style={{ background: r.color }}>{r.initials}</div>
                <div><strong>{r.name}</strong><span className="rloc">{r.loc}</span></div>
              </div>
              <div className="rstars">★★★★★</div>
              <p>"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
