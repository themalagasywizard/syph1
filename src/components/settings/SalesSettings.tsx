import { useState } from 'react';
import { Card, Title } from '@tremor/react';

const salesMethodologies = [
  { id: 'spin', name: 'SPIN Selling' },
  { id: 'meddic', name: 'MEDDIC' },
  { id: 'challenger', name: 'Challenger Sale' },
  { id: 'sandler', name: 'Sandler Selling System' }
];

const coachingIntensities = [
  { id: 'detailed', name: 'Detailed (Frequent feedback)' },
  { id: 'balanced', name: 'Balanced (Regular checkpoints)' },
  { id: 'minimal', name: 'Minimal (Key moments only)' }
];

export default function SalesSettings() {
  const [settings, setSettings] = useState({
    salesMethodology: 'spin',
    monthlyCallGoal: 200,
    monthlyRevenueGoal: 100000,
    coachingIntensity: 'balanced',
    tipFrequency: 'daily',
    enableAICoaching: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
  };

  return (
    <div className="space-y-6">
      <Card>
        <Title>Sales Methodology</Title>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Select Your Primary Sales Framework
          </label>
          <select
            value={settings.salesMethodology}
            onChange={(e) => setSettings({ ...settings, salesMethodology: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            {salesMethodologies.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            This will customize your coaching experience and sales scripts
          </p>
        </div>
      </Card>

      <Card>
        <Title>Goals & Targets</Title>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Call Goal
            </label>
            <input
              type="number"
              value={settings.monthlyCallGoal}
              onChange={(e) => setSettings({ ...settings, monthlyCallGoal: parseInt(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Revenue Goal ($)
            </label>
            <input
              type="number"
              value={settings.monthlyRevenueGoal}
              onChange={(e) => setSettings({ ...settings, monthlyRevenueGoal: parseInt(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </Card>

      <Card>
        <Title>AI Coaching Preferences</Title>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coaching Intensity
            </label>
            <select
              value={settings.coachingIntensity}
              onChange={(e) => setSettings({ ...settings, coachingIntensity: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {coachingIntensities.map((intensity) => (
                <option key={intensity.id} value={intensity.id}>
                  {intensity.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tip Frequency
            </label>
            <select
              value={settings.tipFrequency}
              onChange={(e) => setSettings({ ...settings, tipFrequency: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableAICoaching}
                  onChange={(e) => setSettings({ ...settings, enableAICoaching: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Enable AI Coaching</span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Get real-time feedback and suggestions during calls
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}