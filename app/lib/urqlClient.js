import {cacheExchange, createClient, fetchExchange} from '@urql/next';
import {registerUrql} from '@urql/next/rsc';
import {devtoolsExchange} from '@urql/devtools';
import {cache} from 'react';
import {authExchange} from '@urql/exchange-auth';

export const fetchToken = cache(
    async () => {
      const response = await fetch(process.env.OAUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'grant_type': 'client_credentials',
          'client_id': process.env.OAUTH_CLIENT_ID,
          'client_secret': process.env.OAUTH_CLIENT_SECRET,
          'scope': '*'
        }),
        cache: 'force-cache'
      });

      if (!response.ok) {
        console.log(response);

        throw new Error('oauth error, failed to fetch access_token.');
      }

      const data = await response.json();

      return data.access_token;
    }
);

export const {getClient} = registerUrql(async () => {
  let token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_API,
    exchanges: [
      devtoolsExchange,
      cacheExchange,
      authExchange(async utils => {
        return {
          addAuthToOperation(operation) {
            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${token}`
            });
          },
          didAuthError(error) {
            return error.response?.status === 401;
          },
          async refreshAuth() {
            token = await fetchToken();
          },
        };
      }),
      fetchExchange
    ]
  });
});
