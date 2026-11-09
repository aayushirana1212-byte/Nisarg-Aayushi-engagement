import { useEffect, useState } from 'react';
import { EVENT_TARGET } from '../config.js';
import Reveal from './Reveal.jsx';
import { Divider } from './Ornaments.jsx';

const pad = (n) => String(n).padStart(2, '0');

function getTimeLeft() {
  // Never negative: once the date passes everything stays at zero.
  const diff = Math.max(0, EVENT_TARGET - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section id="countdown" className="section section-burgundy">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">12 DECEMBER 2026</p>
          <h2 className="section-title">Counting Every Moment</h2>
          <Divider className="divider-light" />
          <p className="section-desc">The countdown to our beautiful beginning.</p>
        </Reveal>

        <Reveal delay={150}>
          <div className="countdown-grid" role="timer" aria-live="off">
            {units.map(({ label, value }) => (
              <div className="count-box" key={label}>
                <span className="count-value">{pad(value)}</span>
                <span className="count-label">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
