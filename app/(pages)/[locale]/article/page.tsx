import ArticleCore from './components/core-article';
import ArticleHero from './components/hero-article';

import {getClient} from "@/app/lib/urqlClient";
import BlogsQuery from "@/graphql/BlogsQuery.graphql";
import {useLocale} from "next-intl";

export default async function Article() {
    const client = await getClient();
    const locale = useLocale();

    const {data: featuredBlog} = await client.query(BlogsQuery, {
        "lang": locale,
        "limit": 1,
        "isFeatured": true
    });

  return (
    <div className="bg-backgroundWhite">
      <section className="w-full lg:container lg:mx-auto  pb-8">
          {
              featuredBlog.blogs.datas.length ?
                  <ArticleHero blog={featuredBlog.blogs.datas[0]}/> :
                  ''
          }
        <ArticleCore />
      </section>
    </div>
  );
}
