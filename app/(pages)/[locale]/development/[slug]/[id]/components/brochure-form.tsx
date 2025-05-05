'use client';

import { useEffect, useState, useRef } from 'react';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useMutation } from '@urql/next';
import DownloadBrochureMutation from '@/graphql/DownloadBrochure.graphql';

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

  const [downloadBrochureResult, downloadBrochure] = useMutation(DownloadBrochureMutation);

  const handleDownloadBrochure = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const submitButton = form.querySelector('button[type="submit"]');
    console.log('submitButton', submitButton);
    if (submitButton && name && phone && email) {
      submitButton.setAttribute('disabled', 'true');
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    }

    try {
      const res = await downloadBrochure({
        project_id: '1',
        name: name,
        phone: phone,
        email: email,
      });
      const brochure_url = res?.data?.downloadBrochure?.data[0] || null;
      if (!brochure_url) {
        console.error('Error downloading brochure:', res.error);
        return;
      }
      alert('Your brochure is being downloaded successfully. Please hold on for a moment!');

      const link = document.createElement('a');
      link.href = brochure_url;
      link.target = '_blank';
      link.setAttribute('download', 'Central Brochure.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(downloadBrochureResult);
      if (submitButton) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    } catch (error) {
      console.error('Error downloading brochure:', error);
    }
  };

  return (
    <form onSubmit={handleDownloadBrochure}>
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
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                  className=" text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                  NOMOR HANDPHONE
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+62"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                  className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                  YOUR EMAIL
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                  className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
            </div>

            <Button
              variant="filled"
              className="w-full rounded-none text-xs py-[24px] uppercase"
              type="submit"
              disabled={false}
            >
              Download Brochure
              <span>
                <PiDownloadSimpleFill className="text-white text-xl" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
