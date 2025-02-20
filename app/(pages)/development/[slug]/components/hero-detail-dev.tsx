import { imgBackgroundHeroDetailDev, logoProperty } from '@/app/lib/utils/image';
import Image from 'next/image';

export default function HeroDetailDevelopment() {
  return (
    <div className="relative w-full h-[585px]">
      <Image
        src={imgBackgroundHeroDetailDev}
        alt="Hero Detail Development"
        unoptimized
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-4 left-4 lg:hidden">
        <div className="flex items-center justify-center w-[120px] h-[120px] bg-white rounded-full shadow-lg border-2 border-[#E1E1E1]">
          <Image src={logoProperty} alt="Logo Property" unoptimized className="w-[100px] h-[100px] object-contain" />
        </div>
      </div>
    </div>
  );
}
