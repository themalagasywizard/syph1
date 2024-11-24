import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Client } from '@hubspot/api-client';
import { useAuth } from './AuthContext';
import { useDatabase } from './DatabaseContext';
import { getAuthUrl } from '../config/hubspot';
import axios from 'axios';
import type { HubspotTokens } from '../types';

interface HubspotContextType {
  contacts: any[];
  loading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => Promise<void>;
}

const HubspotContext = createContext<HubspotContextType | undefined>(undefined);

export function HubspotProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hubspotClient, setHubspotClient] = useState<Client | null>(null);
  const { currentUser } = useAuth();
  const { getUserHubspotTokens, updateUserHubspotTokens } = useDatabase();

  const fetchContacts = useCallback(async () => {
    if (!hubspotClient) {
      setError('HubSpot not connected');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/hubspot-api/crm/v3/objects/contacts', {
        headers: {
          'Authorization': `Bearer ${(await getUserHubspotTokens())?.accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: 100,
          properties: [
            'firstname',
            'lastname',
            'email',
            'company',
            'phone',
            'lastcontactdate',
            'hs_lead_status',
            'lifecyclestage'
          ]
        }
      });

      setContacts(response.data.results);
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      setError('Failed to fetch contacts from HubSpot');
      
      if (err.response?.status === 401) {
        setHubspotClient(null);
        await updateUserHubspotTokens({
          accessToken: '',
          refreshToken: '',
          expiresAt: 0
        });
      }
    } finally {
      setLoading(false);
    }
  }, [hubspotClient, getUserHubspotTokens, updateUserHubspotTokens]);

  useEffect(() => {
    const initializeClient = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const tokens = await getUserHubspotTokens();
        
        if (tokens?.accessToken) {
          const client = new Client({ accessToken: tokens.accessToken });
          
          try {
            const response = await axios.get('/hubspot-api/crm/v3/objects/contacts', {
              headers: {
                'Authorization': `Bearer ${tokens.accessToken}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.status === 200) {
              setHubspotClient(client);
              setError(null);
            }
          } catch (err: any) {
            if (err.response?.status === 401) {
              console.error('Invalid or expired token');
              await updateUserHubspotTokens({
                accessToken: '',
                refreshToken: '',
                expiresAt: 0
              });
            }
            setHubspotClient(null);
            setError('HubSpot connection expired. Please reconnect.');
          }
        } else {
          setHubspotClient(null);
          setError('Not connected to HubSpot');
        }
      } catch (err) {
        console.error('Error initializing HubSpot client:', err);
        setError('Failed to initialize HubSpot connection');
        setHubspotClient(null);
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, [currentUser, getUserHubspotTokens, updateUserHubspotTokens]);

  const connect = useCallback(() => {
    window.location.href = getAuthUrl();
  }, []);

  const disconnect = async () => {
    try {
      await updateUserHubspotTokens({
        accessToken: '',
        refreshToken: '',
        expiresAt: 0
      });
      setHubspotClient(null);
      setContacts([]);
      setError('Not connected to HubSpot');
    } catch (err) {
      console.error('Error disconnecting from HubSpot:', err);
      setError('Failed to disconnect from HubSpot');
    }
  };

  return (
    <HubspotContext.Provider value={{
      contacts,
      loading,
      error,
      fetchContacts,
      isConnected: !!hubspotClient,
      connect,
      disconnect
    }}>
      {children}
    </HubspotContext.Provider>
  );
}

export function useHubspot() {
  const context = useContext(HubspotContext);
  if (context === undefined) {
    throw new Error('useHubspot must be used within a HubspotProvider');
  }
  return context;
}