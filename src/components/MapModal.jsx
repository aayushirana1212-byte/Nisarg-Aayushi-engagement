import { useEffect, useRef, useState } from 'react';
import { EVENT, MAPS_URL, MAPS_EMBED_URL, VENUE_FULL_ADDRESS } from '../config.js';

// Full-screen map of the venue, shown inside the website so it opens
// everywhere, even where external map sites are not allowed to load.
export default function MapModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  if (!open) return null;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VENUE_FULL_ADDRESS);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      window.prompt('Copy the venue address:', VENUE_FULL_ADDRESS);
    }
  };

  return (
    <div className="map-modal" role="dialog" aria-modal="true" aria-label="Venue map">
      <button type="button" className="map-modal-backdrop" onClick={onClose} aria-label="Close map" />
      <div className="map-modal-panel">
        <header className="map-modal-head">
          <div>
            <p className="map-modal-eyebrow">VENUE LOCATION</p>
            <h3 className="map-modal-title">{EVENT.venueName}</h3>
          </div>
          <button ref={closeRef} type="button" className="map-modal-close" onClick={onClose} aria-label="Close map">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>
        </header>

        <div className="map-modal-map">
          <iframe
            title="Map of Ashish Restaurant & Banquet, Karelibagh, Vadodara"
            src={MAPS_EMBED_URL}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <footer className="map-modal-foot">
          <p className="map-address">
            {EVENT.venueAddress}, {EVENT.venueCity}
          </p>
          <div className="map-actions">
            <a className="btn btn-burgundy map-btn" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              GET DIRECTIONS
            </a>
            <button type="button" className="btn btn-outline map-btn" onClick={copyAddress}>
              {copied ? 'ADDRESS COPIED' : 'COPY ADDRESS'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
