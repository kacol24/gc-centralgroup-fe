'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { imgBackgroundHeroDetailDev, logoProperty } from '@/app/lib/utils/image';
import Image from 'next/image';

export default function HeroDetailDevelopment({ heroImage, logo }) {
  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  return (
    <div className="relative w-full h-[585px]">
      <Image
        src={heroImage}
        width={0}
        height={0}
        alt="Hero Detail Development"
        unoptimized
        className="w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-black/50 to-transparent"></div>

      <div className="absolute bottom-4 left-4 lg:hidden">
        <div
          data-aos="zoom-in-right"
          data-aos-duration="1200"
          className="flex items-center justify-center w-[120px] h-[120px] bg-white rounded-full shadow-lg border-2 border-[#E1E1E1]"
        >
          <Image src={logo} width={162} height={162} alt="Logo Property" unoptimized className="w-[100px] h-[100px]" />
        </div>
      </div>
    </div>
  );
}
