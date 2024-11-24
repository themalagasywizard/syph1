import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import { exchangeCodeForTokens } from '../config/hubspot';
import queryString from 'query-string';

export default function HubspotCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { updateUserHubspotTokens } = useDatabase();

  useEffect(() => {
    const handleCallback = async () => {
      const parsed = queryString.parse(window.location.search);
      const code = parsed.code as string;
      const error = parsed.error as string;
      
      if (error) {
        setError(`HubSpot authorization failed: ${error}`);
        return;
      }

      if (!code) {
        setError('No authorization code received');
        return;
      }

      try {
        // Exchange the code for tokens
        const tokens = await exchangeCodeForTokens(code);
        
        // Save tokens to user's profile
        await updateUserHubspotTokens({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: Date.now() + (tokens.expires_in * 1000)
        });

        // Redirect to contacts page
        navigate('/contacts');
      } catch (err) {
        console.error('Error handling HubSpot callback:', err);
        setError('Failed to complete HubSpot integration');
      }
    };

    handleCallback();
  }, [navigate, updateUserHubspotTokens]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Integration Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connecting to HubSpot</h2>
          <p className="text-gray-600">Please wait while we complete the integration...</p>
        </div>
      </div>
    </div>
  );
}