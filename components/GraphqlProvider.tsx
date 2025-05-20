'use client'

import {useMemo} from "react";
import {cacheExchange, createClient, fetchExchange, ssrExchange, UrqlProvider} from "@urql/next";
import {devtoolsExchange} from "@urql/devtools";
import {authExchange} from "@urql/exchange-auth";
import {fetchToken} from "@/app/lib/urqlClient";

export default function GraphqlProvider({children, token}) {
    const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange({
            isClient: typeof window !== 'undefined',
        });
        let accessToken = token;

        const client = createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_API,
            exchanges: [
                devtoolsExchange,
                cacheExchange,
                ssr,
                authExchange(async utils => {
                    return {
                        addAuthToOperation(operation) {
                            return utils.appendHeaders(operation, {
                                Authorization: `Bearer ${accessToken}`
                            });
                        },
                        didAuthError(error, _operation) {
                            return error.response?.status === 401;
                        },
                        async refreshAuth() {
                            accessToken = await fetchToken();
                        },
                    };
                }),
                fetchExchange
            ],
            suspense: true,
        });

        return [client, ssr];
    }, [token]);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            {children}
        </UrqlProvider>
    );
}
