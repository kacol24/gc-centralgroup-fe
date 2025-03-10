'use client'

import {useMemo} from "react";
import {cacheExchange, createClient, fetchExchange, ssrExchange, UrqlProvider} from "@urql/next";
import {devtoolsExchange} from "@urql/devtools";

export default function GraphqlProvider({children, token}) {
    const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange({
            isClient: typeof window !== 'undefined',
        });
        const client = createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_API,
            exchanges: [devtoolsExchange, cacheExchange, ssr, fetchExchange],
            suspense: true,
            fetchOptions: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
        });

        return [client, ssr];
    }, []);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            {children}
        </UrqlProvider>
    );
}
