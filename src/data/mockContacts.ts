import { Contact } from '../contexts/DialerContext';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    title: 'Chief Technology Officer',
    company: 'Tech Solutions Inc.',
    email: 'john.smith@techsolutions.com',
    phone: '+1 (555) 123-4567',
    avatar: null,
    priority: 'high',
    status: 'active',
    lastContact: '2023-12-10',
    lastActivityType: 'Call',
    engagementScore: 85,
    pipelineValue: 450000,
    deals: 2,
    personalInfo: {
      name: "John Smith",
      title: "Chief Technology Officer",
      email: "john.smith@techsolutions.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/john-smith",
      location: "San Francisco, CA",
      timezone: "PST (UTC-8)",
      preferredContactTime: "10:00 AM - 2:00 PM PST"
    },
    engagement: {
      status: "Highly Engaged",
      lastContact: "2023-12-10",
      preferredChannel: "Phone",
      meetingPreference: "Morning meetings",
      interests: [
        "Cloud Migration",
        "AI Implementation",
        "Security Solutions"
      ]
    },
    history: {
      interactions: [
        {
          type: "Call",
          date: "2023-12-10",
          duration: "45 minutes",
          summary: "Discussed cloud migration roadmap",
          outcome: "Positive - Requested follow-up demo",
          nextSteps: "Schedule technical demo"
        }
      ],
      deals: [
        {
          name: "Cloud Migration Project",
          value: "$450,000",
          status: "In Discussion",
          probability: "65%",
          expectedClose: "2024-Q1"
        }
      ]
    },
    insights: {
      decisionMakingRole: "Technical Decision Maker",
      budget: "Has signing authority up to $500,000",
      painPoints: [
        "Legacy system maintenance costs",
        "Security compliance requirements",
        "Scalability challenges"
      ],
      competitors: [
        {
          name: "Current Solution X",
          pros: "Already integrated",
          cons: "Expensive maintenance, limited features"
        }
      ],
      notes: [
        "Prefers technical discussions over sales pitch",
        "Concerned about team training and adoption",
        "Looking for long-term partnership"
      ]
    },
    recentActivity: {
      websiteVisits: [
        {
          page: "Enterprise Solutions",
          date: "2023-12-09",
          duration: "15 minutes"
        }
      ],
      emailEngagement: {
        openRate: "85%",
        clickRate: "60%",
        lastOpened: "2023-12-10"
      }
    }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    title: 'VP of Digital Transformation',
    company: 'Global Systems Corp',
    email: 'sarah.chen@globalsystems.com',
    phone: '+1 (555) 234-5678',
    avatar: null,
    priority: 'high',
    status: 'active',
    lastContact: '2023-12-09',
    lastActivityType: 'Meeting',
    engagementScore: 92,
    pipelineValue: 750000,
    deals: 3,
    personalInfo: {
      name: "Sarah Chen",
      title: "VP of Digital Transformation",
      email: "sarah.chen@globalsystems.com",
      phone: "+1 (555) 234-5678",
      linkedin: "linkedin.com/in/sarah-chen",
      location: "New York, NY",
      timezone: "EST (UTC-5)",
      preferredContactTime: "2:00 PM - 5:00 PM EST"
    },
    engagement: {
      status: "Highly Engaged",
      lastContact: "2023-12-09",
      preferredChannel: "Video Call",
      meetingPreference: "Afternoon meetings",
      interests: [
        "Digital Transformation",
        "Process Automation",
        "Data Analytics"
      ]
    },
    history: {
      interactions: [
        {
          type: "Meeting",
          date: "2023-12-09",
          duration: "60 minutes",
          summary: "Quarterly review and strategy planning",
          outcome: "Very positive - Ready to expand implementation",
          nextSteps: "Prepare expansion proposal"
        }
      ],
      deals: [
        {
          name: "Enterprise Digital Transformation",
          value: "$750,000",
          status: "In Discussion",
          probability: "80%",
          expectedClose: "2024-Q1"
        }
      ]
    },
    insights: {
      decisionMakingRole: "Key Decision Maker",
      budget: "Has signing authority up to $1,000,000",
      painPoints: [
        "Manual processes slowing growth",
        "Data silos across departments",
        "Need for real-time analytics"
      ],
      competitors: [
        {
          name: "Legacy System Y",
          pros: "Familiar to team",
          cons: "Limited automation, no AI capabilities"
        }
      ],
      notes: [
        "Strong advocate for innovation",
        "Wants rapid implementation",
        "Interested in AI/ML capabilities"
      ]
    },
    recentActivity: {
      websiteVisits: [
        {
          page: "AI Solutions",
          date: "2023-12-08",
          duration: "25 minutes"
        }
      ],
      emailEngagement: {
        openRate: "95%",
        clickRate: "75%",
        lastOpened: "2023-12-09"
      }
    }
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    title: 'Director of Operations',
    company: 'Innovate Manufacturing',
    email: 'm.rodriguez@innovatemfg.com',
    phone: '+1 (555) 345-6789',
    avatar: null,
    priority: 'medium',
    status: 'active',
    lastContact: '2023-12-08',
    lastActivityType: 'Email',
    engagementScore: 78,
    pipelineValue: 280000,
    deals: 1,
    personalInfo: {
      name: "Michael Rodriguez",
      title: "Director of Operations",
      email: "m.rodriguez@innovatemfg.com",
      phone: "+1 (555) 345-6789",
      linkedin: "linkedin.com/in/mrodriguez",
      location: "Chicago, IL",
      timezone: "CST (UTC-6)",
      preferredContactTime: "9:00 AM - 11:00 AM CST"
    },
    engagement: {
      status: "Engaged",
      lastContact: "2023-12-08",
      preferredChannel: "Email",
      meetingPreference: "Morning meetings",
      interests: [
        "Operations Optimization",
        "Supply Chain Management",
        "Quality Control"
      ]
    },
    history: {
      interactions: [
        {
          type: "Email",
          date: "2023-12-08",
          summary: "Sent proposal for operations optimization",
          outcome: "Awaiting feedback",
          nextSteps: "Follow up call scheduled"
        }
      ],
      deals: [
        {
          name: "Operations Management Suite",
          value: "$280,000",
          status: "Proposal Sent",
          probability: "60%",
          expectedClose: "2024-Q2"
        }
      ]
    },
    insights: {
      decisionMakingRole: "Technical Evaluator",
      budget: "Needs executive approval above $300,000",
      painPoints: [
        "Inefficient production tracking",
        "Quality control issues",
        "Supply chain visibility"
      ],
      competitors: [
        {
          name: "Current System Z",
          pros: "Deep manufacturing features",
          cons: "Poor user interface, limited reporting"
        }
      ],
      notes: [
        "Focuses on ROI metrics",
        "Needs extensive reporting features",
        "Interested in mobile access"
      ]
    },
    recentActivity: {
      websiteVisits: [
        {
          page: "Manufacturing Solutions",
          date: "2023-12-07",
          duration: "20 minutes"
        }
      ],
      emailEngagement: {
        openRate: "70%",
        clickRate: "45%",
        lastOpened: "2023-12-08"
      }
    }
  },
  {
    id: '4',
    name: 'Emily Watson',
    title: 'Chief Marketing Officer',
    company: 'Digital Dynamics',
    email: 'e.watson@digitaldynamics.com',
    phone: '+1 (555) 456-7890',
    avatar: null,
    priority: 'high',
    status: 'active',
    lastContact: '2023-12-07',
    lastActivityType: 'Demo',
    engagementScore: 88,
    pipelineValue: 520000,
    deals: 2,
    personalInfo: {
      name: "Emily Watson",
      title: "Chief Marketing Officer",
      email: "e.watson@digitaldynamics.com",
      phone: "+1 (555) 456-7890",
      linkedin: "linkedin.com/in/emilywatson",
      location: "Austin, TX",
      timezone: "CST (UTC-6)",
      preferredContactTime: "11:00 AM - 4:00 PM CST"
    },
    engagement: {
      status: "Highly Engaged",
      lastContact: "2023-12-07",
      preferredChannel: "Video Call",
      meetingPreference: "Midday meetings",
      interests: [
        "Marketing Automation",
        "Customer Analytics",
        "Content Management"
      ]
    },
    history: {
      interactions: [
        {
          type: "Demo",
          date: "2023-12-07",
          duration: "90 minutes",
          summary: "Full platform demo with marketing team",
          outcome: "Very positive - Team excited about features",
          nextSteps: "Prepare custom implementation plan"
        }
      ],
      deals: [
        {
          name: "Marketing Automation Platform",
          value: "$520,000",
          status: "Demo Complete",
          probability: "75%",
          expectedClose: "2024-Q1"
        }
      ]
    },
    insights: {
      decisionMakingRole: "Executive Decision Maker",
      budget: "Has signing authority up to $750,000",
      painPoints: [
        "Fragmented marketing tools",
        "Poor campaign analytics",
        "Content management inefficiencies"
      ],
      competitors: [
        {
          name: "Marketing Suite A",
          pros: "Good analytics",
          cons: "Limited automation, high cost"
        }
      ],
      notes: [
        "Values ease of use",
        "Looking for integrated solution",
        "Needs strong reporting capabilities"
      ]
    },
    recentActivity: {
      websiteVisits: [
        {
          page: "Marketing Solutions",
          date: "2023-12-06",
          duration: "35 minutes"
        }
      ],
      emailEngagement: {
        openRate: "90%",
        clickRate: "65%",
        lastOpened: "2023-12-07"
      }
    }
  },
  {
    id: '5',
    name: 'David Kim',
    title: 'Head of IT Infrastructure',
    company: 'FinTech Solutions',
    email: 'd.kim@fintechsolutions.com',
    phone: '+1 (555) 567-8901',
    avatar: null,
    priority: 'medium',
    status: 'active',
    lastContact: '2023-12-06',
    lastActivityType: 'Call',
    engagementScore: 72,
    pipelineValue: 320000,
    deals: 1,
    personalInfo: {
      name: "David Kim",
      title: "Head of IT Infrastructure",
      email: "d.kim@fintechsolutions.com",
      phone: "+1 (555) 567-8901",
      linkedin: "linkedin.com/in/davidkim",
      location: "Boston, MA",
      timezone: "EST (UTC-5)",
      preferredContactTime: "9:00 AM - 1:00 PM EST"
    },
    engagement: {
      status: "Engaged",
      lastContact: "2023-12-06",
      preferredChannel: "Phone",
      meetingPreference: "Early morning meetings",
      interests: [
        "Cloud Infrastructure",
        "Security",
        "Performance Optimization"
      ]
    },
    history: {
      interactions: [
        {
          type: "Call",
          date: "2023-12-06",
          duration: "30 minutes",
          summary: "Technical discussion about security features",
          outcome: "Positive - Requested security whitepaper",
          nextSteps: "Send detailed security documentation"
        }
      ],
      deals: [
        {
          name: "Security Infrastructure Upgrade",
          value: "$320,000",
          status: "Technical Review",
          probability: "55%",
          expectedClose: "2024-Q2"
        }
      ]
    },
    insights: {
      decisionMakingRole: "Technical Decision Maker",
      budget: "Has signing authority up to $400,000",
      painPoints: [
        "Security compliance concerns",
        "System performance issues",
        "Complex infrastructure management"
      ],
      competitors: [
        {
          name: "Security Provider B",
          pros: "Strong compliance features",
          cons: "Complex implementation, high maintenance"
        }
      ],
      notes: [
        "Very technical background",
        "Concerned about compliance",
        "Needs detailed documentation"
      ]
    },
    recentActivity: {
      websiteVisits: [
        {
          page: "Security Solutions",
          date: "2023-12-05",
          duration: "45 minutes"
        }
      ],
      emailEngagement: {
        openRate: "75%",
        clickRate: "50%",
        lastOpened: "2023-12-06"
      }
    }
  }
];