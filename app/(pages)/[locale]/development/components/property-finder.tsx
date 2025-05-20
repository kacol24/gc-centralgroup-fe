'use client';

import {useState} from 'react';
import {Slider} from '@/components/ui/slider';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';

import {useQuery} from "@urql/next";
import FacilitiesQuery from '@/graphql/FacilitiesQuery.graphql';
import {useSearchParams} from "next/navigation";
import {useRouter} from '@/i18n/navigation';
import {useLocale} from "next-intl";
import FinderPropertyType from "@/app/(pages)/[locale]/development/components/finder-property-type";
import FinderLocations from "@/app/(pages)/[locale]/development/components/finder-locations";

function formatRupiah(value: number) {
    return value >= 1000 ? `Rp ${value / 1000} M` : `Rp ${value} Jt`;
}

export default function PropertyFinder({compact = false}) {
    const locale = useLocale();
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

    const [{data: facilitiesResponse}] = useQuery({
        query: FacilitiesQuery,
        variables: {
            lang: locale
        }
    });
    const facilities = facilitiesResponse.facilities;

    const handleFindProperty = () => {
        const params = new URLSearchParams();
        if (filterLocation) {
            params.set('location', filterLocation);
        }
        if (filterPropertyType) {
            params.set('property_type', filterPropertyType);
        }
        if (selectedFacilities.length) {
            params.set('facilities', selectedFacilities.join(','))
        }
        if (value) {
            params.set('price', `${value[0]}-${value[1]}`);
        }

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
                <div className="grid grid-cols-2 gap-4">
                    {facilities.map((facility) => (
                        <div key={facility.id} className="flex items-center space-x-2 ">
                            <Checkbox
                                id={facility.id}
                                checked={selectedFacilities.includes(facility.id)}
                                onCheckedChange={() => toggleFacility(facility.id)}
                            />
                            <Label htmlFor={facility.title} className="text-xs">
                                {facility.title}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="w-full bg-primary py-4 px-[92px] rounded-sm mt-0 text-xs font-semibold"
                    onClick={handleFindProperty}>
                FIND PROPERTY
            </button>
        </div>
    );
}
