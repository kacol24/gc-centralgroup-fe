import PropertyCard from '@/app/components/card-property';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { developments } from '@/app/lib/utils/developments';

export default function CardListDetailDevelopment() {
  return (
    <section className="container mx-auto px-4 ">
      <div className="hidden w-auto lg:block border-t border-textPrimary border-opacity-10 mb-8 mt-20" />

      <h1 className="text-[22px] lg:text-start tracking-wide text-center font-marcellus text-textPrimary mb-6 uppercase">
        Other developments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 p-0  pb-0 lg:pb-20">
        {developments
          .filter((i, index) => index < 3)
          .map((development, index) => (
            <Link key={development.id} href={`/development/${development.slug}`}>
              <PropertyCard
                key={development.id}
                image={development.image}
                location={development.location}
                title={development.title}
                index={index}
              />
            </Link>
          ))}
      </div>

      <div className="px-24 block lg:hidden">
        <Link href={'/development'}>
          <Button variant="filled" className="w-full my-8  rounded-none text-xs py-[24px]">
            ALL DEVELOPMENT
          </Button>
        </Link>
      </div>
    </section>
  );
}
