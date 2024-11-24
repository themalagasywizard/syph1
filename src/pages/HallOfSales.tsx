import { useState } from 'react';
import { Card, Title, TabGroup, TabList, Tab, TabPanels, TabPanel, BarChart, ProgressBar } from '@tremor/react';
import {
  TrophyIcon, FireIcon, SparklesIcon, StarIcon,
  RocketLaunchIcon, ChartBarIcon, HandThumbUpIcon,
  BoltIcon, FlagIcon
} from '@heroicons/react/24/solid';

const mockSalesData = {
  daily: [
    { name: "Sarah Chen", sales: 12500, calls: 45, conversions: 8, points: 850, streak: 15 },
    { name: "Michael Rodriguez", sales: 10800, calls: 38, conversions: 6, points: 720, streak: 8 },
    { name: "Emily Watson", sales: 9500, calls: 42, conversions: 7, points: 680, streak: 12 },
    { name: "David Kim", sales: 8900, calls: 35, conversions: 5, points: 590, streak: 5 },
    { name: "Lisa Thompson", sales: 7500, calls: 30, conversions: 4, points: 480, streak: 3 }
  ],
  weekly: [
    { name: "Sarah Chen", sales: 68000, calls: 215, conversions: 35, points: 4250, streak: 15 },
    { name: "Emily Watson", sales: 62000, calls: 198, conversions: 32, points: 3980, streak: 12 },
    { name: "Michael Rodriguez", sales: 55000, calls: 185, conversions: 28, points: 3650, streak: 8 },
    { name: "David Kim", sales: 48000, calls: 170, conversions: 25, points: 3200, streak: 5 },
    { name: "Lisa Thompson", sales: 42000, calls: 155, conversions: 22, points: 2800, streak: 3 }
  ],
  monthly: [
    { name: "Emily Watson", sales: 285000, calls: 850, conversions: 142, points: 18500, streak: 12 },
    { name: "Sarah Chen", sales: 275000, calls: 820, conversions: 138, points: 17800, streak: 15 },
    { name: "Michael Rodriguez", sales: 245000, calls: 780, conversions: 125, points: 16200, streak: 8 },
    { name: "David Kim", sales: 215000, calls: 720, conversions: 115, points: 14500, streak: 5 },
    { name: "Lisa Thompson", sales: 185000, calls: 680, conversions: 105, points: 12800, streak: 3 }
  ]
};

const achievements = [
  {
    name: "Sarah Chen",
    level: 32,
    title: "Sales Virtuoso",
    badges: ["🏆 Top Seller", "📞 Call Champion", "🔥 Perfect Streak"],
    streak: 15,
    highlight: "Closed $150k deal with Tech Corp",
    recentMilestones: ["Reached 100 calls", "Hit $1M in sales", "30-day streak"],
    progress: 85
  },
  {
    name: "Emily Watson",
    level: 28,
    title: "Rising Star",
    badges: ["⭐ Rising Star", "🎯 Deal Closer", "🌟 Rookie of the Month"],
    streak: 12,
    highlight: "Highest conversion rate this month",
    recentMilestones: ["First $100k deal", "50 successful calls"],
    progress: 65
  },
  {
    name: "Michael Rodriguez",
    level: 25,
    title: "Deal Maestro",
    badges: ["🤝 Team Player", "❤️ Customer Favorite", "📈 Growth Expert"],
    streak: 8,
    highlight: "Most positive client feedback",
    recentMilestones: ["25 demos booked", "95% satisfaction rate"],
    progress: 45
  }
];

const challenges = [
  {
    title: "December Sprint",
    description: "Close $500k in deals before month end",
    reward: "2000 bonus points + Gold Badge",
    progress: 65,
    timeLeft: "15 days"
  },
  {
    title: "Call Marathon",
    description: "Complete 100 calls this week",
    reward: "500 points + Call Champion Badge",
    progress: 45,
    timeLeft: "3 days"
  },
  {
    title: "Perfect Week",
    description: "Maintain 100% activity score for 7 days",
    reward: "1000 points + Streak Master Badge",
    progress: 85,
    timeLeft: "4 days"
  }
];

function LeaderCard({ leader, rank }: { leader: any; rank: number }) {
  const rankColors = {
    0: "bg-yellow-100 text-yellow-800 border-yellow-300",
    1: "bg-gray-100 text-gray-800 border-gray-300",
    2: "bg-orange-100 text-orange-800 border-orange-300"
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-md p-6 border-2 ${
      rank <= 2 ? rankColors[rank as keyof typeof rankColors] : "border-transparent"
    }`}>
      {rank <= 2 && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <TrophyIcon className={`h-8 w-8 ${
            rank === 0 ? "text-yellow-400" :
            rank === 1 ? "text-gray-400" :
            "text-orange-400"
          }`} />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4 mt-2">
        <div>
          <h3 className="font-bold text-lg">{leader.name}</h3>
          <p className="text-sm text-gray-600">Level {leader.level} • {leader.title}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-2xl text-blue-600">{leader.points}pts</p>
          <div className="flex items-center text-sm text-orange-500">
            <FireIcon className="h-4 w-4 mr-1" />
            {leader.streak} day streak
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Level Progress</span>
            <span>{leader.progress}%</span>
          </div>
          <ProgressBar value={leader.progress} color="blue" />
        </div>

        <div className="flex flex-wrap gap-2">
          {leader.badges.map((badge: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {leader.recentMilestones && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Recent Achievements</p>
            <div className="space-y-2">
              {leader.recentMilestones.map((milestone: string, index: number) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-2" />
                  {milestone}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <RocketLaunchIcon className="h-6 w-6 text-purple-500 mr-2" />
          {challenge.title}
        </h3>
        <span className="text-sm text-red-500">
          {challenge.timeLeft} left
        </span>
      </div>

      <p className="text-gray-600 mb-4">{challenge.description}</p>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{challenge.progress}%</span>
          </div>
          <ProgressBar value={challenge.progress} color="purple" />
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <SparklesIcon className="h-4 w-4 text-yellow-400 mr-2" />
          Reward: {challenge.reward}
        </div>
      </div>
    </div>
  );
}

export default function HallOfSales() {
  const [timeframe, setTimeframe] = useState(0);

  const dataMap = {
    0: mockSalesData.daily,
    1: mockSalesData.weekly,
    2: mockSalesData.monthly
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrophyIcon className="h-10 w-10 text-yellow-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">Hall of Sales</h1>
              <p className="text-blue-100">Where sales champions rise and shine</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold">$1.2M</p>
              <p className="text-sm text-blue-100">Team Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-blue-100">Target Achievement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-blue-100">Active Challenges</p>
            </div>
          </div>
        </div>
      </div>

      <TabGroup index={timeframe} onIndexChange={setTimeframe}>
        <TabList className="mb-4">
          <Tab>Daily Champions</Tab>
          <Tab>Weekly Heroes</Tab>
          <Tab>Monthly Legends</Tab>
        </TabList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top 3 Leaderboard */}
          {dataMap[timeframe as keyof typeof dataMap].slice(0, 3).map((leader, index) => (
            <LeaderCard key={index} leader={achievements[index]} rank={index} />
          ))}
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <Title>Revenue Champions</Title>
            <BarChart
              data={dataMap[timeframe as keyof typeof dataMap]}
              index="name"
              categories={["sales"]}
              colors={["blue"]}
              valueFormatter={(number) => `$${(number / 1000).toFixed(1)}k`}
              yAxisWidth={84}
              className="mt-4 h-72"
            />
          </Card>

          <Card>
            <Title>Activity Score</Title>
            <div className="mt-4 space-y-4">
              {dataMap[timeframe as keyof typeof dataMap].slice(0, 5).map((rep, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{rep.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <BoltIcon className="h-4 w-4 mr-1" />
                      {rep.points} points
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{rep.calls} calls</p>
                    <p className="text-sm text-green-600">{rep.conversions} wins</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active Challenges */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FlagIcon className="h-6 w-6 text-purple-500 mr-2" />
            Active Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <ChallengeCard key={index} challenge={challenge} />
            ))}
          </div>
        </div>
      </TabGroup>
    </div>
  );
}