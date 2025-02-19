import { FaBuilding } from 'react-icons/fa'; // Ikon Residential
import { MdLocationOn } from 'react-icons/md'; // Ikon Lokasi
import Image, { StaticImageData } from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

interface PropertyCardProps {
  image: string | StaticImageData;
  title: string;
  location: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ image, title, location }) => {
  return (
    <div className="relative w-[405px] h-[510px]  mx-auto overflow-hidden rounded-[3px] shadow-lg">
      {/* Image */}
      <Image src={image} alt={title} width={1000} height={1000} className="w-full h-full object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 text-white">
        <h1 className="text-2xl font-aboreto">{title}</h1>

        <div className='flex justify-between mt-2'>
          <div className="flex items-center gap-4  text-sm">
            <span className="flex items-center gap-1 font-bold uppercase">
              <FaBuilding className="text-xs " />
              Residential
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
