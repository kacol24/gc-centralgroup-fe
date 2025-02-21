import PropertyCard from '@/app/components/card-property';

import Link from 'next/link';
import { developments } from '@/app/lib/utils/developments';

export default function CardListDevelopment() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 p-0">
      {developments.map((development) => (
        <Link key={development.id} href={`/development/${development.slug}`}>
          <PropertyCard
            key={development.id}
            image={development.image}
            location={development.location}
            title={development.title}
          />
        </Link>
      ))}
    </section>
  );
}
