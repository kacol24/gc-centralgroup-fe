'use client';

import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import {imgProperty1} from '@/app/lib/utils/image';
import CustomPopup from './custom-popup';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {ssr: false});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {ssr: false});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {ssr: false});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {ssr: false});

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import {useLocale} from "next-intl";
import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";
import {useQuery} from "@urql/next";

const defaultIcon = L.icon({
    iconUrl: markerIconPng.src,
    shadowUrl: markerShadowPng.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
// const citiesData: { name: string; image: string | StaticImageData; coords: [number, number] }[] = [
//     {
//         name: 'Jakarta',
//         image: imgProperty1,
//
//         coords: [-6.2, 106.816666],
//     },
//     {
//         name: 'Bandung',
//         image: imgProperty1,
//         coords: [-6.914744, 107.60981],
//     },
//     {
//         name: 'Banten',
//         image: imgProperty1,
//         coords: [-6.405817, 106.064018],
//     },
//     {
//         name: 'Yogyakarta',
//         image: imgProperty1,
//         coords: [-7.79558, 110.36949],
//     },
//     {
//         name: 'Solo',
//         image: imgProperty1,
//         coords: [-7.575489, 110.824327],
//     },
// ];

interface City {
    name: string
    image: string
    coords: [number, number] | []
}

interface Project {
    logo: string;
    maps_marker: string;
    title: string;
}

export default function PropertyFinder() {
    const locale = useLocale();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconUrl: markerIconPng.src,
            shadowUrl: markerShadowPng.src,
        });
    }, []);

    const [{data: projectsResponse}] = useQuery({
        query: ProjectsQuery,
        variables: {
            lang: locale,
        }
    });

    const citiesData: City[] = projectsResponse.projects.datas.map((project: Project) => {
        const marker = project.maps_marker || '0,0';

        return {
            name: project.title,
            image: project.logo,
            coords: marker.split(',')
        }
    });

    return (
        <MapContainer
            center={[1.0859, 103.9983]}
            zoom={12}
            scrollWheelZoom={false}
            style={{height: '100%', width: '100%', zIndex: 0}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {citiesData.map((city, index) => (
                <Marker key={index} position={city.coords} icon={defaultIcon}>
                    <Popup className="custom-popup bg-transparent">
                        <CustomPopup imageSrc={city.image}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
