import { useState } from 'react';
import { Card, Title, TabGroup, TabList, Tab, TabPanels, TabPanel, ProgressBar } from '@tremor/react';
import {
  AcademicCapIcon, BeakerIcon, ChatBubbleBottomCenterTextIcon,
  ChartBarIcon, BookOpenIcon, TrophyIcon, SparklesIcon,
  LightBulbIcon, UserGroupIcon
} from '@heroicons/react/24/outline';
import CoachDashboard from '../components/coach/CoachDashboard';
import SkillModules from '../components/coach/SkillModules';
import LiveCoaching from '../components/coach/LiveCoaching';
import ResourceLibrary from '../components/coach/ResourceLibrary';
import AIAssistant from '../components/coach/AIAssistant';

export default function SalesCoach() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AcademicCapIcon className="h-10 w-10 text-indigo-200 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">Sales Coach AI</h1>
              <p className="text-indigo-200">Your personal AI-powered sales mentor</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-indigo-200">Skill Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-indigo-200">Skills Mastered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-indigo-200">Coaching Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList className="mb-6">
          <Tab className="flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Tab>
          <Tab className="flex items-center space-x-2">
            <BeakerIcon className="h-5 w-5" />
            <span>Skill Development</span>
          </Tab>
          <Tab className="flex items-center space-x-2">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            <span>Live Coaching</span>
          </Tab>
          <Tab className="flex items-center space-x-2">
            <BookOpenIcon className="h-5 w-5" />
            <span>Resources</span>
          </Tab>
          <Tab className="flex items-center space-x-2">
            <SparklesIcon className="h-5 w-5" />
            <span>AI Assistant</span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CoachDashboard />
          </TabPanel>
          <TabPanel>
            <SkillModules />
          </TabPanel>
          <TabPanel>
            <LiveCoaching />
          </TabPanel>
          <TabPanel>
            <ResourceLibrary />
          </TabPanel>
          <TabPanel>
            <AIAssistant />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}