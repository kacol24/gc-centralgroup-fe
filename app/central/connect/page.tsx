'use client';

import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import {
  backgroundTopBannerPageCentralConnect,
  backgroundBottomBannerPageCentralConnect,
  centralAcitivityAsArray,
} from '../../lib/utils/image';
import { iconHome, iconBook, iconFish, iconPlus } from '../../lib/utils/svg';
import CentralCommunityBanner from '../../components/central-community-components/central-community-banner';
import CentralCommunityGoal from '../../components/central-community-components/central-community-goal';
import CentralCommunityActivity from '../../components/central-community-components/central-community-activity';

export default function CentralConnect() {
  const centralConnectPillars = [
    {
      title: 'SUSPERNDISE',
      description:
        'Turpis eu accumsan platea malesuada aliquet sed egestas posuere vestibulum. Consectetur risus nascetur at id nibh ullamcorper. Euismod semper diam lacinia ut placerat massa.',
      icon: iconHome,
    },
    {
      title: 'ADIPISCING',
      description:
        'Aliquam malesuada enim ut risus vulputate pretium morbi molestie. Sit non morbi libero nibh morbi in aliquet. Auctor quis nisl pretium leo mauris aliquet enim quis.',
      icon: iconBook,
    },
    {
      title: 'SOLLICITUDIN',
      description:
        'Cursus at pellentesque viverra convallis. Tincidunt turpis tincidunt purus luctus commodo pellentesque. Sit pellentesque sit molestie ultrices lefensa.',
      icon: iconFish,
    },
    {
      title: 'ULTRICIES',
      description:
        'Pulvinar a molestie lorem amet faucibus pellentesque. Sed amet velit nulla vitae pellentesque ornare urna lacinia libero. Elit feugiat ut lorem at accumsan integer vulputate augue.',
      icon: iconPlus,
    },
  ];

  const centralConnectSGoals = [
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
        bannerImageTop={backgroundTopBannerPageCentralConnect}
        bannerImageBottom={backgroundBottomBannerPageCentralConnect}
        bannerTitle="CENTRAL CONNECT"
        bannerDescription="In a tristique mi parturient et dictum facilisis donec. Gravida enim mauris laoreet et tellus nulla imperdiet mauris turpis. Pellentesque porttitor egestas adipiscing tincidunt ac morbi mattis at. Non nunc convallis convallis integer risus neque molestie lectus lorem. Maecenas nullam sollicitudin sit amet eu duis sapien quam scelerisque. Nisi adipiscing proin cras quis. Odio at risus nisl gravida tortor lectus sit quis posuere."
        pillarTitle="HOW IT WORKS"
        pillarItems={centralConnectPillars}
        pillarsIconBackground="bg-textTertiary"
      />

      <CentralCommunityGoal goals={centralConnectSGoals} />

      <CentralCommunityActivity activityImages={centralAcitivityAsArray} />

      <Footer />
    </>
  );
}
