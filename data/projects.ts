import {getClient} from "@/app/lib/urqlClient";
import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";

const client = await getClient();

export async function getProjects(locale, limit = 6) {
    const {data: response} = await client.query(ProjectsQuery, {
        lang: locale,
        limit
    });

    return response.projects;
}
