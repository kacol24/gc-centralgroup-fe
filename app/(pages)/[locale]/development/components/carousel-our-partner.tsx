import Image from 'next/image';
import BannersQuery from '@/graphql/BannersQuery.graphql';
import PartnerCarousel from "@/app/(pages)/[locale]/development/components/partner-carousel";
import {getLocale} from "next-intl/server";
import {getClient} from "@/app/lib/urqlClient";

export default async function CarouselOurPartner() {
    const locale = await getLocale();
    const client = await getClient();

    const {data: partnersResponse} = await client.query(BannersQuery, {
        lang: locale,
        type: 'partner_banner'
    });
    const logos = partnersResponse.banners;

  return (
    <section className="w-full">
      {/* Carousel Desktop */}
      <div className="w-full px-4 lg:py-20 xl:py-20 hidden lg:block container mx-auto">
        <h4 className="text-primary text-xs font-semibold lg:text-sm text-start mb-6 uppercase">Our Partners</h4>

        <div className="container mx-auto">
          <PartnerCarousel slides={logos} />
        </div>
      </div>

      {/* Carousel Mobile */}
      <section className="bg-backgroundWhite w-full block lg:hidden">
        <div className="container mx-auto px-4 py-8 lg:m-auto">
          <p className="mb-5 text-xs text-primary font-semibold">OUR PATNERS</p>
          <div className="grid grid-cols-3 gap-8 md:flex md:justify-between md:gap-0">
            {logos.map((banner) => (
              <Image key={banner.id} src={banner.mobile} alt={banner.title} width={0} height={0} className="w-[84px] h-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
