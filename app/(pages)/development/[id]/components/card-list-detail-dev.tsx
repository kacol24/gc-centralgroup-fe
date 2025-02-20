import PropertyCard from '@/app/components/card-property';
import { imgProperty1 } from '@/app/lib/utils/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
];

export default function CardListDetailDevelopment() {
  return (
    <section className="w-screen p-0 lg:mx-auto ">
      <div className="hidden w-auto lg:block border-t border-black border-opacity-30 mb-8 mt-20 mx-20" />

      <h1 className="text-[22px] lg:text-start lg:pl-20  tracking-wide text-center font-marcellus text-textPrimary mb-6 uppercase">
        Other developments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 p-0 px-0 lg:px-20 pb-0 lg:pb-20">
        {properties.map((property) => (
          <Link key={property.id} href={`/development/${property.slug}`}>
            <PropertyCard
              key={property.id}
              image={property.image}
              location={property.location}
              title={property.title}
            />
          </Link>
        ))}
      </div>

      <div className="px-24 block lg:hidden">
        <Button variant="filled" className="w-full my-8  rounded-none text-xs py-[16px]">
          ALL DEVELOPMENT
        </Button>
      </div>
    </section>
  );
}
