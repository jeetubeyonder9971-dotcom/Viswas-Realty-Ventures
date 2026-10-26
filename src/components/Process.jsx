import { useReveal } from '../hooks/useReveal';

const STEPS = [
  { title: 'Tell us your needs', text: 'Budget, locality, size and timeline.' },
  { title: 'We shortlist', text: 'Only title-verified options that fit.' },
  { title: 'Visit & negotiate', text: 'Site visits and a fair, data-backed price.' },
  { title: 'Registry & handover', text: 'Paperwork, loan and keys, handled.' },
];

export default function Process() {
  const rv = useReveal();
  return (
    <section id="process">
      <div className="w">
        <div className="ey">How it works</div>
        <h2>Four steps to your keys</h2>
        <p className="sub">Simple, transparent and always in your control.</p>
        <div className="steps rv" ref={rv}>
          {STEPS.map(s => <div key={s.title} className="st gl"><h3>{s.title}</h3><p>{s.text}</p></div>)}
        </div>
      </div>
    </section>
  );
}
