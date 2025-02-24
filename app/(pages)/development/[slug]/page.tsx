'use client';

import { useEffect, useMemo, useState, use } from 'react';
// import { useParams } from 'next/navigation';
import HeroDetailDevelopment from './components/hero-detail-dev';
import dynamic from 'next/dynamic';
import CarouselDetailDevelopment from './components/slider-detail-dev';
import CardListDetailDevelopment from './components/card-list-detail-dev';
import { developments, DevelopmentModel } from '@/app/lib/utils/developments';

export default function DevelopmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [detailDevelopment, setDetailDevelopment] = useState<DevelopmentModel | undefined>();

  const CoreDetailDevelopment = useMemo(
    () =>
      dynamic(() => import('./components/core-detail-dev'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  const getData = () => {
    const data: DevelopmentModel | undefined = developments.find((item) => item.slug === slug);

    setDetailDevelopment(data);
  };

  useEffect(() => {
    getData();
  });

  const nextSectionId = 'next-section';

  return (
    <section className="w-full h-auto bg-backgroundWhite">
      <HeroDetailDevelopment id={nextSectionId} />
      <CoreDetailDevelopment nextSectionId={nextSectionId} detail={detailDevelopment} />
      <CarouselDetailDevelopment id="last-section" />
      <CardListDetailDevelopment />
    </section>
  );
}
