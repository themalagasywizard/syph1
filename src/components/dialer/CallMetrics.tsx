import { Card, Title, ProgressBar } from '@tremor/react';

const mockMetrics = {
  today: {
    calls: 45,
    connected: 28,
    voicemail: 12,
    noAnswer: 5,
    avgDuration: '3:45',
    conversionRate: 22
  },
  targets: {
    daily: 50,
    connected: 35
  }
};

export default function CallMetrics() {
  return (
    <div className="h-1/2 p-4 border-t">
      <Title>Today's Performance</Title>
      
      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Calls Made</span>
            <span className="font-medium">{mockMetrics.today.calls}/{mockMetrics.targets.daily}</span>
          </div>
          <ProgressBar value={(mockMetrics.today.calls / mockMetrics.targets.daily) * 100} color="blue" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Connected Rate</span>
            <span className="font-medium">{Math.round((mockMetrics.today.connected / mockMetrics.today.calls) * 100)}%</span>
          </div>
          <ProgressBar value={(mockMetrics.today.connected / mockMetrics.today.calls) * 100} color="green" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Avg Duration</p>
            <p className="text-lg font-semibold">{mockMetrics.today.avgDuration}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Conversion Rate</p>
            <p className="text-lg font-semibold">{mockMetrics.today.conversionRate}%</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Call Outcomes</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Connected</span>
              <span>{mockMetrics.today.connected}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Voicemail</span>
              <span>{mockMetrics.today.voicemail}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>No Answer</span>
              <span>{mockMetrics.today.noAnswer}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}