import { Suspense } from 'react';
import CardListDevelopment from './components/card-list-development';
import CarouselOurPartner from './components/carousel-our-partner';
import ProjectsQuery from '@/graphql/ProjectsQuery.graphql';
import { getLocale } from 'next-intl/server';
import { getClient } from '@/app/lib/urqlClient';
import PropertyFinderSection from '@/app/(pages)/[locale]/development/components/property-finder-section';

export default async function Development() {
  const locale = await getLocale();
  const client = await getClient();

  const { data: projectsResponse } = await client.query(ProjectsQuery, {
    lang: locale,
  });

  return (
    <div className="h-auto  flex flex-col justify-center items-center ">
      <h1
        data-aos="fade-up"
        className="text-[64px] leading-[70px]  text-center mt-56 mb-28 font-marcellus text-textPrimary uppercase lg:flex hidden"
      >
        Find tHe Perfect Property <br /> for your lifestyle
      </h1>
      <h1
        data-aos="fade-up"
        className="text-[32px] leading-[1.5]  text-center mt-44 mb-20  font-marcellus text-textPrimary uppercase lg:hidden flex"
      >
        Find tHe Perfect <br /> Property for <br /> your lifestyle
      </h1>
      <div className="container mx-auto md:px-4">
        <CardListDevelopment properties={projectsResponse.projects} />
      </div>
      <Suspense>
        <CarouselOurPartner />
      </Suspense>
      <PropertyFinderSection />
    </div>
  );
}
