'use client';

import { use, useState, useEffect } from 'react';

import CentralCommunityBanner from '@/app/(pages)/[locale]/central/[slug]/components/central-community-banner';
import CentralCommunityGoal from '@/app/(pages)/[locale]/central/[slug]/components/central-community-goal';
import CentralCommunityActivity from '@/app/(pages)/[locale]/central/[slug]/components/central-community-activity';
import { central, CentralModel } from '@/app/lib/utils/cental';

import { useLocale } from 'next-intl';
import { useQuery } from '@urql/next';
import BannerQuery from '@/graphql/BannersQuery.graphql';

export default function CentralDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [detailCentral, setDetailCentral] = useState<CentralModel | undefined>();
  const locale = useLocale();

  const type = slug === 'property-academy' ? 'activity_academy_banner' : `activity_${slug}_banner`;

  const [{ data: activityBannersResponse }] = useQuery({
    query: BannerQuery,
    variables: {
      lang: locale,
      type: type,
    },
  });

  const activityBanners =
    activityBannersResponse?.banners?.map((banner) => ({
      src: banner.desktop,
      alt: banner.title,
    })) ?? [];

  useEffect(() => {
    const data: CentralModel | undefined = central(locale).find((item) => item.slug === slug);
    setDetailCentral(data);
  }, [locale, slug]);

  return (
    <>
      <CentralCommunityBanner
        bannerColor={detailCentral?.bannerColor}
        bannerImageTop={detailCentral?.bannerImageTop}
        bannerImageBottom={detailCentral?.bannerImageBottom}
        bannerTitle={detailCentral?.bannerTitle}
        bannerDescription={detailCentral?.bannerDescription}
        pillarTitle={detailCentral?.pillarTitle}
        pillarItems={detailCentral?.pillarItems}
        pillarsIconBackground={detailCentral?.pillarsIconBackground}
      />

      <CentralCommunityGoal goals={detailCentral?.goals} />

      {activityBanners.length > 0 && (
        <CentralCommunityActivity
          // activityImages={detailCentral?.activityImages || []}
          activityImages={activityBanners || []}
        />
      )}
    </>
  );
}
