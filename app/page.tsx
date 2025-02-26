import Navbar from './components/navbar';
import HeroComponent from './components/landing-components/hero-component';
import IntroductionComponent from './components/landing-components/introduction-component';
import Footer from './components/footer';
import ContactUs from './components/contact-us';
import DreamHomeComponent from './components/landing-components/dream-home-component';
import CarouselAwardeComponent from './components/landing-components/carousel-awarde-component';
import PropertyFinder from './(pages)/development/components/property-finder';
import CentralNewsComponent from './components/landing-components/central-news-component';
import CommunityEcosystemComponent from './components/landing-components/comuunity-ecosystem-component';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroComponent />
      <IntroductionComponent />
      <DreamHomeComponent />
      <CarouselAwardeComponent />
      <PropertyFinder />
      <CentralNewsComponent />
      <CommunityEcosystemComponent />
      <ContactUs />
      <Footer />
    </div>
  );
}
