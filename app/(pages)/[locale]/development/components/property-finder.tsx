'use client';

import {useState} from 'react';
import {Slider} from '@/components/ui/slider';

import {useSearchParams} from "next/navigation";
import {useRouter} from '@/i18n/navigation';
import FinderPropertyType from "@/app/(pages)/[locale]/development/components/finder-property-type";
import FinderLocations from "@/app/(pages)/[locale]/development/components/finder-locations";
import FinderFacilities from "@/app/(pages)/[locale]/development/components/finder-facilities";

function formatRupiah(value: number) {
    return value >= 1000 ? `Rp ${value / 1000} M` : `Rp ${value} Jt`;
}

export default function PropertyFinder({compact = false}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>(searchParams.get('facilities') || []);
    const [value, setValue] = useState<[number, number]>(searchParams.get('price')?.split('-') || [0, 5000]);
    const [filterLocation, setFilterLocation] = useState();
    const [filterPropertyType, setFilterPropertyType] = useState();

    const toggleFacility = (facility: string) => {
        setSelectedFacilities((prev) =>
            prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility],
        );
    };

    const handleFindProperty = () => {
        const variables = {};

        if (filterLocation) {
            variables['location'] = filterLocation;
        }
        if (filterPropertyType) {
            variables['property_type'] = filterPropertyType;
        }
        if (selectedFacilities.length) {
            variables['facilities'] = selectedFacilities.join(',');
        }
        if (value) {
            variables['price'] = `${value[0]}-${value[1]}`;
        }

        const params = new URLSearchParams(variables);
        router.push('/search?' + params.toString());
    };

    return (
        <div
            className={`relative w-full lg:w-[580px] p-8 lg:p-${compact ? 10 : 20} bg-[#2E2E2E] text-white ${compact ? 'lg:min-w-[405px] lg:max-w-[405px]' : ''}`}>
            <h2 className="text-2xl font-marcellus text-start  mb-10">PROPERTY FINDER</h2>

            <div className="mb-[22px]">
                <FinderLocations handleValueChange={value => setFilterLocation(value)}/>
            </div>

            <div className="mb-6">
                <FinderPropertyType handleValueChange={value => setFilterPropertyType(value)}/>
            </div>

            <div className="mb-6">
                <label className="block text-[10px] font-semibold mb-5 uppercase">Price Range</label>

                <Slider
                    value={value}
                    onValueChange={(val) => setValue([val[0], val[1]])}
                    min={0}
                    max={5000}
                    step={100}
                    className="w-full "
                />
                <div className="flex justify-between text-white text-sm mt-4">
                    <span>{formatRupiah(value[0])}</span>
                    <span>{formatRupiah(value[1])}</span>
                </div>
            </div>

            {/* Facilities Section */}
            <div className="mb-8 ">
                <label className="block text-[10px] uppercase font-semibold mb-4">Facilities</label>
                <FinderFacilities selectedFacilities={selectedFacilities} handleValueChange={toggleFacility}/>
            </div>
            <button className="w-full bg-primary py-4 px-[92px] rounded-sm mt-0 text-xs font-semibold"
                    onClick={handleFindProperty}>
                FIND PROPERTY
            </button>
        </div>
    );
}
