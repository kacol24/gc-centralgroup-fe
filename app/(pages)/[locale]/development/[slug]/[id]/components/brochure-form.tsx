'use client';

import { useEffect, useState, useRef } from 'react';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function FormDownloadBrosur({ nextSectionId }: { nextSectionId: string }) {
  const formRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const nextSection = document.getElementById(nextSectionId);
    const lastSection = document.getElementById('last-section');

    if (!nextSection || !lastSection) return;

    // Observer untuk mendeteksi apakah form harus menjadi sticky
    const topObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      { rootMargin: '-10px 0px 0px 0px' },
    );

    // Observer untuk mendeteksi apakah form harus berhenti sticky
    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFixed(false);
        }
      },
      { rootMargin: '0px 0px 0px 0px' },
    );

    topObserver.observe(nextSection);
    bottomObserver.observe(lastSection);

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [nextSectionId]);

  return (
    <div
      ref={formRef}
      className={`transition-all duration-300 container mx-auto mb-20 ${
        isFixed ? 'sticky top-[8rem] z-10' : 'sticky top-[8rem] z-10 '
      }`}
    >
      <div className="w-[405px] hidden lg:flex lg:flex-col lg:flex-shrink-0">
        <div className="p-12 bg-white shadow-xl rounded-md">
          <h1 className="font-marcellus text-textPrimary text-[22px] uppercase mb-8">Download Brochure</h1>

          <div className="space-y-4 mb-6">
            {/* Property Price */}
            <div className="space-y-2">
              <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                YOUR NAME
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#E1E1E1',
                  borderRadius: '0px',
                  fontSize: '12px',
                }}
                className=" text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                NOMOR HANDPHONE
              </Label>
              <Input
                id="phone"
                placeholder="+62"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#E1E1E1',
                  borderRadius: '0px',
                  fontSize: '12px',
                }}
                className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                YOUR EMAIL
              </Label>
              <Input
                id="email"
                placeholder="Your Email"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#E1E1E1',
                  borderRadius: '0px',
                  fontSize: '12px',
                }}
                className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <Button variant="filled" className="w-full rounded-none text-xs py-[24px] uppercase">
            Download Brochure
            <span>
              <PiDownloadSimpleFill className="text-white text-xl" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
