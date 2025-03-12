import PropertyCard from '@/app/components/card-property';
import {Link} from '@/i18n/navigation';

export default function CardListDevelopment({ properties, columns = 3 }) {
  const limitedDevelopments = properties.datas;

  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-0 sm:gap-6 p-0`}>
      {limitedDevelopments.map((development) => (
        <Link key={development.id} href={`/development/${development.slug}/${development.id}`}>
          <PropertyCard
            key={development.id}
            image={development.images[0]}
            location={development.location.title}
            title={development.title}
            index={development.id}
            type={development.property_type.title}
          />
        </Link>
      ))}
    </section>
  );
}
