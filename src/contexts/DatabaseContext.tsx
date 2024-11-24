import { createContext, useContext, ReactNode } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  language?: string;
  timezone?: string;
  settings?: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  stats?: {
    callsMade: number;
    dealsWon: number;
    revenue: number;
  };
  salesRank?: number;
  coachingScore?: number;
  achievements?: Array<{
    title: string;
    date: string;
  }>;
}

interface HubspotTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface DatabaseContextType {
  createUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  getUserProfile: () => Promise<UserProfile | null>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  getUserHubspotTokens: () => Promise<HubspotTokens | null>;
  updateUserHubspotTokens: (tokens: HubspotTokens) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();

  const createUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No authenticated user');

    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  };

  const getUserProfile = async () => {
    if (!currentUser) throw new Error('No authenticated user');

    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }

    return null;
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No authenticated user');

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  };

  const getUserHubspotTokens = async () => {
    if (!currentUser) throw new Error('No authenticated user');
    
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().hubspotTokens) {
      return userDoc.data().hubspotTokens as HubspotTokens;
    }
    
    return null;
  };

  const updateUserHubspotTokens = async (tokens: HubspotTokens) => {
    if (!currentUser) throw new Error('No authenticated user');
    
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      hubspotTokens: tokens,
      hubspotUpdatedAt: Timestamp.now()
    });
  };

  return (
    <DatabaseContext.Provider value={{
      createUserProfile,
      getUserProfile,
      updateUserProfile,
      getUserHubspotTokens,
      updateUserHubspotTokens,
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}

export type { UserProfile, HubspotTokens };