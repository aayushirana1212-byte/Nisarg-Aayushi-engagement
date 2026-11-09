import { BRIDE, GROOM, EVENT } from '../config.js';
import { Divider } from './Ornaments.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-eyebrow">WITH LOVE &amp; BLESSINGS</p>
      <p className="footer-names">
        {GROOM.name} <span>&amp;</span> {BRIDE.name}
      </p>
      <p className="footer-date">{EVENT.dateDots}</p>
      <Divider className="divider-light" />
      <p className="footer-made">MADE WITH LOVE FOR OUR SPECIAL DAY</p>
    </footer>
  );
}
