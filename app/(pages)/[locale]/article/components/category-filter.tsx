'use client';

import { IoIosArrowDown } from 'react-icons/io';
import { ComboboxDemo } from '@/components/ui/combobox';
import { useQuery } from '@urql/next';
import BlogCategoriesQuery from '@/graphql/BlogCategoriesQuery.graphql';
import { useQueryState } from 'nuqs';
// import {parseAsInteger} from "nuqs"
import { useLocale } from 'next-intl';

interface BlogCategory {
  id: number;
  title: string;
}

export default function CategoryFilter() {
  const locale = useLocale();
  const [categoryParam, setCategoryParam] = useQueryState('category', {
    shallow: false,
  });
  // const [pageParam, setPageParam] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
  //     shallow: false,
  //     scroll: true
  // }));

  const [{ data: blogCategoriesResponse }] = useQuery({
    query: BlogCategoriesQuery,
    variables: {
      lang: locale,
    },
  });
  const articleDropdown = blogCategoriesResponse.blogcategories.map((category: BlogCategory) => {
    return {
      value: category.id,
      label: category.title,
    };
  });

  const handleChangeCategory = (categoryId) => {
    // setPageParam(1);
    setCategoryParam(categoryId || null);
  };

  return (
    <ComboboxDemo
      dataPropertys={articleDropdown}
      onValueChange={(value) => handleChangeCategory(value)}
      defaultValue={categoryParam?.toString()}
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
  );
}
