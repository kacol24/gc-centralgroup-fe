'use client';

import { useMemo } from 'react';
// import { useParams } from 'next/navigation';
import HeroDetailDevelopment from './components/hero-detail-dev';
import dynamic from 'next/dynamic';
import CarouselDetailDevelopment from './components/slider-detail-dev';
import CardListDetailDevelopment from './components/card-list-detail-dev';

export default function DevelopmentDetailPage() {
  // const params = useParams();
  // const { id } = params;
  const CoreDetailDevelopment = useMemo(
    () =>
      dynamic(() => import('./components/core-detail-dev'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <section className="w-screen h-auto bg-backgroundWhite">
      <HeroDetailDevelopment />
      <CoreDetailDevelopment />
      <CarouselDetailDevelopment />
      <CardListDetailDevelopment />
    </section>
  );
}
