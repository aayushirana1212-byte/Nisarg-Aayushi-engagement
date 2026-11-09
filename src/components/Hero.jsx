import { BRIDE, GROOM } from '../config.js';
import { Divider, PalaceSilhouette } from './Ornaments.jsx';

export default function Hero() {
  const viewInvitation = () => {
    const el = document.getElementById('details');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-frame" aria-hidden="true" />
      <PalaceSilhouette className="hero-palace" />

      <div className="hero-content">
        <p className="hero-eyebrow">Together With Our Families</p>
        <h1 className="hero-names">
          {GROOM.name} <span>&amp;</span> {BRIDE.name}
        </h1>
        <Divider className="divider-light" />

        <div className="hero-families">
          <p>
            Son of
            <br />
            <strong>{GROOM.parents}</strong>
          </p>
          <span className="hero-heart" aria-hidden="true">♥</span>
          <p>
            Daughter of
            <br />
            <strong>{BRIDE.parents}</strong>
          </p>
        </div>

        <p className="hero-request">Request the Pleasure of Your Company</p>
        <p className="hero-occasion">On Our Engagement Ceremony</p>

        <button type="button" className="btn btn-gold" onClick={viewInvitation}>
          VIEW INVITATION
        </button>
      </div>
    </section>
  );
}
