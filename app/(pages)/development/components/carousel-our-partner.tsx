'use client';

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import {
  logoPartner1,
  logoPartner2,
  logoPartner3,
  logoPartner4,
  logoPartner5,
  logoPartner6,
  logoPartner7,
  logoPartner8,
  logoPartner9,
} from '@/app/lib/utils/image';
import Autoplay from 'embla-carousel-autoplay';

const logos = [
  logoPartner1,
  logoPartner2,
  logoPartner3,
  logoPartner4,
  logoPartner5,
  logoPartner6,
  logoPartner7,
  logoPartner8,
  logoPartner9,
];

export default function CarouselOurPartner() {
  return (
    <section className="w-full">
      {/* Carousel Desktop */}
      <div className="w-full px-4 lg:py-20 xl:py-20 hidden lg:block container mx-auto">
        <h4 className="text-primary text-xs font-semibold lg:text-sm text-start mb-6 ">OUR PATNERS</h4>

        <div className="container mx-auto">
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
            {/* Wrapper konten carousel */}
            <CarouselContent className="flex gap-8">
              {logos.map((logo, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                  <div className="flex items-center justify-center p-1">
                    <Image src={logo} alt={`Partner ${index + 1}`} width={120} height={60} className="object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Carousel Mobile */}
      <section className="bg-backgroundWhite w-full block lg:hidden">
        <div className="container mx-auto px-4 py-8 lg:m-auto">
          <p className="mb-5 text-xs text-primary font-semibold">OUR PATNERS</p>
          <div className="grid grid-cols-3 gap-8 md:flex md:justify-between md:gap-0">
            {logos.map((logo, key) => (
              <Image key={key} src={logo} alt={`logo` + key + 1} width={0} className="w-[84px] h-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
