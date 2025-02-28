import PropertyCard from '@/app/components/card-property';
import Link from 'next/link';
import { developments } from '@/app/lib/utils/developments';

interface CardListDevelopmentProps {
  limit?: number;
}

export default function CardListDevelopment({ limit }: CardListDevelopmentProps) {
  const limitedDevelopments = limit ? developments.slice(0, limit) : developments;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 p-0">
      {limitedDevelopments.map((development, index) => (
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
    </section>
  );
}
