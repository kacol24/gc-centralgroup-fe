'use client';

import Image from 'next/image';
import { awardImageAsArray } from '@/app/lib/utils/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type award = {
    id: number,
    title: string,
    url: string
    cta: string,
    desktop: string,
    mobile: string,
};

export default function CarouselAwardeComponent({slides}) {
  return (
    <section className="bg-backgroundWhite">
      <div className="w-full pb-6 pt-0 lg:pb-20 lg:pt-[16px]">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-4">
            {slides?.map((award, id) => (
              <CarouselItem key={award.id} className="basis-1/2 lg:basis-1/6">
                <div className="flex flex-col items-center justify-center p-1 w-[186px] min-w-[186px] grow relative">
                  <Image
                    src={award.desktop}
                    alt={award.title}
                    width={186}
                    height={0}
                    className="w-full h-auto object-contain aspect-square"
                  />
                  <p className="mt-2 text-[9px] text-center text-textPrimary font-bold md:text-xs uppercase">
                    {award.title}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
