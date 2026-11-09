import { BRIDE, GROOM, EVENT } from '../config.js';
import Reveal from './Reveal.jsx';
import { Corners, Divider } from './Ornaments.jsx';

export default function OurStory() {
  return (
    <section id="story" className="section section-pink">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">TWO HEARTS, ONE PROMISE</p>
          <h2 className="section-title">Our Story</h2>
          <Divider />
        </Reveal>

        <Reveal delay={150}>
          <div className="story-card">
            <Corners />
            <p className="story-text">
              Every beautiful journey begins with a special moment. Two hearts, two families, and one
              beautiful promise.
            </p>
            <p className="story-text">
              We are excited to begin this new chapter of our lives and would love to have you with us as
              we celebrate our engagement.
            </p>

            <Divider />

            <p className="story-names">
              {GROOM.name} <span>&amp;</span> {BRIDE.name}
            </p>
            <p className="story-date">{EVENT.dateUpper}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
