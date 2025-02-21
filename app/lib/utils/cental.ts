import {
  backgroundTopBannerPageCentralBerbagi,
  backgroundBottomBannerPageCentralBerbagi,
  backgroundTopBannerPageCentralConnect,
  backgroundBottomBannerPageCentralConnect,
  backgroundBottomBannerPageCentralHome,
  backgroundTopBannerPageCentralHome,
  backgroundBottomBannerPageCentralPropertyAcademy,
  backgroundTopBannerPageCentralPropertyAcademy,
  centralAcitivityAsArray,
} from '@/app/lib/utils/image';
import { iconHome, iconBook, iconFish, iconPlus } from '@/app/lib/utils/svg';
import { StaticImageData } from 'next/image';

interface PilarModel {
  title: string;
  description: string;
  icon: StaticImageData;
}

interface GoalModel {
  title: string;
  description: string;
}

interface ActivityImageModel {
  src: StaticImageData;
  alt: string;
}

export interface CentralModel {
  slug: string;
  bannerColor: string;
  bannerImageTop: StaticImageData;
  bannerImageBottom: StaticImageData;
  bannerTitle: string;
  bannerDescription: string;
  pillarTitle: string;
  pillarItems: PilarModel[];
  pillarsIconBackground: string;
  goals: GoalModel[];
  activityImages: ActivityImageModel[];
}

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

export const central: CentralModel[] = [
  {
    slug: 'berbagi',
    bannerColor: 'bg-primary',
    bannerImageTop: backgroundTopBannerPageCentralBerbagi,
    bannerImageBottom: backgroundBottomBannerPageCentralBerbagi,
    bannerTitle: 'CENTRAL BERBAGI',
    bannerDescription:
      'Program CSR (Corporate Social Responsibility) ini bermula ketika Central Group bergabung di komunitas Synergy (Komunitas Developer dan Agent Property se-Indonesia), yang bersama-sama melakukan program pembagian sembako untuk masyarakat yang terkena dampak Covid-19. Bermula dari kegiatan tersebut, timbul ide untuk melanjutkan kegitan berbagi kasih menjadi kegiatan rutin bulanan.',
    pillarTitle: 'FOUR PILLARS OF CENTRAL BERBAGI',
    pillarItems: centralBerbagiPillars,
    pillarsIconBackground: 'bg-textTertiary',
    goals: centralBerbagiGoals,
    activityImages: centralAcitivityAsArray,
  },
  {
    slug: 'connect',
    bannerColor: 'bg-primary',
    bannerImageTop: backgroundTopBannerPageCentralConnect,
    bannerImageBottom: backgroundBottomBannerPageCentralConnect,
    bannerTitle: 'CENTRAL CONNECT',
    bannerDescription:
      'In a tristique mi parturient et dictum facilisis donec. Gravida enim mauris laoreet et tellus nulla imperdiet mauris turpis. Pellentesque porttitor egestas adipiscing tincidunt ac morbi mattis at. Non nunc convallis convallis integer risus neque molestie lectus lorem. Maecenas nullam sollicitudin sit amet eu duis sapien quam scelerisque. Nisi adipiscing proin cras quis. Odio at risus nisl gravida tortor lectus sit quis posuere.',
    pillarTitle: 'HOW IT WORKS',
    pillarItems: centralConnectPillars,
    pillarsIconBackground: 'bg-textTertiary',
    goals: centralConnectSGoals,
    activityImages: centralAcitivityAsArray,
  },
  {
    slug: 'home',
    bannerColor: 'bg-backgroundGray',
    bannerImageTop: backgroundBottomBannerPageCentralHome,
    bannerImageBottom: backgroundTopBannerPageCentralHome,
    bannerTitle: 'CENTRAL HOME',
    bannerDescription:
      'In a tristique mi parturient et dictum facilisis donec. Gravida enim mauris laoreet et tellus nulla imperdiet mauris turpis. Pellentesque porttitor egestas adipiscing tincidunt ac morbi mattis at. Non nunc convallis convallis integer risus neque molestie lectus lorem. Maecenas nullam sollicitudin sit amet eu duis sapien quam scelerisque. Nisi adipiscing proin cras quis. Odio at risus nisl gravida tortor lectus sit quis posuere.',
    pillarTitle: 'HOW IT WORKS',
    pillarItems: centralConnectPillars,
    pillarsIconBackground: 'bg-primary',
    goals: centralConnectSGoals,
    activityImages: centralAcitivityAsArray,
  },
  {
    slug: 'property-academy',
    bannerColor: 'bg-backgroundGray',
    bannerImageTop: backgroundTopBannerPageCentralPropertyAcademy,
    bannerImageBottom: backgroundBottomBannerPageCentralPropertyAcademy,
    bannerTitle: 'CENTRAL PROPERTY ACADEMY',
    bannerDescription:
      'In a tristique mi parturient et dictum facilisis donec. Gravida enim mauris laoreet et tellus nulla imperdiet mauris turpis. Pellentesque porttitor egestas adipiscing tincidunt ac morbi mattis at. Non nunc convallis convallis integer risus neque molestie lectus lorem. Maecenas nullam sollicitudin sit amet eu duis sapien quam scelerisque. Nisi adipiscing proin cras quis. Odio at risus nisl gravida tortor lectus sit quis posuere.',
    pillarTitle: 'HOW IT WORKS',
    pillarItems: centralConnectPillars,
    pillarsIconBackground: 'bg-primary',
    goals: centralConnectSGoals,
    activityImages: centralAcitivityAsArray,
  },
];
