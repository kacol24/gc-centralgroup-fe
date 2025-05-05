import HeroDetailDevelopment from './components/hero-detail-dev';
import CarouselDetailDevelopment from './components/slider-detail-dev';
// import CardListDetailDevelopment from './components/card-list-detail-dev';
import CoreDetailDevelopment from './components/core-detail-dev';
import ProjectDetailQuery from '@/graphql/ProjectDetailQuery.graphql';
import { getLocale } from 'next-intl/server';
import { getClient } from '@/app/lib/urqlClient';

export default async function DevelopmentDetailPage({ params }) {
  const { id } = await params;
  const locale = await getLocale();

  const client = await getClient();
  const { data: projectData } = await client.query(ProjectDetailQuery, {
    lang: locale,
    id,
  });

  const nextSectionId = 'next-section';

  return (
    <section className="w-full h-auto bg-backgroundWhite">
      <HeroDetailDevelopment heroImage={projectData.project.header_image} logo={projectData.project.logo} />
      <CoreDetailDevelopment nextSectionId={nextSectionId} detail={projectData.project} />
      <CarouselDetailDevelopment id="last-section" images={projectData.project.images} />
      {/* <CardListDetailDevelopment developments={projectData.project.related_projects}/> */}
    </section>
  );
}
