import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  salesRank: number;
  coachingScore: number;
  achievements: {
    title: string;
    date: string;
  }[];
  stats: {
    callsMade: number;
    dealsWon: number;
    revenue: number;
  };
}

interface UserContextType {
  user: UserProfile | null;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

const mockUser: UserProfile = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'Senior Sales Executive',
  bio: 'Passionate about building relationships and driving growth. Specialized in enterprise software sales with 5+ years of experience.',
  salesRank: 1,
  coachingScore: 92,
  achievements: [
    { title: 'Top Performer Q4 2023', date: '2023-12-01' },
    { title: 'Perfect Call Score', date: '2023-11-15' },
    { title: '100 Deals Milestone', date: '2023-10-30' }
  ],
  stats: {
    callsMade: 1250,
    dealsWon: 85,
    revenue: 1500000
  }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(mockUser);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(curr => curr ? { ...curr, ...updates } : null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}