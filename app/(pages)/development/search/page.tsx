'use client'

import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";
import PropertyFinder from "@/app/(pages)/development/components/property-finder";
import CardListDevelopment from "@/app/(pages)/development/components/card-list-development";
import {use, useMemo} from "react";
import dynamic from "next/dynamic";
import {useQuery} from "@urql/next";

export default function SearchResults({searchParams}) {
    const PropertyFinder = useMemo(
        () =>
            dynamic(() => import('../components/property-finder'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        [],
    );

    const {
        location: locationId,
        property_type: propertyTypeId,
        facilities: facilityIds,
        price
    } = use(searchParams);

    let variables = {
        lang: 'en'
    };
    if (locationId) {
        variables['locationId'] = parseInt(locationId);
    }
    if (propertyTypeId) {
        variables['propertyTypeId'] = parseInt(propertyTypeId);
    }
    if (facilityIds) {
        variables['facilityIds'] = facilityIds;
    }
    if (price) {
        const [minPrice, maxPrice] = price.split('-')
        variables['minPrice'] = parseInt(minPrice);
        variables['maxPrice'] = parseInt(maxPrice);
    }

    const [{data: projectsResponse}] = useQuery({
        query: ProjectsQuery,
        variables
    });

    return (
        <div className="container mx-auto px-4 flex">
            <h1
                data-aos="fade-up"
                className="text-[64px] leading-[70px]  text-center mt-56 mb-28 font-marcellus text-textPrimary uppercase lg:flex hidden"
            >
                Search result
            </h1>
            <div className="py-10 lg:py-20">
                <PropertyFinder/>
                <div className="flex flex-col flex-grow lg:pl-6">
                    <CardListDevelopment properties={projectsResponse.projects}/>
                </div>
            </div>
        </div>
    );
}
