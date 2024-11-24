import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import { UserGroupIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import type { NearbyClients, NearbyClient } from '../../types';

interface NearbyClientsWidgetProps {
  location: string;
}

interface ClientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientData: NearbyClient;
}

function ClientDetailModal({ isOpen, onClose, clientName, clientData }: ClientDetailModalProps) {
  if (!isOpen || !clientData) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          <h2 className="text-xl font-bold mb-4">{clientName}</h2>
          
          <div className="space-y-6">
            {/* Key People */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Contacts</h3>
              <div className="grid grid-cols-2 gap-4">
                {clientData.keyPeople.map((person, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-gray-600">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relationship Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Relationship Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{clientData.relationship.yearsAsClient} years as client</span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Total Revenue: {clientData.relationship.totalRevenue}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const NEARBY_CLIENTS: NearbyClients = {
  "Acme Corp": {
    distance: "0.5 miles",
    relationship: {
      yearsAsClient: 3,
      totalRevenue: "$450,000",
      lastInteraction: "2023-12-01"
    },
    keyPeople: [
      { name: "Sarah Johnson", role: "CEO" },
      { name: "Mike Chen", role: "CTO" }
    ]
  },
  "Global Tech": {
    distance: "1.2 miles",
    relationship: {
      yearsAsClient: 2,
      totalRevenue: "$280,000",
      lastInteraction: "2023-11-28"
    },
    keyPeople: [
      { name: "David Miller", role: "COO" },
      { name: "Lisa Wong", role: "Head of IT" }
    ]
  },
  "Future Systems": {
    distance: "2.1 miles",
    relationship: {
      yearsAsClient: 1,
      totalRevenue: "$180,000",
      lastInteraction: "2023-12-05"
    },
    keyPeople: [
      { name: "Robert Taylor", role: "CIO" },
      { name: "Emma Davis", role: "VP Sales" }
    ]
  }
};

export default function NearbyClientsWidget({ location: _ }: NearbyClientsWidgetProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  return (
    <>
      <Card>
        <Title>Nearby Clients</Title>
        <div className="mt-4 space-y-3">
          {Object.entries(NEARBY_CLIENTS).map(([clientName, data], index) => (
            <button
              key={index}
              className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setSelectedClient(clientName)}
            >
              <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div className="text-left">
                <p className="font-medium">{clientName}</p>
                <p className="text-sm text-gray-500">
                  {data.distance} • {data.relationship.yearsAsClient} years • {data.relationship.totalRevenue} revenue
                </p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {selectedClient && (
        <ClientDetailModal
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          clientName={selectedClient}
          clientData={NEARBY_CLIENTS[selectedClient]}
        />
      )}
    </>
  );
}