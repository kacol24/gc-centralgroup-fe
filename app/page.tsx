import Navbar from './components/navbar';
import HeroComponent from './components/landing-components/hero-component';
import Footer from './components/footer';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroComponent />
      <Footer />
    </div>
  );
}
