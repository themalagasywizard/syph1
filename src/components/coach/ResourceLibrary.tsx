import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import {
  BookOpenIcon, VideoCameraIcon, DocumentTextIcon,
  AcademicCapIcon, PlayIcon, ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const resources = [
  {
    category: 'Sales Methodologies',
    items: [
      {
        title: 'SPIN Selling Framework',
        type: 'guide',
        duration: '15 min read',
        icon: DocumentTextIcon
      },
      {
        title: 'Challenger Sale Methodology',
        type: 'video',
        duration: '12 min watch',
        icon: VideoCameraIcon
      },
      {
        title: 'MEDDIC Sales Process',
        type: 'guide',
        duration: '20 min read',
        icon: DocumentTextIcon
      }
    ]
  },
  {
    category: 'Best Practices',
    items: [
      {
        title: 'Effective Discovery Calls',
        type: 'video',
        duration: '18 min watch',
        icon: VideoCameraIcon
      },
      {
        title: 'Objection Handling Guide',
        type: 'guide',
        duration: '25 min read',
        icon: DocumentTextIcon
      },
      {
        title: 'Building Rapport Remotely',
        type: 'video',
        duration: '15 min watch',
        icon: VideoCameraIcon
      }
    ]
  },
  {
    category: 'Industry Knowledge',
    items: [
      {
        title: 'Enterprise Software Market Trends',
        type: 'guide',
        duration: '30 min read',
        icon: DocumentTextIcon
      },
      {
        title: 'Cloud Migration Strategies',
        type: 'video',
        duration: '22 min watch',
        icon: VideoCameraIcon
      },
      {
        title: 'Security Compliance Overview',
        type: 'guide',
        duration: '25 min read',
        icon: DocumentTextIcon
      }
    ]
  }
];

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('Sales Methodologies');

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Left Sidebar - Categories */}
      <div className="space-y-2">
        {resources.map((resource) => (
          <button
            key={resource.category}
            onClick={() => setSelectedCategory(resource.category)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === resource.category
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50'
            }`}
          >
            {resource.category}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="col-span-3">
        <Card>
          <Title>{selectedCategory}</Title>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {resources
              .find(r => r.category === selectedCategory)
              ?.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <item.icon className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.duration}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      {item.type === 'video' ? (
                        <PlayIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      item.type === 'video'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.type}
                    </span>
                    <button className="text-blue-600 hover:underline">
                      {item.type === 'video' ? 'Watch Now' : 'Download'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}