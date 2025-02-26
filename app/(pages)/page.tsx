import Navbar from '../components/navbar';
import HeroComponent from '../components/landing-components/hero-component';
import IntroductionComponent from '../components/landing-components/introduction-component';
import DreamHomeComponent from '../components/landing-components/dream-home-component';
import CarouselAwardeComponent from '../components/landing-components/carousel-awarde-component';

import CentralNewsComponent from '../components/landing-components/central-news-component';
import CommunityEcosystemComponent from '../components/landing-components/comuunity-ecosystem-component';
import { Suspense } from 'react';
import PropertyFinderSection from './development/components/property-finder-section';

export default function Home() {
  return (
    <div className="">
      <Suspense>
        <Navbar />
      </Suspense>
      <HeroComponent />
      <IntroductionComponent />
      <DreamHomeComponent />
      <CarouselAwardeComponent />
      <PropertyFinderSection />
      <CentralNewsComponent />
      <CommunityEcosystemComponent />
    </div>
  );
}
