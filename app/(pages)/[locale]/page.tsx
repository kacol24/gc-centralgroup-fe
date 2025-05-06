import Navbar from '../../components/navbar';
import HeroComponent from '../../components/landing-components/hero-component';
import IntroductionComponent from '../../components/landing-components/introduction-component';
import DreamHomeComponent from '../../components/landing-components/dream-home-component';

import CentralNewsComponent from '../../components/landing-components/central-news-component';
import CommunityEcosystemComponent from '../../components/landing-components/comuunity-ecosystem-component';
import { Suspense } from 'react';

import { getClient } from '@/app/lib/urqlClient';
import BannersQuery from '@/graphql/BannersQuery.graphql';
import BlogsQuery from '@/graphql/BlogsQuery.graphql';
import { getLocale } from 'next-intl/server';
import SectionAwards from '@/app/components/landing-components/section-awards';
// import PropertyFinderSection from './development/components/property-finder-section';

async function getHomepageBanners(locale, client) {
  const { data: heroBanners } = await client.query(BannersQuery, {
    lang: locale,
    type: 'homepage_banner',
  });

  return heroBanners;
}

async function getBlogs(locale, client) {
  const { data: blogs } = await client.query(BlogsQuery, {
    lang: locale,
    limit: 6,
  });

  return blogs;
}

const AwardsSkeleton = () => {
  return (
    <div className="-ml-4 flex gap-4 animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          role="group"
          aria-roledescription="slide"
          className="min-w-0 shrink-0 grow-0 pl-4 basis-1/2 lg:basis-1/6"
        >
          <div className="flex flex-col items-center justify-center p-1 w-[186px] min-w-[186px] grow relative">
            <div className="w-full h-auto bg-gray-300 aspect-square"></div>
            <div className="mt-2 h-4 w-3/4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default async function Home() {
  const client = await getClient();
  const locale = await getLocale();

  const bannersData = getHomepageBanners(locale, client);
  const blogsData = getBlogs(locale, client);

  const [heroBanners, blogs] = await Promise.all([bannersData, blogsData]);

  return (
    <div className="bg-backgroundWhite">
      <Suspense>
        <Navbar />
      </Suspense>
      <HeroComponent slides={heroBanners?.banners} />
      <IntroductionComponent />
      <DreamHomeComponent />
      <Suspense fallback={<AwardsSkeleton />}>
        <SectionAwards />
      </Suspense>
      {/* <PropertyFinderSection /> */}
      <CentralNewsComponent blogs={blogs?.blogs} />
      <CommunityEcosystemComponent />
    </div>
  );
}
