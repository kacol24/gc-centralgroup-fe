import Image from 'next/image';
import { imgDummyArticle } from '@/app/lib/utils/image';

export default function ArticleHero() {
  return (
    <section className="w-screen h-screen bg-primary pt-[137px] px-8 pb-8">
      <Image src={imgDummyArticle} alt="Hero Article" objectFit="cover" className="w-full h-96" />
    </section>
  );
}
