import ArticleCore from './components/core-article';
import ArticleHero from './components/hero-article';
import AosProvider from "@/components/AosProvider";

export default async function Article() {
  return (
    <div className="bg-backgroundWhite">
      <section className="w-full lg:container lg:mx-auto pb-8">
        <AosProvider>
            <ArticleHero/>
        </AosProvider>
        <ArticleCore />
      </section>
    </div>
  );
}
