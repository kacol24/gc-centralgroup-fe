import CarouselAwardeComponent from '@/app/components/landing-components/carousel-awarde-component';
import { getClient } from '@/app/lib/urqlClient';
import BannersQuery from '@/graphql/BannersQuery.graphql';
import { getLocale } from 'next-intl/server';

async function getAwardsBanners(locale, client) {
  const { data: awardBanners } = await client.query(BannersQuery, {
    lang: locale,
    type: 'award_banner',
  });

  return awardBanners;
}

export default async function SectionAwards() {
  const client = await getClient();
  const locale = await getLocale();

  const awardsBannersData = await getAwardsBanners(locale, client);

  return (
    <section className="bg-backgroundWhite">
      <div className="w-full pb-8 pt-0 lg:pb-20 lg:pt-[16px]">
        <CarouselAwardeComponent slides={awardsBannersData.banners} />
      </div>
    </section>
  );
}
