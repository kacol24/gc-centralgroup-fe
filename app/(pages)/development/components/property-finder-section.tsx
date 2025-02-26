'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function PropertyFinderSection() {
  const PropertyFinder = useMemo(
    () =>
      dynamic(() => import('./property-finder'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <PropertyFinder />
    </>
  );
}
