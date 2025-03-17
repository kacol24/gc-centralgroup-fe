'use client'

import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";
import CardListDevelopment from "@/app/(pages)/[locale]/development/components/card-list-development";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import {useQuery} from "@urql/next";
import {useLocale} from "next-intl";
import {parseAsArrayOf, parseAsInteger, useQueryState} from "nuqs";

export default function Search() {
    const locale = useLocale();

    const PropertyFinder = useMemo(
        () =>
            dynamic(() => import('../development/components/property-finder'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        [],
    );

    const [location] = useQueryState('location', parseAsInteger);
    const [propertyType] = useQueryState('property_type', parseAsInteger);
    const [facilities] = useQueryState('facilities', parseAsArrayOf(parseAsInteger, ','));
    const [price] = useQueryState('price', parseAsArrayOf(parseAsInteger, '-'));

    const variables = {
        lang: locale
    };
    if (location) {
        variables['locationId'] = location;
    }
    if (propertyType) {
        variables['propertyTypeId'] = propertyType;
    }
    if (facilities) {
        variables['facilityIds'] = facilities;
    }
    if (price) {
        variables['minPrice'] = price[0] * 1000000;
        variables['maxPrice'] = price[1] * 1000000;
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
                            projectsResponse?.projects.datas.length ?
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
