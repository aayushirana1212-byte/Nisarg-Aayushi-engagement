import { useState } from 'react';
import { EVENT } from '../config.js';
import MapModal from './MapModal.jsx';
import Reveal from './Reveal.jsx';
import { Divider } from './Ornaments.jsx';

const iconProps = {
  viewBox: '0 0 24 24',
  width: 34,
  height: 34,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10 H20.5 M8 3 V7 M16 3 V7" />
      <path d="M12 13.2 L13 15 L15 15.2 L13.5 16.5 L14 18.4 L12 17.4 L10 18.4 L10.5 16.5 L9 15.2 L11 15 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7 V12 L15.2 14" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21 C12 21 5 14.6 5 9.8 A7 7 0 0 1 19 9.8 C19 14.6 12 21 12 21 Z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </svg>
  );
}

export default function EventDetails() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section id="details" className="section section-cream">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">ENGAGEMENT CEREMONY</p>
          <h2 className="section-title">The Celebration</h2>
          <Divider />
          <p className="section-desc">
            A special day, a beautiful beginning, and memories to cherish forever.
          </p>
        </Reveal>

        <div className="info-grid">
          <Reveal className="info-wrap" delay={100}>
            <article className="info-card">
              <span className="info-icon"><CalendarIcon /></span>
              <h3 className="info-title">WHEN</h3>
              <p className="info-main">{EVENT.day}</p>
              <p className="info-sub">{EVENT.dateLong}</p>
            </article>
          </Reveal>

          <Reveal className="info-wrap" delay={220}>
            <article className="info-card">
              <span className="info-icon"><ClockIcon /></span>
              <h3 className="info-title">TIME</h3>
              <p className="info-main">{EVENT.time}</p>
            </article>
          </Reveal>

          <Reveal className="info-wrap" delay={340}>
            <article className="info-card">
              <span className="info-icon"><PinIcon /></span>
              <h3 className="info-title">WHERE</h3>
              <p className="info-main">{EVENT.venueName}</p>
              <p className="info-sub">{EVENT.venueAddress}</p>
              <p className="info-sub">{EVENT.venueCity}</p>
              <button type="button" className="info-link" onClick={() => setMapOpen(true)}>
                VIEW ON MAP
              </button>
            </article>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="wish-banner">
            <Divider />
            <p>We can't wait to celebrate this beautiful occasion with you.</p>
            <Divider />
          </div>
        </Reveal>
      </div>

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </section>
  );
}
