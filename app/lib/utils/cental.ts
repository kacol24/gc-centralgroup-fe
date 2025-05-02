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
import content from '@/app/lib/utils/content.json';

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

const centralBerbagiGoals = [
  {
    title: 'VISION',
    description: 'Be the Most Trusted & Innovative National Property Developer',
  },
  {
    title: 'MISSION',
    description: 'To fulfill people’s dream in real estate development',
  },
  {
    title: 'PURPOSE',
    description: 'To fulfill people’s dream in real estate development',
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

export const central = (locale: string = 'en'): CentralModel[] => {
  const getIcon = (index: number) => {
    if (index === 0) return iconHome;
    if (index === 1) return iconBook;
    if (index === 2) return iconFish;
    if (index === 3) return iconPlus;
    return '';
  };

  const centralBerbagiPillars = content[locale].central.berbagi.pillars.map((pillar, index) => ({
    title: pillar.title,
    description: pillar.content,
    icon: getIcon(index),
  }));

  return [
    {
      slug: 'berbagi',
      bannerColor: 'bg-primary',
      bannerImageTop: backgroundTopBannerPageCentralBerbagi,
      bannerImageBottom: backgroundBottomBannerPageCentralBerbagi,
      bannerTitle: 'CENTRAL BERBAGI',
      bannerDescription: content[locale].central.berbagi.content,
      pillarTitle: 'FOUR PILLARS OF CENTRAL BERBAGI',
      pillarItems: centralBerbagiPillars,
      pillarsIconBackground: 'bg-textTertiary',
      goals: centralBerbagiGoals,
      activityImages: [...centralAcitivityAsArray, ...centralAcitivityAsArray],
    },
    {
      slug: 'connect',
      bannerColor: 'bg-primary',
      bannerImageTop: backgroundTopBannerPageCentralConnect,
      bannerImageBottom: backgroundBottomBannerPageCentralConnect,
      bannerTitle: 'CENTRAL CONNECT',
      bannerDescription: content[locale].central.connect.content,
      pillarTitle: 'HOW IT WORKS',
      pillarItems: centralConnectPillars,
      pillarsIconBackground: 'bg-textTertiary',
      goals: centralConnectSGoals,
      activityImages: [...centralAcitivityAsArray, ...centralAcitivityAsArray],
    },
    {
      slug: 'home',
      bannerColor: 'bg-backgroundGray',
      bannerImageTop: backgroundBottomBannerPageCentralHome,
      bannerImageBottom: backgroundTopBannerPageCentralHome,
      bannerTitle: 'CENTRAL HOME',
      bannerDescription: content[locale].central.home.content,
      pillarTitle: 'HOW IT WORKS',
      pillarItems: centralConnectPillars,
      pillarsIconBackground: 'bg-primary',
      goals: centralConnectSGoals,
      activityImages: [...centralAcitivityAsArray, ...centralAcitivityAsArray],
    },
    {
      slug: 'property-academy',
      bannerColor: 'bg-backgroundGray',
      bannerImageTop: backgroundTopBannerPageCentralPropertyAcademy,
      bannerImageBottom: backgroundBottomBannerPageCentralPropertyAcademy,
      bannerTitle: 'CENTRAL PROPERTY ACADEMY',
      bannerDescription: content[locale].central.property_academy.content,
      pillarTitle: 'HOW IT WORKS',
      pillarItems: centralConnectPillars,
      pillarsIconBackground: 'bg-primary',
      goals: centralConnectSGoals,
      activityImages: [...centralAcitivityAsArray, ...centralAcitivityAsArray],
    },
  ];
};
