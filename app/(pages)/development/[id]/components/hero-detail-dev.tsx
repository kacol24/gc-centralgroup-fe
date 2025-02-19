import { imgBackgroundHeroDetailDev, logoProperty } from '@/app/lib/utils/image';
import Image from 'next/image';

export default function HeroDetailDevelopment() {
  return (
    <div className="relative w-full h-[585px]">
      {/* Background Image */}
      <Image
        src={imgBackgroundHeroDetailDev}
        alt="Hero Detail Development"
        unoptimized
        className="w-full h-full object-cover"
      />

      {/* Logo di pojok kiri bawah saat mobile */}
      <div className="absolute bottom-4 left-4 lg:hidden">
        <div className="flex items-center justify-center w-[120px] h-[120px] bg-white border- rounded-full shadow-lg">
          <Image src={logoProperty} alt="Logo Property" unoptimized className="w-[120px] h-[120px] object-contain" />
        </div>
      </div>
    </div>
  );
}
