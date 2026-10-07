import HeroSection from '../components/HeroSection';
import Cravings from '../components/home/Cravings';
import Signatures from '../components/home/Signatures';
import Story from '../components/home/Story';
import Moments from '../components/home/Moments';
import Reviews from '../components/home/Reviews';
import Finale from '../components/home/Finale';
import '../components/home/home.css';

/* Home v6 — "An evening at Ohana". The hero is untouched; everything
   after it lives in src/components/home/. The v4 page is kept in Home.v4.jsx. */
const Home = () => (
  <main className="theme-dark home-stage relative overflow-hidden">
    <HeroSection />
    <Cravings />
    <Signatures />
    <Story />
    <Moments />
    <Reviews />
    <Finale />
  </main>
);

export default Home;
