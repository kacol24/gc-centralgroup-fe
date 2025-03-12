'use client';

import {useCallback, useEffect} from 'react';
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
import {usePathname, useRouter} from "@/i18n/navigation";
import {useSearchParams} from 'next/navigation';

// interface QueryVariables {
//   lang: string;
//   limit?: number;
//   page?: number;
//   category?: number;
// }

interface BlogCategory {
    id: number;
    title: string;
}

export default function ArticleCore() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [queryVariables, setQueryVariables] = useState({
    lang: 'en',
    limit: 6,
    page: 1
  });

  const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
      },
      [searchParams]
  )

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
  const pagination = blogsResponse.blogs?.pagination;
  const newsCards = blogsResponse.blogs?.datas;

  const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? 1);
  const totalPages = pagination.last_page;

  const [{data: blogCategoriesResponse}] = useQuery({
    query: BlogCategoriesQuery,
    variables: {
      lang: 'en'
    }
  });
  const articleDropdown = blogCategoriesResponse.blogcategories.map((category: BlogCategory) => {
    return {
      value: category.id,
      label: category.title
    };
  });

  const handleCategoryChange = useCallback((value: string) => {
    router.push(pathname + '?' + createQueryString('category_id', value));
    setCurrentPage(1);
    const newVariables = {...queryVariables, page: currentPage, categoryId: parseInt(value)};
    setQueryVariables(newVariables);
    reexecuteQuery({requestPolicy: 'network-only'});
  }, [reexecuteQuery, createQueryString, currentPage, pathname, queryVariables, router]);

  useEffect(() => {
    const newVariables = {...queryVariables, page: currentPage};
    setQueryVariables(newVariables);
    reexecuteQuery({requestPolicy: 'network-only'});
  }, [currentPage, queryVariables, reexecuteQuery]);

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
                onValueChange={handleCategoryChange}
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
          {newsCards.map((news) => (
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

              {Array.from({length: totalPages}, (_, i) => (
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
