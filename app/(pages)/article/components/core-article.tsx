'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ComboboxDemo } from '@/components/ui/combobox';
import CardArticle from '@/app/components/card-article';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { newsCards } from '@/app/lib/utils/article';

const propertyTypes = [
  {
    value: 'economy',
    label: 'Ecomony',
  },
  {
    value: 'politic',
    label: 'Political',
  },
  {
    value: 'villa',
    label: 'Villa',
  },
  {
    value: 'office',
    label: 'Office',
  },
];

const itemsPerPage = 6;

export default function ArticleCore() {
  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsCards.length / itemsPerPage);

  // Hitung indeks item yang akan ditampilkan pada halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = newsCards.slice(startIndex, endIndex);

  return (
    <section className="w-full lg:container lg:mx-auto px-4 pb-8 pt-12 lg:pt-0">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1
          data-aos="zoom-in-right"
          data-aos-duration="1000"
          className="text-[28px] font-marcellus uppercase text-textPrimary"
        >
          News & Update
        </h1>
        <div data-aos="zoom-in-left" data-aos-duration="1000" className="w-full lg:w-auto lg:pt-0 pt-6">
          <ComboboxDemo
            dataPropertys={propertyTypes}
            placeholder="Semua Topik"
            icon={<IoIosArrowDown className="text-textPrimary ml-24" />}
            customClassName={{
              button:
                'bg-white border border-[#E1E1E1] text-textPrimary hover:bg-white hover:opacity-80 hover:!text-textPrimary py-6',
              popoverContent: 'bg-gray-800 text-white',
              input: 'border-gray-400',
              item: 'text-gray-700',
              itemActive: 'bg-blue-300 text-black',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {currentNews.map((news, index) => (
          <CardArticle
            key={index}
            id={news.id}
            title={news.title}
            description={news.description}
            author={news.author}
            category={news.category}
            date={news.date}
            image={news.image}
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary'
                    : 'bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className="h-11 w-11 rounded-full border-[#F1F1F1] border-2 hover:bg-primary hover:text-white"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary'
                    : 'bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
