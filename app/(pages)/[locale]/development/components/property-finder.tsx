'use client';

import {useState} from 'react';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {RiBuildingFill} from 'react-icons/ri';
import {Slider} from '@/components/ui/slider';
import {ComboboxDemo} from '@/components/ui/combobox';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';

import {useQuery} from "@urql/next";
import PropertyTypesQuery from '@/graphql/PropertyTypesQuery.graphql';
import LocationsQuery from '@/graphql/LocationsQuery.graphql';
import FacilitiesQuery from '@/graphql/FacilitiesQuery.graphql';
import {useSearchParams} from "next/navigation";
import {useRouter} from '@/i18n/navigation';
import {useLocale} from "next-intl";

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

    const [{data: propertyTypesResponse}] = useQuery({
        query: PropertyTypesQuery,
        variables: {
            lang: locale
        }
    });

    const propertyTypes = propertyTypesResponse.propertytypes.map(propertyType => {
        return {
            value: propertyType.id,
            label: propertyType.title
        }
    })

    const [{data: locationsResponse}] = useQuery({
        query: LocationsQuery
    });

    const cities = locationsResponse.locations.map(location => {
        return {
            value: location.id,
            label: location.title
        }
    });

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
                <ComboboxDemo
                    dataPropertys={cities}
                    placeholder="Location"
                    icon={<FaMapMarkerAlt className="text-white"/>}
                    onValueChange={value => setFilterLocation(value)}
                    defaultValue={searchParams.get('location')}
                    customClassName={{
                        button: 'bg-black text-white hover:bg-black hover:opacity-80 py-6',
                        popoverContent: 'bg-gray-800 text-white',
                        input: 'border-gray-400',
                        item: 'text-gray-700',
                        itemActive: 'bg-blue-300 text-black',
                    }}
                />
            </div>

            <div className="mb-6">
                <ComboboxDemo
                    dataPropertys={propertyTypes}
                    placeholder="Property Types"
                    icon={<RiBuildingFill className="text-white"/>}
                    onValueChange={value => setFilterPropertyType(value)}
                    defaultValue={searchParams.get('property_type')}
                    customClassName={{
                        button: 'bg-black text-white hover:bg-black hover:opacity-80 py-6',
                        popoverContent: 'bg-gray-800 text-white',
                        input: 'border-gray-400',
                        item: 'text-gray-700',
                        itemActive: 'bg-blue-300 text-black',
                    }}
                />
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
