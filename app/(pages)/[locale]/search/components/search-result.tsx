import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";
import CardListDevelopment from "@/app/(pages)/[locale]/development/components/card-list-development";
import {getLocale} from "next-intl/server";
import {getClient} from "@/app/lib/urqlClient";

export default async function SearchResult({params: {location, property_type, facilities, price}}) {
    const locale = await getLocale();
    const client = await getClient();

    const variables = {
        lang: locale
    };
    if (location) {
        variables['locationId'] = location;
    }
    if (property_type) {
        variables['propertyTypeId'] = property_type;
    }
    if (facilities) {
        variables['facilityIds'] = facilities;
    }
    if (price) {
        variables['minPrice'] = price[0] * 1000000;
        variables['maxPrice'] = price[1] * 1000000;
    }

    const {data: projectsResponse} = await client.query(ProjectsQuery, variables);

    return (
        projectsResponse?.projects.datas.length ?
            <CardListDevelopment columns="2" properties={projectsResponse.projects}/>
            :
            <div>
                We’ve found 0 matches for you search.. Try searching a different combination.
            </div>
    );
}
