'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import content from '@/app/lib/utils/content.json';
import { useLocale } from 'next-intl';

interface CentralCommunityActivityProps {
  activityImages: ActivityImage[];
  initialVisible?: number;
  loadMoreCount?: number;
}

interface ActivityImage {
  src: StaticImageData;
  alt: string;
}

export default function CentralCommunityActivity({
  activityImages,
  initialVisible = 12,
  loadMoreCount = 4,
}: CentralCommunityActivityProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMoreCount);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  const locale = useLocale();

  return (
    <section className="bg-backgroundWhite">
      <div className="container mx-auto px-4 pt-[3.5rem] pb-10  md:pt-20 md:pb-12 lg:mx-auto lg:pt-28 lg:pb-20">
        <h2
          className="mb-8 text-xl text-center text-textPrimary md:mb-12 md:text-2xl lg:mb-20 lg:text-4xl font-marcellus"
          data-aos="zoom-in"
        >
          {content?.[locale].our_activities}
        </h2>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
          {activityImages.slice(0, visibleCount).map((activity, index) => (
            <Image
              key={index}
              src={activity?.src}
              alt={activity.alt}
              className="break-inside-avoid"
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              width={296}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
          ))}
          {visibleCount < activityImages.length && (
            <div className="z-10 absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-backgroundWhite to-transparent" />
          )}
        </div>
        {visibleCount < activityImages.length && (
          <button onClick={loadMore} className="block mt-8 mx-auto px-12 py-3 text-white bg-primary md:mt-12 lg:mt-20">
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
