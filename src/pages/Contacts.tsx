import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Title, TabGroup, TabList, Tab } from '@tremor/react';
import {
  PhoneIcon, EnvelopeIcon, BuildingOfficeIcon,
  ClockIcon, UserGroupIcon, ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import ProspectDetailModal from '../components/ProspectDetailModal';
import SearchBar from '../components/SearchBar';
import { useDialerContext } from '../contexts/DialerContext';
import { useHubspot } from '../contexts/HubspotContext';

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { startCall } = useDialerContext();
  const { contacts, loading, error, fetchContacts, isConnected, connect } = useHubspot();

  useEffect(() => {
    if (isConnected) {
      fetchContacts();
    }
  }, [isConnected, fetchContacts]);

  const handleCall = (contact: any) => {
    startCall(contact);
    navigate('/dialer');
  };

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    
    let filtered = contacts;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contact => {
        const fullName = `${contact.properties.firstname || ''} ${contact.properties.lastname || ''}`.toLowerCase();
        const company = (contact.properties.company || '').toLowerCase();
        const email = (contact.properties.email || '').toLowerCase();
        
        return fullName.includes(query) || 
               company.includes(query) || 
               email.includes(query);
      });
    }

    // Apply tab filter
    switch (['all', 'recent', 'priority', 'active'][activeTab]) {
      case 'recent':
        return filtered.sort((a, b) => {
          const dateA = new Date(a.properties.lastcontactdate || 0).getTime();
          const dateB = new Date(b.properties.lastcontactdate || 0).getTime();
          return dateB - dateA;
        });
      case 'priority':
        return filtered.filter(contact => 
          contact.properties.hs_lead_status === 'NEW' || 
          contact.properties.hs_lead_status === 'OPEN'
        );
      case 'active':
        return filtered.filter(contact => 
          contact.properties.lifecyclestage === 'opportunity'
        );
      default:
        return filtered;
    }
  }, [searchQuery, activeTab, contacts]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <ExclamationCircleIcon className="h-12 w-12 text-yellow-500" />
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Connect to HubSpot</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please connect your HubSpot account to view contacts
          </p>
          <button
            onClick={connect}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect HubSpot
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Error Loading Contacts</h3>
          <p className="mt-1 text-sm text-gray-500">
            {error}
          </p>
          <button
            onClick={() => fetchContacts()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Contacts</h1>
              <p className="text-gray-500">Manage and track your prospects</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{contacts.length}</p>
              <p className="text-sm text-gray-500">Total Contacts</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, company, or email..."
          />
        </div>

        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="mb-4">
            <Tab>All Contacts</Tab>
            <Tab>Recent</Tab>
            <Tab>Priority</Tab>
            <Tab>Active Deals</Tab>
          </TabList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {`${contact.properties.firstname?.[0] || ''}${contact.properties.lastname?.[0] || ''}`}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {`${contact.properties.firstname || ''} ${contact.properties.lastname || ''}`}
                        </h3>
                        <p className="text-sm text-gray-500">{contact.properties.company}</p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                        {contact.properties.company || 'N/A'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <EnvelopeIcon className="h-4 w-4 mr-2" />
                        {contact.properties.email || 'N/A'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        Last Contact: {new Date(contact.properties.lastcontactdate || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCall(contact)}
                    className="ml-4 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    title="Start call"
                  >
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </TabGroup>
      </div>

      {selectedContact && (
        <ProspectDetailModal
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          prospect={selectedContact}
        />
      )}
    </div>
  );
}