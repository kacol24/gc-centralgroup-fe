'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { RiWhatsappFill } from 'react-icons/ri';
import { usePathname } from '@/i18n/navigation';

import { useLocale } from 'next-intl';
import { useQuery } from '@urql/next';
import BannerQuery from '@/graphql/BannersQuery.graphql';

// interface Banner {
//   cta: string
//   desktop: string
//   id: number
//   mobile: string
//   title: string
//   url: string
// }

export default function ContactUs() {
  const pathname = usePathname();
  const allowPath = ['/contact', '/article'];
  const locale = useLocale();
  const [{ data: bannerResponse }] = useQuery({
    query: BannerQuery,
    variables: {
      lang: locale,
      type: 'footer_banner',
      limit: 1,
    },
  });

  const banner = bannerResponse?.banners[0] || null;

  const contactUsHidden = () => {
    if (allowPath.includes(pathname)) {
      return 'hidden';
    }
    return 'true';
  };

  return (
    <>
      {banner && (
        <div className={`relative w-full h-[380px] ${contactUsHidden()}`}>
          <Image
            src={banner.mobile}
            width={780}
            height={780}
            alt="Hero Detail Development"
            unoptimized
            className="w-full h-full object-cover md:hidden"
          />
          <Image
            src={banner.desktop}
            width={2880}
            height={764}
            alt="Hero Detail Development"
            unoptimized
            className="w-full h-full object-cover hidden md:block"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-[36px] font-marcellus mb-6 uppercase tracking-wide">Have a question?</h1>
            <p className="text-sm uppercase tracking-widest mb-10">Feel free to contact us and let our team help you</p>
            <Button
              variant="filled"
              className="rounded-sm text-textPrimary bg-white text-xs py-[24px] px-[15px] lg:px-6"
            >
              <span>
                <RiWhatsappFill className="text-textPrimary text-xl" />
              </span>
              <a href={banner.url} target="_blank">
                {banner.cta}
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
