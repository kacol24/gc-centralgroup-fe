'use client';

import { newsCards } from '@/app/lib/utils/article';
import NewsCard from '../card-article';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

export default function CentralNewsComponent() {
  const limitedNews = newsCards.slice(0, 3);
  return (
    <section className="w-full mt-14 lg:mt-[100px] lg:container lg:mx-auto bg-white px-4 pb-0 pt-12 lg:pt-0">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1 className="text-[28px] lg:text-4xl font-marcellus uppercase text-textPrimary">Central News</h1>
      </div>

      <div className=" block border-t border-textPrimary border-opacity-30 my-8" />

      <div className="grid grid-cols-1 lg:hidden">
        {limitedNews.map((news, index) => (
          <NewsCard
            key={index}
            id={news.id}
            title={news.title}
            description={news.description}
            author={news.author}
            category={news.category}
            date={news.date}
            image={news.image}
          />
        ))}
      </div>

      <Carousel
        opts={{
          align: 'center',
          loop: true,
          slidesToScroll: 3,
        }}
        className="relative"
      >
        {/* Wrapper carousel */}
        <CarouselContent className="hidden lg:flex -ml-4 md:-ml-8">
          {newsCards.map((news, index) => (
            <CarouselItem key={index} className="basis-2/6 pl-4 md:pl-8">
              <NewsCard
                key={index}
                id={news.id}
                title={news.title}
                description={news.description}
                author={news.author}
                category={news.category}
                date={news.date}
                image={news.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Button Next & Prev Desktop */}

        <div className="absolute hidden lg:flex right-12 -top-[90px]  z-20">
          <CarouselPrevious className=" w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
            <HiArrowLeft className="text-textPrimary w-7 h-7 " />
          </CarouselPrevious>

          <CarouselNext className="w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
            <HiArrowRight className="text-textPrimary w-7 h-7" />
          </CarouselNext>
        </div>

        {/* Button Previous */}
        {/* <CarouselPrevious className="absolute lg:hidden left-5 top-1/2 -translate-y-1/2  z-10 w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
          <HiArrowLeft className="text-textPrimary w-7 h-7 " />
        </CarouselPrevious> */}

        {/* Button Next */}
        {/* <CarouselNext className="absolute lg:hidden right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
          <HiArrowRight className="text-textPrimary w-7 h-7" />
        </CarouselNext> */}
      </Carousel>

      <div className="px-24 flex justify-center">
        <Button variant="filled" className=" my-8 uppercase rounded-none text-xs py-[24px] lg:mb-0 lg:mt-12">
          <Link href={'/article'}>All News & update</Link>
        </Button>
      </div>
    </section>
  );
}
