import Image from 'next/image';
import { imgDummyArticle } from '@/app/lib/utils/image';

export default function ArticleHero() {
  return (
    <section className="w-full container mx-auto bg-primary px-4 pb-8">
      <div>
        <Image src={imgDummyArticle} alt="Hero Article" className="w-auto  object-contain" />
      </div>
    </section>
  );
}
