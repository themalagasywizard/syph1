import { useState } from 'react';
import { Card } from '@tremor/react';
import { useHubspot } from '../contexts/HubspotContext';

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState('user');
  const { error } = useHubspot();

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">HubSpot Integration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Connection Status</p>
              <p className="text-sm text-gray-500">
                Connected to HubSpot using Private App Token
              </p>
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
              Connected
            </div>
          </div>
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </Card>
      
      {/* Rest of your settings components */}
    </div>
  );
}