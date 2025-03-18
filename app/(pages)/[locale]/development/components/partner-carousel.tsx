'use client';

import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";

export default function PartnerCarousel({ slides }) {
    return (
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
                {slides.map((banner) => (
                    <CarouselItem key={banner.id} className="md:basis-1/2 lg:basis-[12%]">
                        <div className="flex items-center justify-center p-1">
                            <Image src={banner.desktop} alt={banner.title} width={120} height={60}
                                   className="object-contain"/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
