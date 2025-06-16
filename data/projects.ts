import {getClient} from "@/app/lib/urqlClient";
import ProjectsQuery from "@/graphql/ProjectsQuery.graphql";

export async function getProjects(locale) {
    const client = await getClient();

    const {data: response} = await client.query(ProjectsQuery, {
        lang: locale,
    });

    return response.projects;
}
