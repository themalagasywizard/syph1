import { useState } from 'react';
import { Card, Title } from '@tremor/react';

export default function DialerSettings() {
  const [settings, setSettings] = useState({
    defaultDialMode: 'manual',
    enableAutoDialer: true,
    pauseBetweenCalls: 30,
    enableCallRecording: true,
    recordingDisclaimer: true,
    defaultEmailSignature: '',
    enableSMS: true,
    defaultSMSTemplate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
  };

  return (
    <div className="space-y-6">
      <Card>
        <Title>Call Settings</Title>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Dialing Mode
            </label>
            <select
              value={settings.defaultDialMode}
              onChange={(e) => setSettings({ ...settings, defaultDialMode: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="manual">Manual Dialing</option>
              <option value="auto">Auto Dialer</option>
              <option value="predictive">Predictive Dialing</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableAutoDialer}
                  onChange={(e) => setSettings({ ...settings, enableAutoDialer: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Enable Auto Dialer</span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Automatically dial next number in queue
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pause Between Calls (seconds)
            </label>
            <input
              type="number"
              value={settings.pauseBetweenCalls}
              onChange={(e) => setSettings({ ...settings, pauseBetweenCalls: parseInt(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </Card>

      <Card>
        <Title>Recording Settings</Title>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableCallRecording}
                  onChange={(e) => setSettings({ ...settings, enableCallRecording: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Enable Call Recording</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.recordingDisclaimer}
                  onChange={(e) => setSettings({ ...settings, recordingDisclaimer: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Play Recording Disclaimer</span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Automatically play disclaimer before recording starts
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Title>Email & SMS Settings</Title>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Email Signature
            </label>
            <textarea
              value={settings.defaultEmailSignature}
              onChange={(e) => setSettings({ ...settings, defaultEmailSignature: e.target.value })}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter your email signature..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableSMS}
                  onChange={(e) => setSettings({ ...settings, enableSMS: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Enable SMS Messaging</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default SMS Template
            </label>
            <textarea
              value={settings.defaultSMSTemplate}
              onChange={(e) => setSettings({ ...settings, defaultSMSTemplate: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter default SMS template..."
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