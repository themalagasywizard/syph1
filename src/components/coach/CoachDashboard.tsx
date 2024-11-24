import { Card, Title, ProgressBar, BarChart, DonutChart } from '@tremor/react';
import {
  TrophyIcon, FireIcon, SparklesIcon,
  ChartBarIcon, LightBulbIcon, StarIcon
} from '@heroicons/react/24/solid';

const performanceMetrics = {
  callSuccess: 75,
  dealClosure: 68,
  emailEngagement: 82,
  followUpRate: 90
};

const skillProgress = [
  { name: 'Prospecting', progress: 85 },
  { name: 'Needs Analysis', progress: 72 },
  { name: 'Presentation', progress: 90 },
  { name: 'Objection Handling', progress: 65 },
  { name: 'Closing', progress: 78 }
];

const recentAchievements = [
  {
    title: 'Call Champion',
    description: 'Completed 50 successful calls this week',
    date: '2 days ago',
    icon: TrophyIcon
  },
  {
    title: 'Deal Master',
    description: 'Closed $500k in new business',
    date: '1 week ago',
    icon: StarIcon
  },
  {
    title: 'Perfect Streak',
    description: '7 days of hitting all targets',
    date: '1 week ago',
    icon: FireIcon
  }
];

const aiInsights = [
  {
    insight: 'Your follow-up timing has improved by 25%',
    recommendation: 'Try sending follow-ups in the morning for better engagement'
  },
  {
    insight: 'Deal closure rate is below target',
    recommendation: 'Focus on value proposition during negotiations'
  },
  {
    insight: 'High success with technical prospects',
    recommendation: 'Leverage technical expertise in upcoming calls'
  }
];

export default function CoachDashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Performance Metrics */}
      <div className="space-y-6">
        <Card>
          <Title>Performance Metrics</Title>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Call Success Rate</span>
                <span>{performanceMetrics.callSuccess}%</span>
              </div>
              <ProgressBar value={performanceMetrics.callSuccess} color="blue" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Deal Closure Rate</span>
                <span>{performanceMetrics.dealClosure}%</span>
              </div>
              <ProgressBar value={performanceMetrics.dealClosure} color="green" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Email Engagement</span>
                <span>{performanceMetrics.emailEngagement}%</span>
              </div>
              <ProgressBar value={performanceMetrics.emailEngagement} color="purple" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Follow-up Rate</span>
                <span>{performanceMetrics.followUpRate}%</span>
              </div>
              <ProgressBar value={performanceMetrics.followUpRate} color="orange" />
            </div>
          </div>
        </Card>

        <Card>
          <Title>Recent Achievements</Title>
          <div className="mt-4 space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <achievement.icon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Center Column - Skill Development */}
      <div className="space-y-6">
        <Card>
          <Title>Skill Progress</Title>
          <div className="mt-4 space-y-4">
            {skillProgress.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>
                <ProgressBar value={skill.progress} color="indigo" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Title>Learning Path</Title>
          <div className="mt-4">
            <DonutChart
              data={skillProgress}
              category="progress"
              index="name"
              valueFormatter={(number) => `${number}%`}
              colors={["indigo", "violet", "fuchsia", "rose", "pink"]}
            />
          </div>
        </Card>
      </div>

      {/* Right Column - AI Insights */}
      <div className="space-y-6">
        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <SparklesIcon className="h-6 w-6 text-purple-500" />
            <Title>AI Coaching Insights</Title>
          </div>
          <div className="space-y-4">
            {aiInsights.map((item, index) => (
              <div key={index} className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">{item.insight}</p>
                <p className="text-sm text-purple-700 mt-1">
                  <LightBulbIcon className="h-4 w-4 inline mr-1" />
                  {item.recommendation}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Title>Next Steps</Title>
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">Complete Objection Handling Module</p>
              <p className="text-sm text-blue-700">Improve your negotiation skills</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium text-green-900">Practice Value Proposition</p>
              <p className="text-sm text-green-700">Schedule role-play session</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-900">Review Call Recordings</p>
              <p className="text-sm text-orange-700">Analyze successful patterns</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}