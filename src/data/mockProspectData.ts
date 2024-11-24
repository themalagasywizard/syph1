export const mockProspectData = {
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
        summary: "Discussed cloud migration roadmap and security concerns",
        outcome: "Positive - Requested follow-up demo",
        nextSteps: "Schedule technical demo with team"
      },
      {
        type: "Email",
        date: "2023-12-08",
        summary: "Sent cloud migration case studies",
        outcome: "Opened within 1 hour, clicked all links",
        nextSteps: "Follow up on specific questions"
      },
      {
        type: "Meeting",
        date: "2023-12-01",
        duration: "60 minutes",
        summary: "Initial discovery call with technical team",
        outcome: "High interest in cloud solutions",
        nextSteps: "Provide pricing details"
      }
    ],
    
    deals: [
      {
        name: "Cloud Migration Project",
        value: "$450,000",
        status: "In Discussion",
        probability: "65%",
        expectedClose: "2024-Q1"
      },
      {
        name: "Security Suite Implementation",
        value: "$180,000",
        status: "Proposal Sent",
        probability: "45%",
        expectedClose: "2024-Q2"
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
      },
      {
        page: "Case Studies",
        date: "2023-12-08",
        duration: "25 minutes"
      }
    ],
    emailEngagement: {
      openRate: "85%",
      clickRate: "60%",
      lastOpened: "2023-12-10"
    }
  }
};