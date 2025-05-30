'use client';

import PropertyFinder from '@/app/(pages)/[locale]/development/components/property-finder';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function PropertyFinderSection() {
  const PropertyMap = useMemo(
    () =>
      dynamic(() => import('./property-map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <section className="w-full h-auto lg:flex">
      <div className="w-full h-[295px] lg:h-auto lg:flex-grow relative">
        <PropertyMap />
      </div>
      <PropertyFinder compact/>
    </section>
  );
}
