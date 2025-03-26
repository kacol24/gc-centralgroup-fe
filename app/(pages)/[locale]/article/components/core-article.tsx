'use client';

import {useEffect} from 'react';
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
import {useQuery} from "@urql/next";
import BlogsQuery from '@/graphql/BlogsQuery.graphql';
import BlogCategoriesQuery from '@/graphql/BlogCategoriesQuery.graphql';
import {useLocale} from "next-intl";
import {parseAsInteger, useQueryState} from "nuqs";

interface BlogCategory {
    id: number;
    title: string;
}

export default function ArticleCore() {
  const locale = useLocale();
  const [pageParam, setPageParam] = useQueryState('page', parseAsInteger.withDefault(1));
  const [categoryParam, setCategoryParam] = useQueryState('category');

  const [queryVariables, setQueryVariables] = useState({
      lang: locale,
      limit: 6,
      page: pageParam,
      categoryId: categoryParam
  });

  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  const [{data: blogsResponse}, reexecuteQuery] = useQuery({
    query: BlogsQuery,
    variables: queryVariables
  });

  const [{data: blogCategoriesResponse}] = useQuery({
    query: BlogCategoriesQuery,
    variables: {
      lang: locale
    }
  });
  const articleDropdown = blogCategoriesResponse.blogcategories.map((category: BlogCategory) => {
    return {
      value: category.id,
      label: category.title
    };
  });

  const handleChangePage = (page) => {
      setPageParam(page);
  }

    const handleChangeCategory = (categoryId) => {
        setPageParam(1);
        setCategoryParam(categoryId || null);
    }

    useEffect(() => {
        const newVariables = {
            ...queryVariables,
            page: pageParam,
            categoryId: parseInt(categoryParam) || null
        };
        setQueryVariables(newVariables);
        reexecuteQuery({requestPolicy: 'network-only'});
    }, [pageParam, categoryParam, queryVariables, reexecuteQuery]);

    if (!blogsResponse) {
        return (
            <section className="w-full lg:container lg:mx-auto px-4 pb-8 pt-12 lg:pt-0">
                {/* Header */}
                <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
                    <div
                        className="w-1/2 h-8 bg-gray-300 animate-pulse mb-4 lg:mb-0"
                    ></div>
                    <div className="w-full lg:w-1/4 h-12 bg-gray-300 animate-pulse mt-6 lg:mt-0"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                    {Array.from({length: 3}).map((_, index) => (
                        <div key={index} className="w-full h-64 bg-gray-300 animate-pulse"></div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-300 animate-pulse"></div>
                        {Array.from({length: 5}).map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gray-300 animate-pulse"></div>
                        ))}
                        <div className="w-8 h-8 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
            </section>
        );
    }

    const pagination = blogsResponse.blogs?.pagination;
    const newsCards = blogsResponse.blogs?.datas;
    const totalPages = pagination.last_page;

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
                dataPropertys={articleDropdown}
                onValueChange={(value) => handleChangeCategory(value)}
                defaultValue={categoryParam?.toString()}
                placeholder="Semua Topik"
                icon={<IoIosArrowDown className="text-textPrimary ml-24"/>}
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
          {newsCards.map((news, index) => (
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

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                    onClick={() => handleChangePage((prev) => Math.max(prev - 1, 1))}
                    className={
                      pageParam === 1
                          ? 'opacity-50 cursor-not-allowed bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary'
                          : 'bg-white text-textPrimary border-[#F1F1F1] border-2 hover:bg-primary hover:text-white'
                    }
                />
              </PaginationItem>

              {Array.from({length: totalPages}, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                        isActive={pageParam === i + 1}
                        onClick={() => handleChangePage(i + 1)}
                        className="h-11 w-11 rounded-full border-[#F1F1F1] border-2 hover:bg-primary hover:text-white"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                    onClick={() => handleChangePage((prev) => Math.min(prev + 1, totalPages))}
                    className={
                      pageParam === totalPages
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
