import {cacheExchange, createClient, fetchExchange} from '@urql/next';
import {registerUrql} from '@urql/next/rsc';
import {devtoolsExchange} from '@urql/devtools';

export const fetchToken = async () => {
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
    })
  });

  if (!response.ok) {
    console.log(response);
    
    throw new Error('oauth error, failed to fetch access_token.');
  }

  const data = await response.json();

  return data.access_token;
};

export const {getClient} = registerUrql(async () => {
  const token = await fetchToken();

  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_API,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    exchanges: [devtoolsExchange, cacheExchange, fetchExchange]
  });
});
