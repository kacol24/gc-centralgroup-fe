import { NextResponse } from 'next/server';

// OAuth configuration using server-side environment variables
const OAUTH_CONFIG = {
  tokenUrl: process.env.OAUTH_URL!,
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_API!,
};

// OAuth token management
let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch(OAUTH_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: OAUTH_CONFIG.clientId,
      client_secret: OAUTH_CONFIG.clientSecret,
      scope: '*',
    }),
  });

  if (!response.ok) {
    throw new Error(`OAuth error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error('No access token received from OAuth endpoint');
  }

  // Cache the token
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in ? data.expires_in * 1000 : 3600000);

  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    // Test with GET_RAFFLES query to check schema
    const graphqlResponse = await fetch(OAUTH_CONFIG.graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query GET_RAFFLES {
            raffles {
              id
              title
              content
              startDate
              endDate
            }
          }
        `,
      }),
    });

    const result = await graphqlResponse.json();

    return NextResponse.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get raffles' },
      { status: 500 },
    );
  }
}
