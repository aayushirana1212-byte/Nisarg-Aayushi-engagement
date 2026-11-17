import { useEffect, useState } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ScratchCard from './components/ScratchCard.jsx';
import Countdown from './components/Countdown.jsx';
import EventDetails from './components/EventDetails.jsx';
import OurStory from './components/OurStory.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [entered, setEntered] = useState(false); // main website mounted?
  const [introVisible, setIntroVisible] = useState(true); // intro overlay still in DOM?

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
          <Navbar />
          <main>
            <Hero />
            <ScratchCard />
            <Countdown />
            <EventDetails />
            <OurStory />
          </main>
          <Footer />
        </div>
      )}

      {introVisible && (
        <EnvelopeIntro
          onEnter={handleEnter}
          onDone={() => setIntroVisible(false)}
        />
      )}
    </>
  );
}
