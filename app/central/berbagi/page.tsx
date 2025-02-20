'use client';

import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import {
  backgroundTopBannerPageCentralBerbagi,
  backgroundBottomBannerPageCentralBerbagi,
  centralAcitivityAsArray,
} from '../../lib/utils/image';
import { iconHome, iconBook, iconFish, iconPlus } from '../../lib/utils/svg';
import CentralCommunityBanner from '../../components/central-community-components/central-community-banner';
import CentralCommunityGoal from '../../components/central-community-components/central-community-goal';
import CentralCommunityActivity from '../../components/central-community-components/central-community-activity';

export default function CentralBerbagi() {
  const centralBerbagiPillars = [
    {
      title: 'RUMAH LAYAK',
      description:
        'Turpis eu accumsan platea malesuada aliquet sed egestas posuere vestibulum. Consectetur risus nascetur at id nibh ullamcorper. Euismod semper diam lacinia ut placerat massa.',
      icon: iconHome,
    },
    {
      title: 'PENDIDIKAN',
      description:
        'Aliquam malesuada enim ut risus vulputate pretium morbi molestie. Sit non morbi libero nibh morbi in aliquet. Auctor quis nisl pretium leo mauris aliquet enim quis.',
      icon: iconBook,
    },
    {
      title: 'BAKTI SOSIAL',
      description:
        'Cursus at pellentesque viverra convallis. Tincidunt turpis tincidunt purus luctus commodo pellentesque. Sit pellentesque sit molestie ultrices lefensa.',
      icon: iconFish,
    },
    {
      title: 'KESEHATAN',
      description:
        'Pulvinar a molestie lorem amet faucibus pellentesque. Sed amet velit nulla vitae pellentesque ornare urna lacinia libero. Elit feugiat ut lorem at accumsan integer vulputate augue.',
      icon: iconPlus,
    },
  ];

  const centralBerbagiGoals = [
    {
      title: 'VISION',
      description:
        'Aliquam malesuada enim ut risus vulputate pretium morbi molestie. Sit non morbi libero nibh morbi in aliquet. Auctor quis nisl pretium leo mauris aliquet enim quis.',
    },
    {
      title: 'MISSION',
      description:
        'Cursus at pellentesque viverra convallis. Tincidunt turpis tincidunt purus luctus commodo pellentesque. Sit pellentesque sit molestie ultrices lefensa indanese.',
    },
    {
      title: 'PURPOSE',
      description:
        'Turpis eu accumsan platea malesuada aliquet sed egestas posuere vestibulum. Consectetur risus nascetur at id nibh ullamcorper. Euismod semper diam lacinia ut placerat massa.',
    },
  ];

  return (
    <>
      <Navbar />

      <CentralCommunityBanner
        bannerColor="bg-primary"
        bannerImageTop={backgroundTopBannerPageCentralBerbagi}
        bannerImageBottom={backgroundBottomBannerPageCentralBerbagi}
        bannerTitle="CENTRAL BERBAGI"
        bannerDescription="Program CSR (Corporate Social Responsibility) ini bermula ketika Central Group bergabung di komunitas Synergy (Komunitas Developer dan Agent Property se-Indonesia), yang bersama-sama melakukan program pembagian sembako untuk masyarakat yang terkena dampak Covid-19. Bermula dari kegiatan tersebut, timbul ide untuk melanjutkan kegitan berbagi kasih menjadi kegiatan rutin bulanan."
        pillarTitle="FOUR PILLARS OF CENTRAL BERBAGI"
        pillarItems={centralBerbagiPillars}
        pillarsIconBackground="bg-textTertiary"
      />

      <CentralCommunityGoal goals={centralBerbagiGoals} />

      <CentralCommunityActivity activityImages={centralAcitivityAsArray} />

      <Footer />
    </>
  );
}
