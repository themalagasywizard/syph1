import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import { useHubspot } from '../../contexts/HubspotContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  CloudIcon
} from '@heroicons/react/24/solid';

export default function IntegrationSettings() {
  const { isConnected, connect, disconnect, error, loading } = useHubspot();
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);
      await disconnect();
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <CloudIcon className="h-6 w-6 text-blue-500" />
            <div>
              <Title>CRM Integration</Title>
              <p className="text-sm text-gray-500">Connect your HubSpot CRM to sync contacts and companies</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed.png" 
                alt="HubSpot"
                className="h-8"
              />
              <div>
                <h3 className="font-medium text-gray-900">HubSpot CRM</h3>
                <p className="text-sm text-gray-500">
                  {isConnected ? 'Connected and syncing data' : 'Not connected'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  <span>Checking connection...</span>
                </div>
              ) : isConnected ? (
                <>
                  <span className="flex items-center text-green-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Connected
                  </span>
                  <button
                    onClick={handleDisconnect}
                    disabled={disconnecting}
                    className={`px-4 py-2 rounded-lg ${
                      disconnecting 
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    } transition-colors`}
                  >
                    {disconnecting ? 'Disconnecting...' : 'Disconnect'}
                  </button>
                </>
              ) : (
                <button
                  onClick={connect}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <CloudIcon className="h-5 w-5" />
                  <span>Connect HubSpot</span>
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Connection Error</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={connect}
                className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
              >
                Try reconnecting
              </button>
            </div>
          )}

          {isConnected && (
            <div className="mt-6 border-t pt-6">
              <h4 className="font-medium mb-4">Sync Status</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium">Contacts</p>
                  <div className="flex items-center mt-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Syncing</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium">Companies</p>
                  <div className="flex items-center mt-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Syncing</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm font-medium">Deals</p>
                  <div className="flex items-center mt-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Syncing</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}