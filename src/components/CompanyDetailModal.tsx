import { Dialog } from '@headlessui/react';
import { BuildingOfficeIcon, NewspaperIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import type { CompanyData } from '../types';

interface CompanyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  companyData: CompanyData;
}

export default function CompanyDetailModal({ isOpen, onClose, company, companyData }: CompanyDetailModalProps) {
  if (!companyData) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl rounded-xl bg-white p-6 w-full max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold mb-4 flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-blue-500 mr-3" />
            {companyData.name}
          </Dialog.Title>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Company Overview */}
            <div className="col-span-2 space-y-6">
              {/* Company Overview */}
              <section>
                <h3 className="text-lg font-semibold mb-3">Company Overview</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Industry:</span> {companyData.industry}</p>
                  <p><span className="font-medium">Revenue:</span> {companyData.revenue}</p>
                  <p><span className="font-medium">Employees:</span> {companyData.employees}</p>
                  <p><span className="font-medium">Founded:</span> {companyData.founded}</p>
                  <p><span className="font-medium">Website:</span> <a href={companyData.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{companyData.website}</a></p>
                  <p className="mt-4">{companyData.description}</p>
                </div>
              </section>

              {/* Decision Makers */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <UserGroupIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Key Decision Makers
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {companyData.decisionMakers.map((person, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.title}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><span className="font-medium">Department:</span> {person.department}</p>
                        <p><span className="font-medium">Influence Level:</span> {person.influenceLevel}</p>
                        <a href={person.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Opportunities */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Opportunities History
                </h3>
                <div className="space-y-4">
                  {companyData.opportunities.map((opp, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{opp.name}</p>
                          <p className="text-sm text-gray-600">Value: {opp.value}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          opp.status === 'Won' ? 'bg-green-100 text-green-800' :
                          opp.status === 'Lost' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {opp.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Created: {opp.createdDate}</p>
                        <p>Closed: {opp.closedDate || 'In Progress'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - News Feed */}
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <NewspaperIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Latest News
                </h3>
                <div className="space-y-4">
                  {companyData.news.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-100 transition-colors rounded">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                        )}
                        <h4 className="font-medium text-blue-600 hover:underline">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                        <p className="text-xs text-gray-500 mt-2">{item.source} • {item.date}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Previous Contacts */}
              <section>
                <h3 className="text-lg font-semibold mb-3">Previous Contacts</h3>
                <div className="space-y-3">
                  {companyData.previousContacts.map((contact, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{contact.type}</p>
                      <p className="text-sm text-gray-600">{contact.date}</p>
                      <p className="text-sm mt-1">{contact.summary}</p>
                      <p className="text-xs text-gray-500 mt-1">by {contact.by}</p>
                    </div>
                  ))}
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