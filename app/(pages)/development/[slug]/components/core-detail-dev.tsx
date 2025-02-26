'use client';

import { useMemo } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { RiBuildingFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  PiArrowSquareOutFill,
  PiSecurityCameraFill,
  PiSneakerFill,
  PiPersonSimpleSwimFill,
  PiBasketFill,
  PiPingPongFill,
  PiTreeEvergreenFill,
  PiDownloadSimpleFill,
} from 'react-icons/pi';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { logoProperty, imgLoadingMaps } from '@/app/lib/utils/image';
import { DevelopmentModel } from '@/app/lib/utils/developments';
import Link from 'next/link';
import FormDownloadBrosur from './brochure-form';

const facilities = [
  {
    title: '24/7 Security',
    icon: <PiSecurityCameraFill />,
  },
  {
    title: 'Jogging Track',
    icon: <PiSneakerFill />,
  },
  {
    title: 'Swimming Pool',
    icon: <PiPersonSimpleSwimFill />,
  },
  {
    title: 'Fresh Modern Market',
    icon: <PiBasketFill />,
  },
  {
    title: 'Green Spaced Garden',
    icon: <PiTreeEvergreenFill />,
  },
  {
    title: 'Club House',
    icon: <PiPingPongFill />,
  },
];

export default function CoreDetailDevelopment({
  detail,
  nextSectionId,
}: {
  detail: DevelopmentModel | undefined;
  nextSectionId: string;
}) {
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   delete (L.Icon.Default.prototype as any)._getIconUrl;
  //   L.Icon.Default.mergeOptions({
  //     iconUrl: markerIconPng.src,
  //     shadowUrl: markerShadowPng.src,
  //   });
  // }, []);

  const MapsComponent = useMemo(
    () =>
      dynamic(() => import('../../../../components/maps-component'), {
        loading: () => (
          <div className="w-full h-[127px] lg:h-[260px] p-0 lg:flex-grow mb-10 lg:mb-0 lg:pr-[75px]">
            <Image src={imgLoadingMaps} alt="Logo Property" unoptimized className="w-full h-full object-fill" />
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  return (
    <div className="relative container mx-auto flex px-4 p-0 lg:pt-20">
      <div className="flex flex-col flex-grow">
        <div className="p-8 pb-0 lg:pl-0 lg:pt-0 lg:pb-0 lg:pr-[75px] ">
          <div className="flex items-start mb-0 lg:mb-10">
            <div className="hidden lg:flex items-center justify-center w-full max-w-[162px] aspect-square bg-white rounded-full shadow-lg border-2 border-[#E1E1E1]">
              <Image src={logoProperty} alt="Logo Property" unoptimized className="w-[80%] h-[80%] object-contain" />
            </div>

            <div className="ml-0 lg:ml-14">
              <Link href="/development" className="flex items-center gap-2 lg:gap-4 mb-4">
                <HiOutlineArrowLeft className="text-primary text-lg lg:text-xl" />
                <p className="text-primary font-medium text-sm lg:text-xs uppercase tracking-wider">All Development</p>
              </Link>

              <h1 className="font-marcellus text-textPrimary lg:leading-none lg:text-[64px] text-4xl uppercase lg:mb-0 mb-4">
                {detail?.title}
              </h1>
            </div>
          </div>

          <div className="lg:block hidden border-t border-textPrimary border-opacity-10 my-4" />

          <div className="flex text-textPrimary items-center gap-4  text-sm">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
              <RiBuildingFill className="text-sm" />
              {detail?.type}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
              <MdLocationOn className="text-sm" />
              {detail?.location}
            </span>
            <div className="hidden lg:flex items-center text-textPrimary gap-1 text-[10px] font-bold uppercase ">
              <FaWallet className="text-xs" />
              Starts from Rp 800.000.000
            </div>
          </div>

          <div className="lg:hidden block border-t border-textPrimary border-opacity-10 my-4" />

          <div className="lg:hidden flex items-center text-textPrimary gap-1 text-[10px] font-bold uppercase ">
            <FaWallet className="text-xs" />
            Starts from Rp 800.000.000
          </div>

          <p className="text-sm mt-6 mb-12 text-textSecondary tracking-wide">{detail?.description}</p>

          <div className="w-full lg:max-w-fit flex gap-4 mb-10">
            <Button variant="outline" className="flex-1 rounded-none text-xs py-[24px] px-[15px] lg:px-6">
              CALCULATE COST
            </Button>

            <Button variant="filled" className="flex-1 rounded-none text-xs py-[24px] px-[15px] lg:px-6">
              VISIT WEBSITE
              <span>
                <PiArrowSquareOutFill className="text-white text-xl" />
              </span>
            </Button>
          </div>
          <div className="w-full block lg:hidden">
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

          <div className="border-t border-textPrimary border-opacity-10 mt-10 mb-8 lg:mb-12" />

          <h1 className="font-marcellus text-textPrimary text-2xl uppercase mb-10 lg:mb-12">Facilities</h1>

          <div className="flex flex-col gap-4 mb-9 lg:grid lg:grid-cols-2 lg:gap-7">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center font-medium gap-4 text-textSecondary text-sm">
                <span className="text-lg text-textPrimary">{facility.icon}</span>
                <p>{facility.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[127px] lg:h-[260px] p-0 lg:flex-grow mb-10 lg:mb-0 lg:pr-[75px]">
          <MapsComponent />
        </div>

        <div className="hidden w-full lg:block border-t border-textPrimary border-opacity-10 mb-10 mt-14" />

        <div className="px-8 lg:px-0  lg:pr-[75px]">
          <h1 className="font-marcellus text-textPrimary text-[22px] uppercase mb-6">Financing Available</h1>
          <p className="text-textSecondary text-sm mb-10">
            This calculation is an estimate and not a depiction of actual payment plan
          </p>

          <div className="space-y-6 mb-8 lg:mb-20 lg:flex lg:flex-col lg:gap-6">
            <div className="block lg:flex lg:gap-6 w-full">
              {/* Property Price */}
              <div className="space-y-2 lg:flex-[0.4]">
                <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                  PROPERTY PRICE
                </Label>
                <Input
                  id="property-price"
                  placeholder="Property price"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                    paddingTop: '23px',
                    paddingBottom: '23px',
                  }}
                  className=" text-gray-900"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2 lg:flex-[0.6]">
                <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                  DOWN PAYMENT
                </Label>
                <Input
                  id="down-payment"
                  placeholder="Enter down payment amount"
                  style={{
                    backgroundColor: 'white',
                    borderColor: '#E1E1E1',
                    borderRadius: '0px',
                    fontSize: '12px',
                    paddingTop: '23px',
                    paddingBottom: '23px',
                  }}
                  className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>

            <div className="block lg:flex lg:gap-6 items-end">
              {/* Loan Term */}
              <div className="space-y-2 lg:flex-[0.43]">
                <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                  LOAN TERM
                </Label>
                <div className="relative">
                  <Input
                    id="loan-term"
                    placeholder="Enter loan term"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      fontSize: '12px',
                      paddingRight: '48px',
                      paddingTop: '23px',
                      paddingBottom: '23px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                  <span className="absolute hidden lg:flex inset-y-0 right-3  items-center text-black text-[12px] pointer-events-none">
                    Years
                  </span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2 lg:flex-[0.43]">
                <Label htmlFor="interest-rate" className="text-[10px] font-semibold text-gray-900">
                  INTEREST RATE
                </Label>
                <div className="relative">
                  <Input
                    id="interest-rate"
                    placeholder="Enter interest rate"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#E1E1E1',
                      borderRadius: '0px',
                      paddingRight: '48px',
                      paddingTop: '23px',
                      paddingBottom: '23px',
                    }}
                    className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                  />
                  <span className="absolute hidden lg:flex inset-y-0 right-3  items-center text-black text-[12px] pointer-events-none">
                    %
                  </span>
                </div>
              </div>
              <Button variant="filled" className="w-full rounded-none text-xs py-[24px] hidden lg:flex-[0.14] lg:flex">
                CALCULATE
              </Button>
            </div>
          </div>
          <Button className="w-full bg-primary text-white rounded-none text-xs h-[48px]  block lg:hidden ">
            CALCULATE
          </Button>
        </div>
      </div>
      <div className="hidden lg:block w-[405px] flex-shrink-0">
        <FormDownloadBrosur nextSectionId={nextSectionId} />
      </div>
    </div>
  );
}
