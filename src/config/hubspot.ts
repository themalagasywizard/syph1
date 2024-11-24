import axios from 'axios';
import queryString from 'query-string';

export const HUBSPOT_CONFIG = {
  clientId: import.meta.env.VITE_HUBSPOT_CLIENT_ID,
  clientSecret: import.meta.env.VITE_HUBSPOT_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_HUBSPOT_REDIRECT_URI,
  scopes: [
    'contacts',
    'crm.objects.contacts.read',
    'crm.objects.contacts.write',
    'crm.objects.companies.read',
    'crm.schemas.contacts.read',
    'crm.schemas.companies.read'
  ],
  authUrl: 'https://app.hubspot.com/oauth/authorize',
  tokenUrl: '/hubspot-auth/token'
};

export async function exchangeCodeForTokens(code: string) {
  const params = queryString.stringify({
    grant_type: 'authorization_code',
    client_id: HUBSPOT_CONFIG.clientId,
    client_secret: HUBSPOT_CONFIG.clientSecret,
    redirect_uri: HUBSPOT_CONFIG.redirectUri,
    code: code
  });

  try {
    const response = await axios.post(HUBSPOT_CONFIG.tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
}

export function getAuthUrl() {
  const params = queryString.stringify({
    client_id: HUBSPOT_CONFIG.clientId,
    redirect_uri: HUBSPOT_CONFIG.redirectUri,
    scope: HUBSPOT_CONFIG.scopes.join(' '),
    response_type: 'code'
  });

  return `${HUBSPOT_CONFIG.authUrl}?${params}`;
}