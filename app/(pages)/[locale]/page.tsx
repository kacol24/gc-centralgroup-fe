import Navbar from '../../components/navbar';
import HeroComponent from '../../components/landing-components/hero-component';
import IntroductionComponent from '../../components/landing-components/introduction-component';
import DreamHomeComponent from '../../components/landing-components/dream-home-component';
import CarouselAwardeComponent from '../../components/landing-components/carousel-awarde-component';

import CentralNewsComponent from '../../components/landing-components/central-news-component';
import CommunityEcosystemComponent from '../../components/landing-components/comuunity-ecosystem-component';
import { Suspense } from 'react';
import PropertyFinderSection from './development/components/property-finder-section';

import {getClient} from '@/app/lib/urqlClient';
import BannersQuery from '@/graphql/BannersQuery.graphql';
import BlogsQuery from '@/graphql/BlogsQuery.graphql';

export default async function Home() {
    const client = await getClient();

    const {data: heroBanners} = await client.query(BannersQuery, {
        "lang": "en",
        "type": "hero_banner"
    });
    const {data: awardBanners} = await client.query(BannersQuery, {
        "lang": "en",
        "type": "award_banner"
    });
    const {data: blogs} = await client.query(BlogsQuery, {
        "lang": "en",
        "limit": 6
    });

  return (
    <div className="bg-backgroundWhite">
      <Suspense>
        <Navbar />
      </Suspense>
      <HeroComponent slides={heroBanners?.banners}/>
      <IntroductionComponent />
      <DreamHomeComponent />
      <CarouselAwardeComponent slides={awardBanners?.banners}/>
      <PropertyFinderSection />
      <CentralNewsComponent blogs={blogs?.blogs}/>
      <CommunityEcosystemComponent />
    </div>
  );
}
