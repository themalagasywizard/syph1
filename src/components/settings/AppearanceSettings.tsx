import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppearanceSettings() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    colorScheme: 'blue',
    compactMode: false,
    animationsEnabled: true,
    customBranding: {
      enabled: false,
      logo: '',
      primaryColor: '#3B82F6'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
  };

  return (
    <div className="space-y-6">
      <Card>
        <Title>Theme Settings</Title>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Dark Mode
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Enable dark mode for reduced eye strain
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color Scheme
            </label>
            <select
              value={settings.colorScheme}
              onChange={(e) => setSettings({ ...settings, colorScheme: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="green">Green</option>
              <option value="indigo">Indigo</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <Title>Display Settings</Title>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Font Size
            </label>
            <select
              value={settings.fontSize}
              onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Compact Mode
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Reduce spacing between elements
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.animationsEnabled}
                  onChange={(e) => setSettings({ ...settings, animationsEnabled: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enable Animations
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Show smooth transitions and animations
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Title>Custom Branding</Title>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.customBranding.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    customBranding: {
                      ...settings.customBranding,
                      enabled: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enable Custom Branding
                </span>
              </label>
            </div>
          </div>

          {settings.customBranding.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={settings.customBranding.logo}
                  onChange={(e) => setSettings({
                    ...settings,
                    customBranding: {
                      ...settings.customBranding,
                      logo: e.target.value
                    }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={settings.customBranding.primaryColor}
                  onChange={(e) => setSettings({
                    ...settings,
                    customBranding: {
                      ...settings.customBranding,
                      primaryColor: e.target.value
                    }
                  })}
                  className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm p-1"
                />
              </div>
            </>
          )}
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