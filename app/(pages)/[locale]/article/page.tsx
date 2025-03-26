import ArticleCore from './components/core-article';
import ArticleHero from './components/hero-article';
import AosProvider from "@/components/AosProvider";
import {createLoader, parseAsInteger, SearchParams} from "nuqs/server";

const filterSearchParams = {
    page: parseAsInteger.withDefault(0),
    category: parseAsInteger
}
const loadSearchParams = createLoader(filterSearchParams);

type PageProps = {
    searchParams: Promise<SearchParams>
}

export default async function Article({searchParams}: PageProps) {
  const {page, category} = await loadSearchParams(searchParams);

  return (
    <div className="bg-backgroundWhite">
      <section className="w-full lg:container lg:mx-auto pb-8">
        <AosProvider>
            <ArticleHero/>
            <ArticleCore page={page} category={category}/>
        </AosProvider>
      </section>
    </div>
  );
}
