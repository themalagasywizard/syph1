import { useState } from 'react';
import { Card, Title, BarChart, DonutChart, ProgressBar } from '@tremor/react';
import {
  PhoneIcon, EnvelopeIcon, CalendarIcon, ChartBarIcon,
  ArrowTrendingUpIcon, CheckCircleIcon, XCircleIcon,
  UserGroupIcon, BuildingOfficeIcon, ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

// Mock data for the dashboard
const dailyTasks = [
  { type: 'call', title: 'Follow up with John from Tech Corp', time: '10:00 AM', status: 'pending' },
  { type: 'email', title: 'Send proposal to Sarah at InnoSys', time: '11:30 AM', status: 'completed' },
  { type: 'meeting', title: 'Product demo with GlobalTech team', time: '2:00 PM', status: 'pending' },
  { type: 'call', title: 'Discovery call with NewCo Solutions', time: '4:00 PM', status: 'pending' },
];

const pipelineData = [
  { stage: 'Lead', count: 45, value: '$675,000' },
  { stage: 'Qualified', count: 32, value: '$480,000' },
  { stage: 'Proposal', count: 18, value: '$270,000' },
  { stage: 'Negotiation', count: 8, value: '$120,000' },
  { stage: 'Closed Won', count: 12, value: '$180,000' },
];

const performanceMetrics = {
  daily: { target: 10, achieved: 7 },
  weekly: { target: 50, achieved: 38 },
  monthly: { target: 200, achieved: 165 },
  revenue: { current: 180000, target: 250000 }
};

const aiInsights = [
  "3 deals in your pipeline haven't been contacted in 7 days",
  "Tech Corp showing high engagement - consider scheduling a demo",
  "Follow up with leads from yesterday's webinar",
  "Best time to contact John Smith is between 2-4 PM based on past interactions"
];

const recentContacts = [
  {
    name: "Sarah Chen",
    company: "InnoSys",
    lastContact: "2 hours ago",
    status: "Proposal Sent",
    engagement: "High"
  },
  {
    name: "Michael Rodriguez",
    company: "GlobalTech",
    lastContact: "1 day ago",
    status: "Discovery",
    engagement: "Medium"
  },
  {
    name: "Emily Watson",
    company: "NewCo Solutions",
    lastContact: "3 days ago",
    status: "Negotiation",
    engagement: "Very High"
  }
];

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState('pipeline');

  return (
    <div className="space-y-6">
      {/* Performance Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card decoration="top" decorationColor="blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Daily Calls</p>
              <p className="text-2xl font-bold">{performanceMetrics.daily.achieved}/{performanceMetrics.daily.target}</p>
            </div>
            <PhoneIcon className="h-8 w-8 text-blue-500" />
          </div>
          <ProgressBar value={70} color="blue" className="mt-3" />
        </Card>

        <Card decoration="top" decorationColor="green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Weekly Progress</p>
              <p className="text-2xl font-bold">{performanceMetrics.weekly.achieved}/{performanceMetrics.weekly.target}</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-green-500" />
          </div>
          <ProgressBar value={76} color="green" className="mt-3" />
        </Card>

        <Card decoration="top" decorationColor="yellow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Target</p>
              <p className="text-2xl font-bold">${(performanceMetrics.revenue.current / 1000).toFixed(1)}k/${(performanceMetrics.revenue.target / 1000).toFixed(1)}k</p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <ProgressBar value={72} color="yellow" className="mt-3" />
        </Card>

        <Card decoration="top" decorationColor="purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold">32%</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-purple-500" />
          </div>
          <ProgressBar value={32} color="purple" className="mt-3" />
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Daily Tasks & AI Insights */}
        <div className="space-y-6">
          {/* Daily Tasks */}
          <Card>
            <Title>Today's Tasks</Title>
            <div className="mt-4 space-y-3">
              {dailyTasks.map((task, index) => (
                <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  {task.type === 'call' && <PhoneIcon className="h-5 w-5 text-blue-500 mr-3" />}
                  {task.type === 'email' && <EnvelopeIcon className="h-5 w-5 text-green-500 mr-3" />}
                  {task.type === 'meeting' && <CalendarIcon className="h-5 w-5 text-purple-500 mr-3" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card>
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-6 w-6 text-purple-500 mr-2" />
              <Title>AI Insights</Title>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-900">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center Column - Pipeline View */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <Title>Pipeline Overview</Title>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedView('pipeline')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedView === 'pipeline' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Pipeline
              </button>
              <button
                onClick={() => setSelectedView('conversion')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedView === 'conversion' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Conversion
              </button>
            </div>
          </div>

          {selectedView === 'pipeline' ? (
            <div className="space-y-4">
              {pipelineData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{stage.stage}</p>
                    <p className="text-sm text-gray-500">{stage.count} deals</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stage.value}</p>
                    <div className="w-32">
                      <ProgressBar value={(stage.count / 45) * 100} color="blue" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <DonutChart
              className="mt-6"
              data={pipelineData}
              category="count"
              index="stage"
              valueFormatter={(number) => `${number} deals`}
              colors={["blue", "cyan", "indigo", "violet", "purple"]}
            />
          )}
        </Card>
      </div>

      {/* Recent Contacts Section */}
      <Card>
        <Title>Recent Contacts</Title>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentContacts.map((contact, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.company}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contact.engagement === 'High' ? 'bg-green-100 text-green-800' :
                  contact.engagement === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {contact.engagement}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <p className="text-gray-600">Status: {contact.status}</p>
                <p className="text-gray-500">Last Contact: {contact.lastContact}</p>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <PhoneIcon className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200">
                  <EnvelopeIcon className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <CalendarIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}