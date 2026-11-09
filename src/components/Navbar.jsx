import { useEffect, useState } from 'react';
import { MusicToggle } from './MusicControls.jsx';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'details', label: 'Event Details' },
  { id: 'story', label: 'Our Story' },
];

export default function Navbar({ playing, onToggleMusic }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = LINKS[0].id;
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when the window grows to desktop size.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const goTo = (event, id) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <header className={`navbar ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="navbar-inner">
        <a href="#home" className="nav-brand" onClick={(e) => goTo(e, 'home')} aria-label="Go to top">
          N <span>&amp;</span> A
        </a>

        <nav id="primary-nav" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              onClick={(e) => goTo(e, id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <MusicToggle playing={playing} onToggle={onToggleMusic} />
          <button
            type="button"
            className={`nav-burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
