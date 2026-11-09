import { useEffect, useRef, useState } from 'react';
import { BRIDE, GROOM, EVENT } from '../config.js';
import { Corners, Divider } from './Ornaments.jsx';

/*
  Stages:
  closed   -> closed envelope with wax heart seal
  opening  -> flap opens, small card slides out
  revealed -> full invitation card is shown with the ENTER CELEBRATION button
  leaving  -> intro fades away, main website is already mounted underneath
*/
export default function EnvelopeIntro({ onOpen, onEnter, onDone }) {
  const [stage, setStage] = useState('closed');
  const [sceneGone, setSceneGone] = useState(false);
  const timers = useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    },
    []
  );

  const openEnvelope = () => {
    if (stage !== 'closed') return;
    if (onOpen) onOpen(); // first user interaction: allows music to start
    setStage('opening');
    later(() => setStage('revealed'), 2400);
    later(() => setSceneGone(true), 3300);
  };

  const enterCelebration = () => {
    if (stage !== 'revealed') return;
    setStage('leaving');
    onEnter();
    later(onDone, 950);
  };

  const isOpen = stage !== 'closed';
  const showCard = stage === 'revealed' || stage === 'leaving';

  return (
    <div className={`intro intro--${stage}`} role="dialog" aria-label="Engagement invitation">
      <div className="intro-inner">
        {!sceneGone && (
          <div className={`env-scene ${isOpen ? 'is-opening' : ''} ${showCard ? 'is-out' : ''}`}>
            <p className="env-top">
              <span className="env-top-small">Engagement Invitation</span>
              <span className="env-top-names">
                {GROOM.name} &amp; {BRIDE.name}
              </span>
            </p>

            <div className="envelope">
              <div className="env-back" />

              {/* Small card that slides out of the envelope */}
              <div className="env-card" aria-hidden="true">
                <div className="env-card-inner">
                  <span className="env-card-small">ENGAGEMENT INVITATION</span>
                  <span className="env-card-names">
                    {GROOM.name} &amp; {BRIDE.name}
                  </span>
                  <span className="env-card-date">{EVENT.dateUpper}</span>
                </div>
              </div>

              <div className="env-front" />
              <svg className="env-lines" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 66 L38 36" />
                <path d="M100 66 L62 36" />
                <path d="M0 0 L50 35 L100 0" />
              </svg>

              <div className="env-text">
                <span className="env-text-main">YOU ARE CORDIALLY INVITED</span>
                <span className="env-text-sub">
                  {GROOM.name} &amp; {BRIDE.name}
                </span>
              </div>

              <div className="env-flap">
                <svg viewBox="0 0 100 35" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points="0,0 50,35 100,0" />
                </svg>
              </div>

              <div className="env-frame" />

              <button
                type="button"
                className="env-seal"
                onClick={openEnvelope}
                aria-label="Open your invitation"
                disabled={isOpen}
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <radialGradient id="seal-grad" cx="38%" cy="30%" r="80%">
                      <stop offset="0%" stopColor="#ef4560" />
                      <stop offset="55%" stopColor="#b3122f" />
                      <stop offset="100%" stopColor="#6e0a1d" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M50 92 C50 92 6 63 6 33 C6 16 19 6 32 6 C41 6 47 11 50 18 C53 11 59 6 68 6 C81 6 94 16 94 33 C94 63 50 92 50 92 Z"
                    fill="url(#seal-grad)"
                    stroke="#7d0c20"
                    strokeWidth="2"
                  />
                  <path
                    d="M50 82 C50 82 15 59 15 34 C15 22 24 14 33 14 C41 14 47 19 50 26 C53 19 59 14 67 14 C76 14 85 22 85 34 C85 59 50 82 50 82 Z"
                    fill="none"
                    stroke="#f7b4bf"
                    strokeOpacity="0.55"
                    strokeWidth="1.4"
                  />
                  <ellipse cx="30" cy="25" rx="11" ry="6" fill="#fff" fillOpacity="0.28" transform="rotate(-28 30 25)" />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize="21"
                    fontWeight="600"
                    fill="#fbd9a0"
                    fillOpacity="0.92"
                  >
                    N &amp; A
                  </text>
                </svg>
              </button>
            </div>

            <button
              type="button"
              className="btn btn-gold env-open-btn"
              onClick={openEnvelope}
              disabled={isOpen}
            >
              OPEN YOUR INVITATION
            </button>
          </div>
        )}

        {showCard && (
          <article className="invite-card">
            <Corners />
            <div className="invite-card-body">
              <p className="ic-title rise" style={{ '--d': '0.15s' }}>ENGAGEMENT INVITATION</p>
              <Divider className="rise" />
              <p className="ic-blessing rise" style={{ '--d': '0.3s' }}>
                Together with the blessings of our families
              </p>

              <div className="ic-person rise" style={{ '--d': '0.45s' }}>
                <p className="ic-label">
                  Son of
                  <br />
                  <strong>{GROOM.parents}</strong>
                </p>
                <h2 className="ic-name">{GROOM.name.toUpperCase()}</h2>
              </div>

              <p className="ic-heart rise" style={{ '--d': '0.6s' }} aria-hidden="true">♥</p>

              <div className="ic-person rise" style={{ '--d': '0.75s' }}>
                <p className="ic-label">
                  Daughter of
                  <br />
                  <strong>{BRIDE.parents}</strong>
                </p>
                <h2 className="ic-name">{BRIDE.name.toUpperCase()}</h2>
              </div>

              <Divider className="rise" />

              <div className="ic-details rise" style={{ '--d': '0.95s' }}>
                <p className="ic-date">{EVENT.dateUpper}</p>
                <p className="ic-time">{EVENT.time}</p>
                <p className="ic-place">{EVENT.venueName}</p>
                <p className="ic-venue">{EVENT.venueAddress}</p>
                <p className="ic-venue">{EVENT.venueCity}</p>
              </div>

              <button
                type="button"
                className="btn btn-burgundy rise"
                style={{ '--d': '1.15s' }}
                onClick={enterCelebration}
              >
                ENTER CELEBRATION
              </button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
