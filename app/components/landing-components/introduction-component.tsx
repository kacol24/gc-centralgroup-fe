'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
const stats = [
  { value: '35+', label: 'YEARS OF EXPERIENCE' },
  { value: '250+', label: 'HECTARE AREAS' },
  { value: '6600+', label: 'HOUSING BUILT OVER THE LAST 5 YEARS' },
  { value: '15+', label: 'PROJECTS' },
];
import Image from 'next/image';
import { imgThumbVideo, development3 } from '@/app/lib/utils/image';
import { FaPlay } from 'react-icons/fa6';
import content from '@/app/lib/utils/content.json';
import { useLocale } from 'next-intl';

export default function IntroductionComponent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = 'https://www.youtube.com/embed/M-o6MFpM9ko?autoplay=1&rel=0&showinfo=0';

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const locale = useLocale();

  return (
    <section className="w-full mx-auto container px-4 md:px-8 lg:px-10 xl:px-8 mt-10">
      <div className="lg:flex">
        <div className="flex flex-col lg:flex-[0.45] justify-start items-start w-full h-full lg:pr-[100px] mb-12 lg:mb-0 ">
          <h1
            data-aos="fade-right"
            className="lg:text-[36px] text-[28px] font-marcellus text-start text-textPrimary mb-6 lg:mb-10 uppercase tracking-wider"
          >
            {content?.[locale].home.introduction.title}
          </h1>
          <p
            data-aos="fade-right"
            className="font-medium font-mon lg:text-sm text-start text-textSecondary mb-10 lg:mb-12 leading-6 tracking-wide"
          >
            {content?.[locale].home.introduction.content}
          </p>

          <h1
            data-aos="fade-right"
            className="lg:text-[36px] text-[28px] font-marcellus text-start text-textPrimary mb-6 lg:mb-10 uppercase tracking-wider"
          >
            {content?.[locale].home.investwithus.title}
          </h1>
          <p
            data-aos="fade-right"
            className="font-medium font-mon lg:text-sm text-start text-textSecondary mb-10 lg:mb-12 leading-6 tracking-wide"
            dangerouslySetInnerHTML={{
              __html: content?.[locale].home.investwithus.content,
            }}
          ></p>

          <Button
            data-aos="fade-right"
            variant="filled"
            className="rounded-none text-xs py-[24px] px-[30px] lg:px-[38px]"
          >
            <Link href={`/about`} passHref>
              ABOUT US
            </Link>
          </Button>
        </div>
        <div className="w-full flex flex-[0.55] h-[232px] lg:h-[450px]">
          {isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full relative cursor-pointer flex gap-[30px]" onClick={() => setIsPlaying(true)}>
              <div className="h-full flex-1 flex items-end">
                <div
                  data-aos="zoom-in"
                  className="w-full h-[178px] lg:h-[340px] lg:max-h-[500px]"
                  style={{ boxShadow: '0px 10px 60px 0px #00000026' }}
                >
                  <Image src={development3} alt="Thumbnail" className=" w-full h-full object-cover" />
                </div>
              </div>

              <div className="h-full flex-1 items-start">
                <div
                  data-aos="zoom-in"
                  className="w-full h-[117px] lg:h-[224px]"
                  style={{ boxShadow: '0px 10px 60px 0px #00000026' }}
                >
                  <Image src={imgThumbVideo} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div data-aos="zoom-in" className="bg-white p-5 max-w-[60px] aspect-square rounded-full shadow-lg">
                  <FaPlay className=" w-5 h-5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-6 text-center mt-12 lg:mt-[100px] pt-0 lg:pt-10">
        {stats.map((stat, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            key={index}
            className={`flex flex-col justify-center items-center ${
              index === 0
                ? 'border-b-2 lg:border-b-0 border-r-2'
                : index === 1
                  ? 'border-b-2 lg:border-b-0 '
                  : index === 2
                    ? ' border-b-0 border-r-2'
                    : 'border-none'
            } lg:border-r-2 border-textPrimary border-opacity-20 h-[170px]`}
          >
            <p className="text-[32px] lg:text-[52px] font-marcellus text-textPrimary">{stat.value}</p>
            <p
              className={`text-[10px] lg:text-xs font-semibold text-textPrimary uppercase mt-2 ${
                index === 2 ? 'pr-4' : 'pr-0'
              } lg:pr-6`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
