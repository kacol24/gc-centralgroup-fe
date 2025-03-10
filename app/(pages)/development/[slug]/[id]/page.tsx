'use client';

import { useEffect, useState, use } from 'react';
// import { useParams } from 'next/navigation';
import HeroDetailDevelopment from './components/hero-detail-dev';
// import dynamic from 'next/dynamic';
import CarouselDetailDevelopment from './components/slider-detail-dev';
import CardListDetailDevelopment from './components/card-list-detail-dev';
import { developments, DevelopmentModel } from '@/app/lib/utils/developments';
import CoreDetailDevelopment from './components/core-detail-dev';
import {useQuery} from "@urql/next";
import ProjectDetailQuery from '@/graphql/ProjectDetailQuery.graphql';

export default function DevelopmentDetailPage({ params }) {
  const { id } = use(params);

    const [{data: projectData}] = useQuery({
        query: ProjectDetailQuery,
        variables: {
            lang: 'en',
            id
        }
    });

  const nextSectionId = 'next-section';

  return (
    <section className="w-full h-auto bg-backgroundWhite">
      <HeroDetailDevelopment heroImage={projectData.project.header_image} logo={projectData.project.logo}/>
      <CoreDetailDevelopment nextSectionId={nextSectionId} detail={projectData.project} />
      <CarouselDetailDevelopment id="last-section" images={projectData.project.images} />
      <CardListDetailDevelopment />
    </section>
  );
}
