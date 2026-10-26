import { useReveal } from '../hooks/useReveal';

export default function Founder() {
  const rv = useReveal();
  return (
    <section id="founder">
      <div className="w">
        <div className="founder-wrap rv" ref={rv}>
          <div className="founder-img">
            <img src="/images/founder.jpg" alt="Jeetu Rajput - Founder and Managing Director, Vishwas Realty Ventures" loading="lazy" />
          </div>
          <div className="founder-txt">
            <div className="ey">Founder's message</div>
            <h2>Building a better tomorrow</h2>
            <blockquote className="fq">"At our core, we believe in creating spaces that inspire, communities that thrive, and relationships that last a lifetime."</blockquote>
            <div className="founder-name"><strong>Jeetu Rajput</strong><span>Founder &amp; Managing Director</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
