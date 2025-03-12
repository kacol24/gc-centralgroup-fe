'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import {imgPropertyFinderMap} from "@/app/lib/utils/image";
import Image from 'next/image';

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
      <section className="w-full h-auto lg:h-[740px] lg:flex">
          {/* Property Maps */}
          <div className="w-full h-[295px] lg:h-full lg:flex-grow relative">
              <Image src={imgPropertyFinderMap} alt="maps" fill/>
          </div>

          {/* Property Form */}
          <PropertyFinder />
      </section>
  );
}
