import {getClient} from "@/app/lib/urqlClient";
import BannersQuery from "@/graphql/BannersQuery.graphql";

const client = await getClient();

export async function getCta(locale) {
    const {data: response} = await client.query(BannersQuery, {
        lang: locale,
        type: 'footer_banner',
        limit: 1,
    });

    return response.banners;
}
