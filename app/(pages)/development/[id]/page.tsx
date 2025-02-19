'use client';

// import { useParams } from 'next/navigation';
import HeroDetailDevelopment from './components/hero-detail-dev';

export default function DevelopmentDetailPage() {
  // const params = useParams();
  // const { id } = params;

  return (
    <section className="w-screen h-screen flex items-start">
      <HeroDetailDevelopment />
    </section>
  );
}
