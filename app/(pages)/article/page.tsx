import ArticleCore from './components/core-article';
import ArticleHero from './components/hero-article';

export default async function Article() {
  return (
    <div className="bg-backgroundWhite">
      <section className="w-full lg:container lg:mx-auto  pb-8">
        <ArticleHero />
        <ArticleCore />
      </section>
    </div>
  );
}
