'use client';

import { useEffect } from 'react';
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
} from 'react-icons/pi';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { imgProperty1, logoProperty } from '@/app/lib/utils/image';
import CustomPopup from '../../components/custom-popup';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { StaticImageData } from 'next/image';
import { DevelopmentModel } from '@/app/lib/utils/developments';
import Link from 'next/link';
import FormDownloadBrosur from './brochure-form';

const defaultIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const citiesData: { name: string; image: string | StaticImageData; coords: [number, number] }[] = [
  {
    name: 'Jakarta',
    image: imgProperty1,

    coords: [-6.2, 106.816666],
  },
  {
    name: 'Bandung',
    image: imgProperty1,
    coords: [-6.914744, 107.60981],
  },
  {
    name: 'Banten',
    image: imgProperty1,
    coords: [-6.405817, 106.064018],
  },
  {
    name: 'Yogyakarta',
    image: imgProperty1,
    coords: [-7.79558, 110.36949],
  },
  {
    name: 'Solo',
    image: imgProperty1,
    coords: [-7.575489, 110.824327],
  },
];

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
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
    });
  }, []);

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

          <p className="text-sm mt-6 mb-12 text-textSecondary">{detail?.description}</p>

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

          <div className="border-t border-textPrimary border-opacity-10 mb-8 lg:mb-12" />

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
          <MapContainer
            center={[-6.914744, 107.60981]}
            zoom={7}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {citiesData.map((city, index) => (
              <Marker key={index} position={city.coords} icon={defaultIcon}>
                <Popup className="custom-popup bg-transparent">
                  <CustomPopup imageSrc={imgProperty1} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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
          <Button variant="filled" className="w-full mb-8 rounded-none text-xs py-[24px] block lg:hidden lg:w-">
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
