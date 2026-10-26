import { useState } from 'react';

export default function EmiCalculator() {
  const [amount, setAmount] = useState('4500000');
  const [rate, setRate] = useState('8.5');
  const [years, setYears] = useState('20');

  const a = +amount, r = +rate / 1200, n = +years * 12;
  const e = a * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1), tot = e * n;

  return (
    <section className="alt" id="emi">
      <div className="w two">
        <div>
          <div className="ey">Plan smart</div>
          <h2>Home loan EMI calculator</h2>
          <p className="sub">Estimate your monthly instalment before you shortlist a property. Slide to see the numbers change.</p>
        </div>
        <div className="pn gl">
          <label htmlFor="a">Loan amount <span>{'₹ ' + (a / 100000).toFixed(1) + ' L'}</span></label>
          <input type="range" id="a" min="500000" max="20000000" step="100000" value={amount} onChange={ev => setAmount(ev.target.value)} />
          <label htmlFor="r">Interest rate <span>{rate + ' %'}</span></label>
          <input type="range" id="r" min="6" max="14" step="0.1" value={rate} onChange={ev => setRate(ev.target.value)} />
          <label htmlFor="y">Tenure <span>{years + ' yrs'}</span></label>
          <input type="range" id="y" min="1" max="30" value={years} onChange={ev => setYears(ev.target.value)} />
          <label>Monthly EMI</label>
          <div className="emi">{'₹ ' + Math.round(e).toLocaleString('en-IN')}</div>
          <div className="sb"><i style={{ width: (a / tot * 100) + '%' }} /></div>
          <div className="sl"><span>Principal</span><span>{'Interest ₹ ' + (Math.round(tot - a) / 100000).toFixed(1) + ' L'}</span></div>
        </div>
      </div>
    </section>
  );
}
