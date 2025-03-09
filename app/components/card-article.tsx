'use client';

import { RiLayoutGridFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface NewsCardProps {
  id: number;
  date: string;
  category: string;
  author: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  index: number;
  slug: string;
}

const CardArticle: React.FC<NewsCardProps> = ({ id, date, category, author, title, description, image, index , slug}) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <Link href={`/article/${slug}`} className="block">
      <div
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="bg-white overflow-hidden min-h-[480px] lg:min-h-[520px] flex flex-col"
      >
        {/* Image Section */}
        <div className="relative w-full h-60">
          <Image src={image} alt="News Thumbnail" layout="fill" objectFit="cover" />
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-2 text-[10px] font-bold">{date}</div>
        </div>

        {/* Content Section */}
        <div className="p-4 pb-6 bg-white flex flex-col flex-grow justify-between min-h-[200px] lg:min-h-[200px]">
          <div>
            <div className="flex items-center gap-4 text-textPrimary font-bold text-[10px] mb-4">
              <span className="flex items-center gap-1">
                <RiLayoutGridFill /> {category}
              </span>
              <span className="flex items-center gap-1 uppercase">
                <FaUserCircle /> {author}
              </span>
            </div>
            <h2 className="text-base font-semibold text-textPrimary line-clamp-3 mb-4">{title}</h2>
            <p className="text-textSecondary text-xs/5 line-clamp-4 flex-grow">{description}</p>
          </div>

          <div className="mt-6">
            <div className="border-t w-full flex-none border-textPrimary mb-6 opacity-20" />
            <p className="text-primary text-xs tracking-wider font-semibold flex items-center gap-1 hover:underline">
              LEARN MORE <FiArrowUpRight className="text-base ml-1" />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardArticle;
