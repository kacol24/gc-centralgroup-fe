'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

import { useLocale } from 'next-intl';
import { useQuery } from '@urql/next';
import BannerQuery from '@/graphql/BannersQuery.graphql';

export default function CommunityEcosystemComponent() {
  const locale = useLocale();
  const [{ data: bannerResponse }] = useQuery({
    query: BannerQuery,
    variables: {
      lang: locale,
      type: 'before_footer_banner',
    },
  });

  const banner = bannerResponse?.banners[0] || null;

  return (
    <>
      {!banner && <div className="mt-10"></div>}
      <div className={`mt-[50px] lg:mt-[100px] relative w-full h-[580px] ${!banner ? 'hidden' : ''}`}>
        {banner && (
          <Image
            src={banner.desktop}
            alt="Hero Detail Development"
            unoptimized
            className="w-full h-full object-cover hidden md:block"
            width={0}
            height={0}
          />
        )}

        {banner && (
          <Image
            src={banner.mobile}
            alt="Hero Detail Development"
            unoptimized
            className="w-full h-full object-cover md:hidden"
            width={0}
            height={0}
          />
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-[36px] font-marcellus mb-10 uppercase tracking-wide">Community Ecosystem</h1>
          <Button variant="filled" className="rounded-sm  text-xs py-[24px] px-[15px] lg:px-6">
            <Link href={'central/berbagi'}>LEARN MORE</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
