'use client';

import { imgBgContactUs } from '@/app/lib/utils/image';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { RiWhatsappFill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

export default function ContactUs() {
  const pathname = usePathname();
  const allowPath = ['/contact', '/article'];

  const contactUsHidden = () => {
    if (allowPath.includes(pathname)) {
      return 'hidden';
    }
    return 'true';
  };

  return (
    <div className={`relative w-full h-[380px] ${contactUsHidden()}`}>
      <Image src={imgBgContactUs} alt="Hero Detail Development" unoptimized className="w-full h-full object-cover" />

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-[36px] font-marcellus mb-6 uppercase tracking-wide">Have a question?</h1>
        <p className="text-sm uppercase tracking-widest mb-10">Feel free to contact us and let our team help you</p>
        <Button variant="filled" className="rounded-sm text-textPrimary bg-white text-xs py-[24px] px-[15px] lg:px-6">
          <span>
            <RiWhatsappFill className="text-textPrimary text-xl" />
          </span>
          CHAT VIA WHATSAPP
        </Button>
      </div>
    </div>
  );
}
