import ArticleCore from './components/core-article';
import ArticleHero from './components/hero-article';
import BlogsQuery from "@/graphql/BlogsQuery.graphql";
import {getClient} from "@/app/lib/urqlClient";

export default async function Article() {
    const client = await getClient();

    const {data: blogs} = await client.query(BlogsQuery, {
        "lang": "en",
        "limit": 6
    });

  return (
    <div className="bg-backgroundWhite">
      <section className="w-full lg:container lg:mx-auto  pb-8">
        <ArticleHero />
        <ArticleCore blogs={blogs?.blogs}/>
      </section>
    </div>
  );
}
