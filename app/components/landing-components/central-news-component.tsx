'use client';

import { newsCards } from '@/app/lib/utils/article';
import NewsCard from '../card-article';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

export default function CentralNewsComponent() {
  const limitedNews = newsCards.slice(0, 3);
  return (
    <section className="w-full mt-14 lg:mt-[100px] lg:container lg:mx-auto bg-white px-4 pb-0 pt-12 lg:pt-0">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1 className="text-[28px] lg:text-4xl font-marcellus uppercase text-textPrimary">Central News</h1>
        <div className="w-full lg:w-auto lg:pt-0 pt-6">
          <div className="flex">
            <button className=" w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
              <HiArrowLeft className="text-textPrimary w-6 h-6 " />
            </button>

            <button className="w-12 h-12 bg-white shadow-md border border-textPrimary rounded-none flex items-center justify-center  transition">
              <HiArrowRight className="text-textPrimary w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className=" block border-t border-textPrimary border-opacity-30 my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {limitedNews.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            description={news.description}
            author={news.author}
            category={news.category}
            date={news.date}
            image={news.image}
          />
        ))}
      </div>

      <div className="px-24 flex justify-center">
        <Button variant="filled" className=" my-8 uppercase rounded-none text-xs py-[24px] lg:mb-0 lg:mt-12">
          <Link href={'/article'}>All News & update</Link>
        </Button>
      </div>
    </section>
  );
}
