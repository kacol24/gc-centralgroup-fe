'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiBuildingFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import Image, { StaticImageData } from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

interface PropertyCardProps {
  image: string | StaticImageData;
  title: string;
  location: string;
  index: number;
  type: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ image, title, location, index , type}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="relative   w-full aspect-[4/5] mx-auto overflow-hidden rounded-none lg:rounded-[3px] shadow-lg"
    >
      {/* Image */}
      <Image src={image} alt={title} width={1000} height={1000} className="w-full h-full object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
        <h1 className="text-2xl uppercase font-marcellus">{title}</h1>

        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-4  text-[10px]">
            <span className="flex items-center gap-[6px] font-bold uppercase">
              <RiBuildingFill className="text-xs " />
              {type}
            </span>
            <span className="flex items-center gap-1 font-bold uppercase">
              <MdLocationOn className="text-xs" />
              {location}
            </span>
          </div>

          <button className="text-xl text-white uppercase px-4 py-2 ">
            <HiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
