'use client'

import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";
import CardListDevelopment from "@/app/(pages)/development/components/card-list-development";
import {use, useMemo} from "react";
import dynamic from "next/dynamic";
import {useQuery} from "@urql/next";

export default function Search({searchParams}) {
    const PropertyFinder = useMemo(
        () =>
            dynamic(() => import('../development/components/property-finder'), {
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
        <div className="h-auto flex flex-col justify-center items-center">
            <h1
                className="text-[64px] leading-[70px]  text-center mt-56 mb-28 font-marcellus text-textPrimary uppercase lg:flex hidden">
                Search result
            </h1>
            <h1
                className="text-[32px] leading-[1.5]  text-center mt-44 mb-20  font-marcellus text-textPrimary uppercase lg:hidden flex">
                Search result
            </h1>
            <div className="container mx-auto px-4">
                <div className="pb-10 lg:pb-20 flex flex-col md:flex-row">
                    <PropertyFinder compact/>
                    <div className="flex flex-col flex-grow lg:pl-6">
                        {
                            projectsResponse.projects.length ?
                                <CardListDevelopment columns="2" properties={projectsResponse.projects}/>
                                :
                                <div>
                                    We’ve found 0 matches for you search.. Try searching a different combination.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
