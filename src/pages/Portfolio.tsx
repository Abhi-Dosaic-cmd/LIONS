import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import About from '../components/About';
import VisionMission from '../components/VisionMission';
import Board from '../components/Board';

import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Portfolio() {
  return (
    <main className="relative">
      <Hero />
      <StatsSection />
      <About />
      <VisionMission />
      <Board />

      <Gallery />
      <Contact />
    </main>
  );
}
