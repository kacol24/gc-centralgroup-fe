import Image, { StaticImageData } from 'next/image';
import { TiArrowSortedDown } from 'react-icons/ti';

interface CustomPopupProps {
  imageSrc: StaticImageData | string;
}

export default function CustomPopup({ imageSrc }: CustomPopupProps) {
  return (
    <div className="w-[82px] h-[101px] flex flex-col items-center">
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#9AA7A7] bg-white flex items-center justify-center shadow-lg">
        <Image src={imageSrc} alt="The Icon Logo" fill className="object-cover" />
      </div>
      <div className="text-[#9AA7A7] mt-[-11px]">
        <TiArrowSortedDown size={30} width={90} />
      </div>
    </div>
  );
}
