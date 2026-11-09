import { useEffect, useState } from 'react';
import useMusic from './hooks/useMusic.js';
import EnvelopeIntro from './components/EnvelopeIntro.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ScratchCard from './components/ScratchCard.jsx';
import Countdown from './components/Countdown.jsx';
import EventDetails from './components/EventDetails.jsx';
import OurStory from './components/OurStory.jsx';
import Footer from './components/Footer.jsx';
import { FloatingMusic } from './components/MusicControls.jsx';

export default function App() {
  const [entered, setEntered] = useState(false); // main website mounted?
  const [introVisible, setIntroVisible] = useState(true); // intro overlay still in DOM?
  const music = useMusic();

  // Lock page scrolling while the invitation is on screen.
  useEffect(() => {
    document.body.style.overflow = introVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [introVisible]);

  const handleEnter = () => {
    window.scrollTo(0, 0);
    setEntered(true);
  };

  return (
    <>
      {entered && (
        <div className="site">
          <Navbar playing={music.playing} onToggleMusic={music.toggle} />
          <main>
            <Hero />
            <ScratchCard />
            <Countdown />
            <EventDetails />
            <OurStory />
          </main>
          <Footer />
          <FloatingMusic playing={music.playing} notice={music.notice} onToggle={music.toggle} />
        </div>
      )}

      {introVisible && (
        <EnvelopeIntro
          onOpen={music.startFromInteraction}
          onEnter={handleEnter}
          onDone={() => setIntroVisible(false)}
        />
      )}
    </>
  );
}
