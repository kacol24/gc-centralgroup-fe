import {getClient} from "@/app/lib/urqlClient";
import BannersQuery from "@/graphql/BannersQuery.graphql";

export interface Banner {
    cta: string
    desktop: string
    id: number
    mobile: string
    title: string
    url: string
}

export async function getCta(locale): Promise<Banner[]> {
    const client = await getClient();

    const {data: response} = await client.query(BannersQuery, {
        lang: locale,
        type: 'footer_banner',
        limit: 1,
    });

    return response.banners;
}

export async function getPopup(locale): Promise<Banner[]> {
    const client = await getClient();

    const {data: response} = await client.query(BannersQuery, {
        lang: locale,
        type: 'popup_banner',
        limit: 1,
    });

    return response.banners;
}
