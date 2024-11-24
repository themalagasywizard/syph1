import { useState } from 'react';
import { Card, Title } from '@tremor/react';

export default function PrivacySettings() {
  const [settings, setSettings] = useState({
    dataSharing: {
      shareWithTeam: true,
      shareWithManagers: true,
      shareAnonymousData: false
    },
    dataRetention: {
      callRecordings: '90',
      activityLogs: '180',
      performanceData: '365'
    },
    compliance: {
      gdprEnabled: true,
      hipaaEnabled: false,
      ccpaEnabled: true
    },
    recordingDisclaimer: {
      enabled: true,
      message: "This call may be recorded for quality and training purposes."
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
  };

  return (
    <div className="space-y-6">
      <Card>
        <Title>Data Sharing</Title>
        <div className="mt-6 space-y-4">
          {Object.entries(settings.dataSharing).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    dataSharing: {
                      ...settings.dataSharing,
                      [key]: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </span>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Title>Data Retention</Title>
        <div className="mt-6 space-y-4">
          {Object.entries(settings.dataRetention).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {key.split(/(?=[A-Z])/).join(' ')} (days)
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setSettings({
                  ...settings,
                  dataRetention: {
                    ...settings.dataRetention,
                    [key]: e.target.value
                  }
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Title>Compliance Settings</Title>
        <div className="mt-6 space-y-4">
          {Object.entries(settings.compliance).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    compliance: {
                      ...settings.compliance,
                      [key]: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {key.toUpperCase()} Compliance
                </span>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Title>Recording Disclaimer</Title>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.recordingDisclaimer.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  recordingDisclaimer: {
                    ...settings.recordingDisclaimer,
                    enabled: e.target.checked
                  }
                })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">
                Enable Recording Disclaimer
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Disclaimer Message
            </label>
            <textarea
              value={settings.recordingDisclaimer.message}
              onChange={(e) => setSettings({
                ...settings,
                recordingDisclaimer: {
                  ...settings.recordingDisclaimer,
                  message: e.target.value
                }
              })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}