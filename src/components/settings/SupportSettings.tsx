import { Card, Title } from '@tremor/react';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const resources = [
  {
    title: 'Knowledge Base',
    description: 'Find answers to common questions and learn how to use features',
    icon: DocumentTextIcon,
    action: 'Browse Articles'
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step guides and feature demonstrations',
    icon: AcademicCapIcon,
    action: 'Watch Videos'
  },
  {
    title: 'Live Chat Support',
    description: 'Chat with our support team for immediate assistance',
    icon: ChatBubbleLeftRightIcon,
    action: 'Start Chat'
  },
  {
    title: 'FAQs',
    description: 'Quick answers to frequently asked questions',
    icon: QuestionMarkCircleIcon,
    action: 'View FAQs'
  }
];

export default function SupportSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <Title>Help & Support</Title>
        <div className="mt-6 grid grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <resource.icon className="h-6 w-6 text-blue-500" />
                <h3 className="font-medium">{resource.title}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {resource.description}
              </p>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-700">
                {resource.action} →
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Title>Contact Support</Title>
        <div className="mt-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="What do you need help with?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Please describe your issue in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </Card>

      <Card>
        <Title>System Status</Title>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Dialer System</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">AI Coaching</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">CRM Integration</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </Card>
    </div>
  );
}