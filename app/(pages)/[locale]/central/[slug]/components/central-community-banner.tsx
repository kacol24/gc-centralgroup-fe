'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Image, { StaticImageData } from 'next/image';
import { useEffect } from 'react';

interface CentralCommunityBannerProps {
  bannerColor?: string;
  bannerImageTop?: StaticImageData;
  bannerImageBottom?: StaticImageData;
  bannerTitle?: string;
  bannerDescription?: string;
  pillarTitle?: string;
  pillarItems?: Pillar[];
  pillarsIconBackground?: string;
  slug?: string;
}

interface Pillar {
  title?: string;
  description?: string;
  icon: StaticImageData;
}

export default function CentralCommunityBanner({
  bannerColor,
  bannerImageTop,
  bannerImageBottom,
  bannerTitle,
  bannerDescription,
  pillarTitle,
  pillarItems,
  pillarsIconBackground,
  slug,
}: CentralCommunityBannerProps) {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  return (
    <section>
      <div
        className="min-h-[50rem] h-screen relative flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImageTop?.src})` }}
      >
        <div className={`absolute inset-0 opacity-95 ${bannerColor}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20" />

        <div className="z-20 container w-[80%] m-auto text-center">
          <h1
            className="mb-12 mt-[10rem] md:mt-0 text-4xl text-center uppercase lg:text-6xl text-white font-marcellus"
            data-aos="fade-up"
          >
            {bannerTitle}
          </h1>
          <p
            className="mb-8 sm:mb-12 md:mb-16 text-sm/6 text-center md:w-[80%] md:mx-auto text-white"
            data-aos="fade-up"
            data-aos-delay="200"
            dangerouslySetInnerHTML={{ __html: bannerDescription }}
          />
          {slug && slug === 'connect' && (
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
              <a
                href="https://play.google.com/store/apps/details?id=id.central.connect"
                target="_blank"
                className="block"
              >
                <Image
                  src="/assets/image/googleplay.svg"
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
                  className="w-32 sm:w-36 md:w-40 h-auto hover:scale-105 transition-transform duration-200"
                />
              </a>
              <a href="https://apps.apple.com/id/app/central-connect/id1644669683" target="_blank" className="block">
                <Image
                  src="/assets/image/appstore.svg"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="w-32 sm:w-36 md:w-40 h-auto hover:scale-105 transition-transform duration-200"
                />
              </a>
            </div>
          )}
        </div>
      </div>

      {pillarItems && pillarItems.length > 1 && (
        <div className="bg-cover bg-center" style={{ backgroundImage: `url(${bannerImageBottom?.src})` }}>
          <div className="container mx-auto relative px-4 py-12 md:py-8 ">
            <div
              className={`relative -top-32 -mb-32 md:-top-80 md:-mb-80 lg:-top-64 lg:-mb-24 ${slug === 'connect' ? 'mt-[6rem]' : ''}`}
            >
              <div className="flex items-center gap-2 md:justify-between">
                <div className="w-[20%] h-[1px] bg-white opacity-40 lg:w-[25%]" />
                <h2
                  className="text-2xl text-center text-white font-marcellus lg:text-4xl"
                  data-aos="zoom-in-up"
                  data-aos-delay="600"
                >
                  {pillarTitle}
                </h2>
                <div className="w-[20%] h-[1px] bg-white opacity-40 lg:w-[25%]" />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
                <div className="md:col-span-2 lg:col-span-4 grid md:grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-[25%] justify-center gap-4">
                  {pillarItems &&
                    pillarItems.map((pillar, index) => (
                      <div
                        key={index}
                        className={`
                        ${index == 0 ? 'mt-20' : 'mt-16'}
                        ${index < 2 ? 'md:mt-20' : ''}
                        relative lg:mt-24 pt-20 pb-16 px-10 bg-white
                      `}
                        data-aos="fade-up"
                        data-aos-delay={(index + 5) * 100}
                      >
                        <div
                          className={`absolute -top-10 left-[50%] transform -translate-x-1/2 w-fit p-6 rounded-full ${pillarsIconBackground} border-4 border-white`}
                        >
                          <Image
                            src={pillar?.icon}
                            alt="Icon Home"
                            className="w-6 object-contain object-center aspect-square"
                          />
                        </div>
                        <h3 className="mb-6 text-2xl text-center text-textPrimary font-marcellus">{pillar.title}</h3>
                        <p
                          className="text-sm/6 text-center text-textSecondary font-medium"
                          dangerouslySetInnerHTML={{ __html: pillar.description }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
