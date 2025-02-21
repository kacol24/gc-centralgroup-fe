'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiBuildingFill } from 'react-icons/ri';
import { imgProperty1 } from '@/app/lib/utils/image';
import CustomPopup from './custom-popup';
import { Slider } from '@/components/ui/slider';
import { ComboboxDemo } from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { StaticImageData } from 'next/image';

const defaultIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const cities = [
  {
    value: 'jakarta',
    label: 'Jakarta',
  },
  {
    value: 'bandung',
    label: 'Bandung',
  },
  {
    value: 'yogyakarta',
    label: 'Yogyakarta',
  },
  {
    value: 'banten',
    label: 'Banten',
  },
  {
    value: 'solo',
    label: 'Solo',
  },
];

const propertyTypes = [
  {
    value: 'apartment',
    label: 'Apartment',
  },
  {
    value: 'house',
    label: 'House',
  },
  {
    value: 'villa',
    label: 'Villa',
  },
  {
    value: 'office',
    label: 'Office',
  },
];

const facilities = [
  { id: 'security', value: 'Security 24/7' },
  { id: 'jogging', value: 'Jogging Track' },
  { id: 'swimming', value: 'Swimming Pool' },
  { id: 'market', value: 'Fresh Modern Market' },
  { id: 'garden', value: 'Green Spaced Garden' },
  { id: 'clubhouse', value: 'Club House' },
];

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

function formatRupiah(value: number) {
  return value >= 1000 ? `Rp ${value / 1000} M` : `Rp ${value} Jt`;
}

export default function PropertyFinder() {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [value, setValue] = useState<[number, number]>([0, 5000]);

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility],
    );
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
    });
  }, []);

  return (
    <section className="w-full h-auto lg:h-[740px] lg:flex">
      {/* Property Maps */}
      <div className="w-full h-[295px] lg:h-full lg:flex-grow">
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

      {/* Property Form */}
      <div className="w-full lg:w-[580px] p-8 lg:p-20 bg-[#2E2E2E] text-white">
        <h2 className="text-2xl font-marcellus text-start lg:text-center mb-4">PROPERTY FINDER</h2>

        <div className="mb-4">
          <ComboboxDemo
            dataPropertys={cities}
            placeholder="Location"
            icon={<FaMapMarkerAlt className="text-white" />}
          />
        </div>

        <div className="mb-4">
          <ComboboxDemo
            dataPropertys={propertyTypes}
            placeholder="Property Types"
            icon={<RiBuildingFill className="text-white" />}
          />
        </div>

        <div className="mb-4">
          <Slider
            value={value}
            onValueChange={(val) => setValue([val[0], val[1]])}
            min={0}
            max={5000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-white text-sm mt-2">
            <span>{formatRupiah(value[0])}</span>
            <span>{formatRupiah(value[1])}</span>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mb-4 text-sm">
          <label className="block text-xs font-semibold mb-2">Facilities</label>
          <div className="flex flex-col gap-4">
            {facilities.map((facility) => (
              <div key={facility.id} className="flex items-center space-x-2">
                <Checkbox
                  id={facility.id}
                  checked={selectedFacilities.includes(facility.value)}
                  onCheckedChange={() => toggleFacility(facility.value)}
                />
                <Label htmlFor={facility.value}>{facility.value}</Label>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-primary py-4 px-[92px] rounded-md mt-4 text-xs font-semibold">
          FIND PROPERTY
        </button>
      </div>
    </section>
  );
}
