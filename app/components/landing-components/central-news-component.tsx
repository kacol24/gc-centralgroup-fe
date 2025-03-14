'use client';

import { Button } from '@/components/ui/button';
import {Link} from '@/i18n/navigation';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import CardArticle from '../card-article';

export default function CentralNewsComponent({blogs}) {
  const newsCards = blogs.datas;
  const limitedNews = newsCards.slice(0, 3);
  return (
    <section className="w-full mt-14 lg:mt-[100px] lg:container lg:mx-auto bg-backgroundWhite px-4 pb-0 pt-12 lg:pt-0">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1 className="text-[28px] lg:text-4xl font-marcellus uppercase text-textPrimary">Central News</h1>
      </div>

      <div className=" block border-t border-textPrimary border-opacity-30 my-8" />

      <div className="grid grid-cols-1 lg:hidden">
        {limitedNews.map((news, index) => (
          <CardArticle
            key={news.id}
            id={news.id}
            title={news.title}
            description={news.excerpt}
            author={news.author.name}
            category={news.category.title}
            date={news.publish_date}
            image={news.image}
            index={index}
            slug={news.slug}
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
          {newsCards.map((news) => (
            <CarouselItem key={news.id} className="basis-2/6 pl-4 md:pl-8">
              <CardArticle
                key={news.id}
                id={news.id}
                title={news.title}
                description={news.excerpt}
                author={news.author.name}
                category={news.category.title}
                date={news.publish_date}
                image={news.image}
                index={news.id}
                slug={news.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Button Next & Prev Desktop */}

        <div className="absolute hidden lg:flex right-12 -top-[90px] gap-4 z-20">
          <CarouselPrevious className="w-12 h-12 bg-white shadow-md border border-[#CFD5D5] rounded-none flex items-center justify-center transition">
            <HiArrowLeft className="text-textPrimary w-7 h-7" />
          </CarouselPrevious>

          <div className="w-4"></div>

          <CarouselNext className="w-12 h-12 bg-white shadow-md border border-[#CFD5D5] rounded-none flex items-center justify-center transition">
            <HiArrowRight className="text-textPrimary w-7 h-7" />
          </CarouselNext>
        </div>
      </Carousel>

      <div className="px-24 flex justify-center">
        <Button variant="filled" className=" my-8 uppercase rounded-none text-xs py-[24px] lg:mb-0 lg:mt-12">
          <Link href={'/article'}>All News & update</Link>
        </Button>
      </div>
    </section>
  );
}
