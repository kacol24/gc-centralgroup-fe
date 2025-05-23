'use client';

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

export default function CarouselDetailDevelopment({ images }) {
  return (
    <section className="relative w-full mb-16 mt-8">
      <div className="w-full  mx-auto relative">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="relative"
        >
          {/* Wrapper carousel */}
          <CarouselContent className="flex -ml-4 md:-ml-8">
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-3/4 md:basis-2/3 lg:basis-3/4 pl-4 md:pl-8">
                <div className="relative w-full h-[184px] lg:h-[600px] overflow-hidden rounded-none shadow-md">
                  <Image
                    src={image}
                    width={1062}
                    height={600}
                    className="object-cover"
                    alt={'project image' + (index + 1)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Button Next & Prev Desktop */}

          <div className="absolute hidden lg:flex lg:top-full left-5 top-1/2 -translate-y-1/2 lg:left-[80%] z-10">
            <CarouselPrevious className=" w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
              <HiArrowLeft className="text-textPrimary w-7 h-7 " />
            </CarouselPrevious>

            <CarouselNext className="w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
              <HiArrowRight className="text-textPrimary w-7 h-7" />
            </CarouselNext>
          </div>

          {/* Button Previous */}
          <CarouselPrevious className="absolute lg:hidden left-5 top-1/2 -translate-y-1/2  z-10 w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
            <HiArrowLeft className="text-textPrimary w-7 h-7 " />
          </CarouselPrevious>

          {/* Button Next */}
          <CarouselNext className="absolute lg:hidden right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
            <HiArrowRight className="text-textPrimary w-7 h-7" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}
