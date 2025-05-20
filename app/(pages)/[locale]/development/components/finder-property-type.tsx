import {RiBuildingFill} from "react-icons/ri";
import {ComboboxDemo} from "@/components/ui/combobox";
import {useQuery} from "@urql/next";
import PropertyTypesQuery from "@/graphql/PropertyTypesQuery.graphql";
import {useLocale} from "next-intl";
import {useSearchParams} from "next/navigation";
import React, {useEffect} from "react";

export default function FinderPropertyType({ handleValueChange }) {
    const locale = useLocale();
    const searchParams = useSearchParams();

    const [{data: propertyTypesResponse}, reexecuteQuery] = useQuery({
        query: PropertyTypesQuery,
        variables: {
            lang: locale
        },
        pause: true,
    });

    const propertyTypes = propertyTypesResponse?.propertytypes.map(propertyType => {
        return {
            value: propertyType.id,
            label: propertyType.title
        }
    });

    useEffect(function () {
        reexecuteQuery();
    }, [reexecuteQuery]);

    return (
        <ComboboxDemo
            dataPropertys={propertyTypes ?? []}
            placeholder="Property Types"
            icon={<RiBuildingFill className="text-white"/>}
            onValueChange={value => handleValueChange(value)}
            defaultValue={searchParams.get('property_type')}
            customClassName={{
                button: 'bg-black text-white hover:bg-black hover:opacity-80 py-6',
                popoverContent: 'bg-gray-800 text-white',
                input: 'border-gray-400',
                item: 'text-gray-700',
                itemActive: 'bg-blue-300 text-black',
            }}
        />
    );
}
