import ArticleCore from './components/core-article';
import ArticleHero from './components/hero-article';

export default function Article() {
  return (
    <section className="w-full lg:container lg:mx-auto  pb-8">
      <ArticleHero />
      <ArticleCore />
    </section>
  );
}
