'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import dynamic from 'next/dynamic';
import { useMemo, useEffect, Suspense } from 'react';
import CardListDevelopment from './components/card-list-development';
import CarouselOurPartner from './components/carousel-our-partner';
import {useQuery} from "@urql/next";
import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";

export default function Development() {
  const PropertyFinder = useMemo(
    () =>
      dynamic(() => import('./components/property-finder'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

    const [{data: projectsResponse}] = useQuery({
        query: ProjectsQuery,
        variables: {
            lang: 'en',
            limit: 6
        }
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
        <CardListDevelopment properties={projectsResponse.projects}/>
      </div>
        <Suspense>
            <CarouselOurPartner/>
        </Suspense>
      <PropertyFinder />
    </div>
  );
}
