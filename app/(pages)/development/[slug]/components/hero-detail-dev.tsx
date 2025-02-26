import { imgBackgroundHeroDetailDev, logoProperty } from '@/app/lib/utils/image';
import Image from 'next/image';

export default function HeroDetailDevelopment({ id }: { id: string }) {
  return (
    <div id={id} className="relative w-full h-[585px]">
      <Image
        src={imgBackgroundHeroDetailDev}
        alt="Hero Detail Development"
        unoptimized
        className="w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-black/50 to-transparent"></div>

      <div className="absolute bottom-4 left-4 lg:hidden">
        <div className="flex items-center justify-center w-[120px] h-[120px] bg-white rounded-full shadow-lg border-2 border-[#E1E1E1]">
          <Image src={logoProperty} alt="Logo Property" unoptimized className="w-[100px] h-[100px] object-contain" />
        </div>
      </div>
    </div>
  );
}
