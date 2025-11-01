import { NextRequest, NextResponse } from 'next/server';

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
  const tokenRequestId = Math.random().toString(36).substr(2, 9);

  // Check if we have a valid cached token
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log(
      `[TOKEN-${tokenRequestId}] Using cached token, expires in ${Math.round((tokenExpiry - Date.now()) / 1000)}s`,
    );
    return cachedToken;
  }

  console.log(`[TOKEN-${tokenRequestId}] Requesting new access token from: ${OAUTH_CONFIG.tokenUrl}`);

  try {
    const tokenPayload = {
      grant_type: 'client_credentials',
      client_id: OAUTH_CONFIG.clientId,
      client_secret: OAUTH_CONFIG.clientSecret,
      scope: '*',
    };

    console.log(`[TOKEN-${tokenRequestId}] Token request payload:`, {
      ...tokenPayload,
      client_secret: '***',
    });

    const response = await fetch(OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenPayload),
    });

    console.log(`[TOKEN-${tokenRequestId}] Token response status: ${response.status} ${response.statusText}`);
    console.log(`[TOKEN-${tokenRequestId}] Token response headers:`, Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log(`[TOKEN-${tokenRequestId}] Raw token response:`, responseText);

    if (!response.ok) {
      console.log(`[TOKEN-${tokenRequestId}] OAuth request failed with status: ${response.status}`);
      throw new Error(`OAuth error: ${response.status} ${response.statusText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.log(`[TOKEN-${tokenRequestId}] Failed to parse token JSON response:`, parseError);
      throw new Error('Invalid JSON response from OAuth endpoint');
    }

    console.log(`[TOKEN-${tokenRequestId}] Parsed token response:`, {
      ...data,
      access_token: data.access_token ? `${data.access_token.substring(0, 10)}...` : 'undefined',
    });

    if (!data.access_token) {
      console.log(`[TOKEN-${tokenRequestId}] No access token in response`);
      throw new Error('No access token received from OAuth endpoint');
    }

    // Cache the token (assuming 1 hour expiry, adjust as needed)
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in ? data.expires_in * 1000 : 3600000); // Default 1 hour

    console.log(`[TOKEN-${tokenRequestId}] Token cached successfully, expires in ${data.expires_in || 3600}s`);

    return data.access_token;
  } catch (error) {
    console.error(`[TOKEN-${tokenRequestId}] Failed to get access token:`, error);
    console.error(`[TOKEN-${tokenRequestId}] Error stack:`, error instanceof Error ? error.stack : 'No stack trace');
    throw new Error('Authentication failed');
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);

  try {
    const { otp, email } = await request.json();

    console.log(`[OTP-VERIFY-${requestId}] Starting OTP verification for email: ${email}, OTP: ${otp}`);
    console.log(`[OTP-VERIFY-${requestId}] Timestamp: ${new Date().toISOString()}`);

    if (!otp || !email) {
      console.log(`[OTP-VERIFY-${requestId}] Error: OTP and email are required`);
      return NextResponse.json({ error: 'OTP and email are required' }, { status: 400 });
    }

    // Get access token
    console.log(`[OTP-VERIFY-${requestId}] Getting access token...`);
    const token = await getAccessToken();
    console.log(`[OTP-VERIFY-${requestId}] Access token obtained successfully`);

    // Prepare GraphQL request
    const graphqlPayload = {
      query: `
        mutation VerifyOtp($otp: String!, $email: String!) {
          verifyOtp(otp: $otp, email: $email) {
            status
            message
          }
        }
      `,
      variables: { otp, email },
    };

    console.log(`[OTP-VERIFY-${requestId}] Making GraphQL request to: ${OAUTH_CONFIG.graphqlUrl}`);
    console.log(`[OTP-VERIFY-${requestId}] GraphQL payload:`, JSON.stringify(graphqlPayload, null, 2));

    // Make GraphQL request to verify OTP
    const graphqlResponse = await fetch(OAUTH_CONFIG.graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(graphqlPayload),
    });

    console.log(
      `[OTP-VERIFY-${requestId}] GraphQL response status: ${graphqlResponse.status} ${graphqlResponse.statusText}`,
    );
    console.log(
      `[OTP-VERIFY-${requestId}] GraphQL response headers:`,
      Object.fromEntries(graphqlResponse.headers.entries()),
    );

    const responseText = await graphqlResponse.text();
    console.log(`[OTP-VERIFY-${requestId}] Raw GraphQL response:`, responseText);

    if (!graphqlResponse.ok) {
      console.log(`[OTP-VERIFY-${requestId}] GraphQL request failed with status: ${graphqlResponse.status}`);
      throw new Error(`GraphQL request failed: ${graphqlResponse.status} ${graphqlResponse.statusText}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.log(`[OTP-VERIFY-${requestId}] Failed to parse JSON response:`, parseError);
      throw new Error('Invalid JSON response from GraphQL endpoint');
    }

    console.log(`[OTP-VERIFY-${requestId}] Parsed GraphQL result:`, JSON.stringify(result, null, 2));

    if (result.errors) {
      console.log(`[OTP-VERIFY-${requestId}] GraphQL errors detected:`, JSON.stringify(result.errors, null, 2));
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    if (!result.data || !result.data.verifyOtp) {
      console.log(`[OTP-VERIFY-${requestId}] Missing expected data in response`);
      throw new Error('Invalid response structure from GraphQL endpoint');
    }

    const duration = Date.now() - startTime;
    console.log(`[OTP-VERIFY-${requestId}] Request completed successfully in ${duration}ms`);
    console.log(`[OTP-VERIFY-${requestId}] Final result:`, JSON.stringify(result.data, null, 2));

    return NextResponse.json(result.data);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[OTP-VERIFY-${requestId}] Error after ${duration}ms:`, error);
    console.error(`[OTP-VERIFY-${requestId}] Error stack:`, error instanceof Error ? error.stack : 'No stack trace');

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to verify OTP',
        requestId,
        timestamp: new Date().toISOString(),
        duration: `${duration}ms`,
      },
      { status: 500 },
    );
  }
}
