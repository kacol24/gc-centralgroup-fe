import CardArticle from '@/app/components/card-article';
import ArticlePagination from '@/app/(pages)/[locale]/article/components/article-pagination';
import CategoryFilter from '@/app/(pages)/[locale]/article/components/category-filter';
import { getClient } from '@/app/lib/urqlClient';
import BlogsQuery from '@/graphql/BlogsQuery.graphql';
import { getLocale } from 'next-intl/server';

export default async function ArticleCore({ page, category }) {
  const locale = await getLocale();
  const client = await getClient();
  const { data: blogResponse } = await client.query(BlogsQuery, {
    lang: locale,
    limit: 6,
    page,
    categoryId: category,
  });

  const newsCards = blogResponse.blogs.datas;
  const totalPages = blogResponse.blogs.pagination.last_page;

  return (
    <section className="w-full lg:container lg:mx-auto px-4 pb-8 pt-12 lg:pt-0">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
        <h1
          data-aos="zoom-in-right"
          data-aos-duration="1000"
          className="text-[28px] font-marcellus uppercase text-textPrimary"
        >
          News & Update
        </h1>
        <div data-aos="zoom-in-left" data-aos-duration="1000" className="w-full lg:w-auto lg:pt-0 pt-6">
          <CategoryFilter />
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
            date={news.formatted_publish_date}
            image={news.image}
            index={index}
            slug={news.slug}
          />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-6 flex justify-center">
          <ArticlePagination totalPages={totalPages} />
        </div>
      ) : (
        ''
      )}
    </section>
  );
}
