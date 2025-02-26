'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import CustomPopup from '../(pages)/development/components/custom-popup';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

import { imgProperty1 } from '@/app/lib/utils/image';
import { StaticImageData } from 'next/image';

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

export default function MapsComponent() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
    });
  }, []);

  return (
    <>
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
    </>
  );
}
