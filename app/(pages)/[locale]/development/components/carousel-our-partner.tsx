'use client';

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import {useQuery} from "@urql/next";
import BannersQuery from '@/graphql/BannersQuery.graphql';

export default function CarouselOurPartner() {
    const [{data: partnersResponse}] = useQuery({
        query: BannersQuery,
        variables: {
            lang: 'en',
            type: 'partner_banner'
        }
    });

    const logos = partnersResponse.banners;

  return (
    <section className="w-full">
      {/* Carousel Desktop */}
      <div className="w-full px-4 lg:py-20 xl:py-20 hidden lg:block container mx-auto">
        <h4 className="text-primary text-xs font-semibold lg:text-sm text-start mb-6 uppercase">Our Partners</h4>

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
              {logos.map((banner) => (
                <CarouselItem key={banner.id} className="md:basis-1/2 lg:basis-[12%]">
                  <div className="flex items-center justify-center p-1">
                    <Image src={banner.desktop} alt={banner.title} width={120} height={60} className="object-contain" />
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
            {logos.map((banner) => (
              <Image key={banner.id} src={banner.mobile} alt={banner.title} width={0} height={0} className="w-[84px] h-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
