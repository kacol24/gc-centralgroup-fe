import Image, { StaticImageData } from 'next/image';
import { RiLayoutGridFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

interface NewsCardProps {
  date: string;
  category: string;
  author: string;
  title: string;
  description: string;
  image: string | StaticImageData;
}

export default function NewsCard({ date, category, author, title, description, image }: NewsCardProps) {
  return (
    <div className="bg-white overflow-hidden min-h-[480px] lg:min-h-[580px] flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-60">
        <Image src={image} alt="News Thumbnail" layout="fill" objectFit="cover" />
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-2 text-[10px] font-bold ">{date}</div>
      </div>

      {/* Content Section */}
      <div className="lg:px-8 lg:pt-8 lg:pb-6 px-4 pb-6 pt-4 flex flex-col flex-grow justify-between min-h-[280px] lg:min-h-[310px]">
        <div>
          <div className="flex items-center gap-4 text-textPrimary font-bold text-[10px] mb-4">
            <span className="flex items-center gap-1">
              <RiLayoutGridFill /> {category}
            </span>
            <span className="flex items-center gap-1">
              <FaUserCircle /> {author}
            </span>
          </div>
          <h2 className="text-base font-semibold text-textPrimary mb-4">{title}</h2>
          <p className="text-textSecondary text-xs flex-grow">{description}</p>
        </div>

        <div>
          <div className="border-t w-full flex-none border-textPrimary mb-6 opacity-20" />
          <a
            href="#"
            className="text-primary text-xs tracking-wider font-semibold flex items-center gap-1 hover:underline"
          >
            LEARN MORE <FiArrowUpRight className="text-base ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
