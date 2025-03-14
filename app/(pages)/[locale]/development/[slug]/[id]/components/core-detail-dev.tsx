'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { RiBuildingFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  PiArrowSquareOutFill,
  PiDownloadSimpleFill,
} from 'react-icons/pi';

import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import FormDownloadBrosur from './brochure-form';
import FormattedPrice from "@/app/components/formatted-price";

export default function CoreDetailDevelopment({
  detail,
  nextSectionId,
}) {
  useEffect(() => {
    AOS.init({
      once: false,
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  return (
    <div className="relative container mx-auto flex px-4 p-0 lg:pt-20">
      <div className="flex flex-col flex-grow">
        <div className="p-8 pb-0 lg:pl-0 lg:pt-0 lg:pb-0 lg:pr-[75px] ">
          <div className="flex items-start mb-0 lg:mb-10">
            <div
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="hidden lg:flex items-center justify-center w-full max-w-[162px] aspect-square bg-white rounded-full shadow-lg border-2 border-[#E1E1E1]"
            >
              <Image src={detail?.logo} width={0} height={0} alt="Logo Property" unoptimized className="w-[80%] h-[80%] object-contain" />
            </div>

            <div data-aos="zoom-in-right" data-aos-duration="1000" className="ml-0 lg:ml-14">
              <Link href="/development" className="flex items-center gap-2 lg:gap-4 mb-4">
                <HiOutlineArrowLeft className="text-primary text-lg lg:text-xl" />
                <p className="text-primary font-medium text-sm lg:text-xs uppercase tracking-wider">All Development</p>
              </Link>

              <h1
                data-aos="zoom-in-right"
                data-aos-duration="1200"
                className="font-marcellus text-textPrimary lg:leading-none lg:text-[64px] text-4xl uppercase lg:mb-0 mb-4"
              >
                {detail?.title}
              </h1>
            </div>
          </div>

          <div className="lg:block hidden border-t border-textPrimary border-opacity-10 mt-[45px] mb-[40px]" />

          <div
            data-aos="zoom-in-right"
            data-aos-duration="1000"
            className="flex text-textPrimary items-center gap-4  text-sm"
          >
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
              <RiBuildingFill className="text-sm" />
              {detail?.property_type.title}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase">
              <MdLocationOn className="text-sm" />
              {detail?.location.title}
            </span>
            <div className="hidden lg:flex items-center text-textPrimary gap-1 text-[10px] font-bold uppercase ">
              <FaWallet className="text-xs" />
              Starts from Rp <FormattedPrice value={detail?.starting_price} />
            </div>
          </div>

          <div className="lg:hidden block border-t border-textPrimary border-opacity-10 my-4" />

          <div
            data-aos="zoom-in-right"
            data-aos-duration="1200"
            className="lg:hidden flex items-center text-textPrimary gap-1 text-[10px] font-bold uppercase "
          >
            <FaWallet className="text-xs" />
            Starts from Rp <FormattedPrice value={detail?.starting_price}/>
          </div>

          <p
            data-aos="zoom-in-right"
            data-aos-duration="1000"
            className="text-sm mt-6 mb-12 text-textSecondary tracking-wide"
          >
            {detail?.description}
          </p>

          <div data-aos="zoom-in-right" data-aos-duration="1000" className="w-full lg:max-w-fit flex gap-4 mb-10">
            <Button variant="outline" className="flex-1 rounded-none text-xs py-[24px] px-[15px] lg:px-6">
              CALCULATE COST
            </Button>

            {
              detail?.website_url ?
                  <a href={detail?.website_url} target="_blank">
                    <Button variant="filled" className="flex-1 rounded-none text-xs py-[24px] px-[15px] lg:px-6">
                      VISIT WEBSITE
                      <span>
                        <PiArrowSquareOutFill className="text-white text-xl"/>
                      </span>
                    </Button>
                  </a>
                : ''
            }
          </div>
          <div className="w-full block lg:hidden">
            <h1
              data-aos="zoom-in"
              data-aos-duration="1500"
              className="font-marcellus text-textPrimary text-[22px] uppercase mb-8"
            >
              Download Brochure
            </h1>

            <div className="space-y-4 mb-6">
              {/* Property Price */}
              <div data-aos="zoom-in" data-aos-duration="1500" className="space-y-2">
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

              <div data-aos="zoom-in" data-aos-duration="1500" className="space-y-2">
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

              <div data-aos="zoom-in" data-aos-duration="1500" className="space-y-2">
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

            <Button
              data-aos="zoom-in"
              data-aos-duration="1500"
              variant="filled"
              className="w-full rounded-none text-xs py-[24px] uppercase"
            >
              Download Brochure
              <span>
                <PiDownloadSimpleFill className="text-white text-xl" />
              </span>
            </Button>
          </div>

          <div className="border-t border-textPrimary border-opacity-10 mt-10 mb-8 lg:mb-12" />

          <h1
            data-aos="fade-up"
            data-aos-duration="800"
            className="font-marcellus text-textPrimary text-2xl uppercase mb-10 lg:mb-12"
          >
            Facilities
          </h1>

          <div className="flex flex-col gap-4 mb-9 lg:grid lg:grid-cols-2 lg:gap-7">
            {detail?.facilities.map((facility, index) => (
              <div
                data-aos="zoom-in-right"
                data-aos-duration={index * 800}
                key={facility.id}
                className="flex items-center font-medium gap-4 text-textSecondary text-sm"
              >
                <Image src={facility.icon} width={20} height={20} alt={'icon ' + facility.title}/>
                <p>{facility.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[127px] lg:h-[260px] p-0 lg:flex-grow mb-10 lg:mb-0 lg:pr-[75px]">
            <iframe src={detail?.maps_url} className={'w-full h-full'}></iframe>
        </div>

        <div className="hidden w-full lg:block border-t border-textPrimary border-opacity-10 mb-10 mt-14" />

        <div className="px-8 lg:px-0  lg:pr-[75px]">
          <h1
            data-aos="fade-up"
            data-aos-duration="800"
            className="font-marcellus text-textPrimary text-[22px] uppercase mb-6"
          >
            Financing Available
          </h1>
          <p data-aos="fade-up" data-aos-duration="1000" className="text-textSecondary text-sm mb-10">
            This calculation is an estimate and not a depiction of actual payment plan
          </p>

          <div className="space-y-6 mb-8 lg:mb-20 lg:flex lg:flex-col lg:gap-6">
            <div className="block lg:flex lg:gap-6 w-full">
              {/* Property Price */}
              <div data-aos="fade-up" data-aos-duration="800" className="space-y-2 lg:flex-[0.4]">
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
              <div data-aos="fade-up" data-aos-duration="1000" className="space-y-2 lg:flex-[0.6]">
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

            <div className="block lg:flex lg:gap-6 items-end !mt-0">
              {/* Loan Term */}
              <div data-aos="fade-up" data-aos-duration="1100" className="space-y-2 lg:flex-[0.43]">
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
              <div data-aos="fade-up" data-aos-duration="1200" className="space-y-2 lg:flex-[0.43]">
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
              <Button
                data-aos="fade-up"
                data-aos-duration="1400"
                variant="filled"
                className="w-full rounded-none text-xs py-[24px] hidden lg:flex-[0.14] lg:flex"
              >
                CALCULATE
              </Button>
            </div>
          </div>
          <Button
            data-aos="fade-up"
            data-aos-duration="1400"
            className="w-full bg-primary text-white rounded-none text-xs h-[48px]  block lg:hidden "
          >
            CALCULATE
          </Button>
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-duration="1000" className="hidden lg:block w-[405px] flex-shrink-0">
        <FormDownloadBrosur nextSectionId={nextSectionId} />
      </div>
    </div>
  );
}
