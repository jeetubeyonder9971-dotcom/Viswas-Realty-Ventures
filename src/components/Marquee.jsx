const LO = ['Harmu', 'Kanke Road', 'Doranda', 'Lalpur', 'Main Road', 'Ormanjhi', 'Tupudana', 'Ring Road', 'Morabadi', 'Bariatu'];
const ITEMS = [...LO, ...LO, ...LO, ...LO];

export default function Marquee() {
  return (
    <div className="mq">
      <div id="mq">{ITEMS.map((x, i) => <span key={i}>✦ {x}</span>)}</div>
    </div>
  );
}
