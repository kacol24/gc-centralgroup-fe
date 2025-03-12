'use client';

import { imgBgCommunityEcosystem } from '@/app/lib/utils/image';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {Link} from "@/i18n/navigation";

export default function CommunityEcosystemComponent() {
  return (
    <div className={`mt-[50px] lg:mt-[100px] relative w-full h-[580px]`}>
      <Image
        src={imgBgCommunityEcosystem}
        alt="Hero Detail Development"
        unoptimized
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-[36px] font-marcellus mb-10 uppercase tracking-wide">Community Ecosystem</h1>
        <Button variant="filled" className="rounded-sm  text-xs py-[24px] px-[15px] lg:px-6">
          <Link href={'central/berbagi'}>
              LEARN MORE
          </Link>
        </Button>
      </div>
    </div>
  );
}
