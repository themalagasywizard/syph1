import { useState } from 'react';
import { Card, Title } from '@tremor/react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: {
      newLeads: true,
      callReminders: true,
      taskDue: true,
      teamUpdates: false,
      performanceReports: true
    },
    pushNotifications: {
      incomingCalls: true,
      missedCalls: true,
      newMessages: true,
      dealUpdates: true
    },
    notificationSchedule: {
      startTime: '09:00',
      endTime: '17:00',
      timezone: 'EST',
      workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
  };

  return (
    <div className="space-y-6">
      <Card>
        <Title>Email Notifications</Title>
        <div className="mt-6 space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailNotifications: {
                      ...settings.emailNotifications,
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
        <Title>Push Notifications</Title>
        <div className="mt-6 space-y-4">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    pushNotifications: {
                      ...settings.pushNotifications,
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
        <Title>Notification Schedule</Title>
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                value={settings.notificationSchedule.startTime}
                onChange={(e) => setSettings({
                  ...settings,
                  notificationSchedule: {
                    ...settings.notificationSchedule,
                    startTime: e.target.value
                  }
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                value={settings.notificationSchedule.endTime}
                onChange={(e) => setSettings({
                  ...settings,
                  notificationSchedule: {
                    ...settings.notificationSchedule,
                    endTime: e.target.value
                  }
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select
              value={settings.notificationSchedule.timezone}
              onChange={(e) => setSettings({
                ...settings,
                notificationSchedule: {
                  ...settings.notificationSchedule,
                  timezone: e.target.value
                }
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="EST">Eastern Time (EST)</option>
              <option value="CST">Central Time (CST)</option>
              <option value="MST">Mountain Time (MST)</option>
              <option value="PST">Pacific Time (PST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Days
            </label>
            <div className="space-y-2">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationSchedule.workDays.includes(day)}
                    onChange={(e) => {
                      const workDays = e.target.checked
                        ? [...settings.notificationSchedule.workDays, day]
                        : settings.notificationSchedule.workDays.filter(d => d !== day);
                      setSettings({
                        ...settings,
                        notificationSchedule: {
                          ...settings.notificationSchedule,
                          workDays
                        }
                      });
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 capitalize">
                    {day}
                  </span>
                </label>
              ))}
            </div>
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