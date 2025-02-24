'use client';

import { ComboboxDemo } from '@/components/ui/combobox';
import { useState } from 'react';
import { RiBuildingFill } from 'react-icons/ri';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import NewsCard from './card-article';
import { newsCards } from '@/app/lib/utils/article';

const propertyTypes = [
  {
    value: 'apartment',
    label: 'Apartment',
  },
  {
    value: 'house',
    label: 'House',
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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsCards.length / itemsPerPage);

  // Hitung indeks item yang akan ditampilkan pada halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = newsCards.slice(startIndex, endIndex);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <section className="w-full lg:container lg:mx-auto bg-white px-4 pb-8">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1 className="text-[28px] font-marcellus uppercase text-textPrimary">News & Update</h1>
        <div className="w-full lg:w-auto">
          <ComboboxDemo
            dataPropertys={propertyTypes}
            placeholder="Property Types"
            icon={<RiBuildingFill className="text-white" />}
            customClassName={{
              button: 'bg-black text-white hover:bg-black hover:opacity-80 py-6',
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary shadow-lg border-[#F1F1F1] border-2 hover:bg-primary'
                    : 'bg-white text-textPrimary shadow-lg border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
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
                    ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary shadow-lg border-[#F1F1F1] border-2 hover:bg-primary'
                    : 'bg-white text-textPrimary shadow-lg border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
