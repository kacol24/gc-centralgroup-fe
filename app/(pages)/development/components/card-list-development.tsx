import PropertyCard from '@/app/components/card-property';
import { imgProperty1 } from '@/app/lib/utils/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Property {
  id: number;
  image: string | StaticImageData;
  location: string;
  title: string;
  slug: string;
}

const properties: Property[] = [
  { id: 1, image: imgProperty1, location: 'Semarang', title: 'Serenity Central City', slug: 'serenity-central-city' },
  { id: 2, image: imgProperty1, location: 'Jakarta', title: 'Metropolitan Heights', slug: 'metropolitan-heights' },
  {
    id: 3,
    image: imgProperty1,
    location: 'Surabaya',
    title: 'Grand Emerald Residence',
    slug: 'grand-emerald-residence',
  },
  { id: 4, image: imgProperty1, location: 'Bali', title: 'Tropical Paradise Villas', slug: 'tropical-paradise-villas' },
  { id: 5, image: imgProperty1, location: 'Bandung', title: 'Mountain View Estate', slug: 'mountain-view-estate' },
  { id: 6, image: imgProperty1, location: 'Medan', title: 'North Gate Residences', slug: 'north-gate-residences' },
];

export default function CardListDevelopment() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 p-0">
      {properties.map((property) => (
        <Link key={property.id} href={`/development/${property.slug}`}>
          <PropertyCard key={property.id} image={property.image} location={property.location} title={property.title} />
        </Link>
      ))}
    </section>
  );
}
