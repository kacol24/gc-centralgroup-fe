import Navbar from './components/navbar';
import HeroComponent from './components/landing-components/hero-component';
import Footer from './components/footer';
import ContactUs from './components/contact-us';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroComponent />
      <ContactUs />
      <Footer />
    </div>
  );
}
