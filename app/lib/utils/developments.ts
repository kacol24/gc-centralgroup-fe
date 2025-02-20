import {
  development1,
  development2,
  development3,
  development4,
  development5,
  development6,
  development7,
  development8,
  development9,
} from '@/app/lib/utils/image';
import { StaticImageData } from 'next/image';

export interface DevelopmentModel {
  id: number;
  image: string | StaticImageData;
  location: string;
  title: string;
  slug: string;
  type: string;
  description: string;
}

export const developments: DevelopmentModel[] = [
  {
    id: 1,
    title: 'Serenity Central City',
    image: development1,
    slug: 'serenity-central-city',
    location: 'Sekupang',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 2,
    title: 'The Icon',
    image: development2,
    slug: 'the-icon',
    location: 'Batam Kota',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 3,
    title: 'Central Tiban',
    image: development3,
    slug: 'central-iban',
    location: 'Batu Aji',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 4,
    title: 'Central Raya Batu Aji',
    image: development4,
    slug: 'central-raya-batu-aji',
    location: 'Tiban',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 5,
    title: 'Central Batu Aji',
    image: development5,
    slug: 'central-batu-aji',
    location: 'Batam Kota',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 6,
    title: 'Central Laguna Hills',
    image: development6,
    slug: 'central-laguna-hills',
    location: 'Batam Kota',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 7,
    title: 'Central Raja Tiban',
    image: development7,
    slug: 'central-raja-tiban',
    location: 'Batu Aji',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 8,
    title: 'Central Hills',
    image: development8,
    slug: 'central-hills',
    location: 'Tiban',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
  {
    id: 9,
    title: 'Perumahan Barelang',
    image: development9,
    slug: 'perumahan-barelang',
    location: 'Batu Aji',
    type: 'residential',
    description:
      'Inspired by the natural beauty, Serenity Central City, an exclusive resort area surrounded by mountains, beaches, also forests, offers a harmonious, natural, and peaceful atmosphere where you can find happiness and build beautiful memories with loved ones.',
  },
];
