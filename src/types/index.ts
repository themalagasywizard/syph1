export interface CallLog {
  type: string;
  date: string;
  duration: string;
  notes: string;
  outcome: string;
  nextSteps: string;
  summary?: string;
  followUp?: {
    date: string;
    type: string;
  };
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  avatar: string | null;
  priority: 'high' | 'medium' | 'low';
  status: string;
  lastContact: string;
  lastActivityType: string;
  engagementScore: number;
  pipelineValue: number;
  deals: number;
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    timezone: string;
    preferredContactTime: string;
  };
  engagement: {
    status: string;
    lastContact: string;
    preferredChannel: string;
    meetingPreference: string;
    interests: string[];
  };
  history: {
    interactions: CallLog[];
    deals: Array<{
      name: string;
      value: string;
      status: string;
      probability: string;
      expectedClose: string;
    }>;
  };
  insights: {
    decisionMakingRole: string;
    budget: string;
    painPoints: string[];
    competitors: Array<{
      name: string;
      pros: string;
      cons: string;
    }>;
    notes: string[];
  };
  recentActivity: {
    websiteVisits: Array<{
      page: string;
      date: string;
      duration: string;
    }>;
    emailEngagement: {
      openRate: string;
      clickRate: string;
      lastOpened: string;
    };
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  language?: string;
  timezone?: string;
  twoFactorEnabled?: boolean;
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

export interface CompanyData {
  name: string;
  industry: string;
  revenue: string;
  employees: string;
  founded: string;
  website: string;
  description: string;
  decisionMakers: Array<{
    name: string;
    title: string;
    department: string;
    influenceLevel: string;
    linkedin: string;
  }>;
  opportunities: Array<{
    name: string;
    value: string;
    status: string;
    createdDate: string;
    closedDate: string | null;
  }>;
  news: Array<{
    title: string;
    summary: string;
    source: string;
    date: string;
    url: string;
    image: string;
  }>;
  previousContacts: Array<{
    type: string;
    date: string;
    summary: string;
    by: string;
  }>;
}

export interface NearbyClient {
  distance: string;
  relationship: {
    yearsAsClient: number;
    totalRevenue: string;
    lastInteraction: string;
  };
  keyPeople: Array<{
    name: string;
    role: string;
  }>;
}

export type NearbyClients = Record<string, NearbyClient>;

export interface HubspotTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}