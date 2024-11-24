import { Dialog } from '@headlessui/react';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Contact, CallLog } from '../contexts/DialerContext';

interface ProspectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: Contact;
}

interface Interaction extends CallLog {
  summary?: string;
}

export default function ProspectDetailModal({ isOpen, onClose, prospect }: ProspectDetailModalProps) {
  if (!prospect?.insights) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl rounded-xl bg-white p-6 w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold flex items-center">
                <UserIcon className="h-8 w-8 text-blue-500 mr-3" />
                {prospect.name}
              </Dialog.Title>
              <p className="text-gray-600 mt-1">{prospect.title}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              prospect.engagement.status === 'Highly Engaged' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {prospect.engagement.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Personal Info & Engagement */}
            <div className="space-y-6">
              {/* Contact Information */}
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <a href={`mailto:${prospect.email}`} className="text-blue-600 hover:underline">
                      {prospect.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{prospect.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{prospect.personalInfo.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{prospect.personalInfo.preferredContactTime}</span>
                  </div>
                </div>
              </section>

              {/* Engagement Preferences */}
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Engagement Preferences</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Preferred Channel:</span> {prospect.engagement.preferredChannel}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Meeting Preference:</span> {prospect.engagement.meetingPreference}
                  </p>
                  <div className="mt-3">
                    <p className="font-medium text-sm mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {prospect.engagement.interests.map((interest: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Center Column - History & Deals */}
            <div className="space-y-6">
              {/* Interaction History */}
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Recent Interactions</h3>
                <div className="space-y-3">
                  {(prospect.history.interactions as Interaction[]).map((interaction, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-3">
                      <p className="text-sm font-medium">{interaction.type}</p>
                      <p className="text-xs text-gray-500">{interaction.date}</p>
                      {interaction.summary && <p className="text-sm mt-1">{interaction.summary}</p>}
                      <p className="text-xs text-gray-600 mt-1">Next: {interaction.nextSteps}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Deals */}
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Active Deals</h3>
                <div className="space-y-3">
                  {prospect.history.deals.map((deal, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{deal.name}</p>
                          <p className="text-sm text-blue-600">{deal.value}</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {deal.probability}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Status: {deal.status}</p>
                        <p>Expected Close: {deal.expectedClose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Insights & Activity */}
            <div className="space-y-6">
              {/* Key Insights */}
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <SparklesIcon className="h-5 w-5 text-purple-500 mr-2" />
                  Key Insights
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Decision Making</p>
                    <p className="text-sm text-gray-600">{prospect.insights.decisionMakingRole}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Budget Authority</p>
                    <p className="text-sm text-gray-600">{prospect.insights.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pain Points</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {prospect.insights.painPoints.map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Website Visits</p>
                    {prospect.recentActivity.websiteVisits.map((visit: any, index: number) => (
                      <div key={index} className="text-sm text-gray-600">
                        <p>{visit.page}</p>
                        <p className="text-xs text-gray-500">{visit.date} • {visit.duration}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email Engagement</p>
                    <p className="text-sm text-gray-600">
                      Open Rate: {prospect.recentActivity.emailEngagement.openRate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Click Rate: {prospect.recentActivity.emailEngagement.clickRate}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}