import { useState } from 'react';
import { PhoneIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Card, Title } from '@tremor/react';

const mockQueue = [
  {
    name: "John Smith",
    company: "Tech Solutions Inc.",
    priority: "high",
    bestTimeToCall: "10:00 AM",
    lastContact: "3 days ago",
    tags: ["Hot Lead", "Enterprise"],
  },
  {
    name: "Sarah Johnson",
    company: "Global Systems",
    priority: "medium",
    bestTimeToCall: "2:00 PM",
    lastContact: "1 week ago",
    tags: ["Follow-up", "SMB"],
  },
  // Add more mock data as needed
];

export default function CallQueue() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="h-1/2 overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <Title>Call Queue</Title>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('priority')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'priority' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
            }`}
          >
            Priority
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockQueue.map((contact, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.company}</p>
              </div>
              {contact.priority === 'high' && (
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              Best time: {contact.bestTimeToCall}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}