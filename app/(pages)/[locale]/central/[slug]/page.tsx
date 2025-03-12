'use client';

import { use, useState, useEffect } from 'react';

import CentralCommunityBanner from '@/app/(pages)/central/[slug]/components/central-community-banner';
import CentralCommunityGoal from '@/app/(pages)/central/[slug]/components/central-community-goal';
import CentralCommunityActivity from '@/app/(pages)/central/[slug]/components/central-community-activity';
import { central, CentralModel } from '@/app/lib/utils/cental';

export default function CentralDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [detailCentral, setDetailCentral] = useState<CentralModel | undefined>();

  const getData = () => {
    const data: CentralModel | undefined = central.find((item) => item.slug === slug);

    setDetailCentral(data);
  };

  useEffect(() => {
    getData();
  });

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

      <CentralCommunityActivity activityImages={detailCentral?.activityImages || []} />
    </>
  );
}
