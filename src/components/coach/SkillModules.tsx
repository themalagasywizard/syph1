import { useState } from 'react';
import { Card, Title, ProgressBar } from '@tremor/react';
import {
  AcademicCapIcon, BeakerIcon, BookOpenIcon,
  ChatBubbleBottomCenterTextIcon, CheckCircleIcon,
  PlayIcon, LockClosedIcon
} from '@heroicons/react/24/outline';

const modules = [
  {
    id: 1,
    title: 'Prospecting Mastery',
    description: 'Learn advanced techniques for identifying and qualifying prospects',
    progress: 85,
    status: 'in-progress',
    lessons: [
      { title: 'Ideal Customer Profile', completed: true, duration: '15 min' },
      { title: 'Research Techniques', completed: true, duration: '20 min' },
      { title: 'Outreach Strategies', completed: false, duration: '25 min' },
      { title: 'Qualification Framework', completed: false, duration: '30 min' }
    ]
  },
  {
    id: 2,
    title: 'Needs Analysis',
    description: 'Master the art of discovering customer pain points and needs',
    progress: 60,
    status: 'in-progress',
    lessons: [
      { title: 'Discovery Questions', completed: true, duration: '20 min' },
      { title: 'Active Listening', completed: true, duration: '15 min' },
      { title: 'Pain Point Analysis', completed: false, duration: '25 min' },
      { title: 'Solution Mapping', completed: false, duration: '30 min' }
    ]
  },
  {
    id: 3,
    title: 'Objection Handling',
    description: 'Learn to handle common objections and turn them into opportunities',
    progress: 40,
    status: 'in-progress',
    lessons: [
      { title: 'Common Objections', completed: true, duration: '20 min' },
      { title: 'Response Framework', completed: false, duration: '25 min' },
      { title: 'Practice Scenarios', completed: false, duration: '30 min' },
      { title: 'Advanced Techniques', completed: false, duration: '35 min' }
    ]
  },
  {
    id: 4,
    title: 'Closing Techniques',
    description: 'Master various closing techniques for different scenarios',
    progress: 0,
    status: 'locked',
    lessons: [
      { title: 'Trial Close', completed: false, duration: '20 min' },
      { title: 'Assumptive Close', completed: false, duration: '25 min' },
      { title: 'Alternative Close', completed: false, duration: '20 min' },
      { title: 'Summary Close', completed: false, duration: '30 min' }
    ]
  }
];

export default function SkillModules() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Module List */}
      <div className="col-span-1 space-y-4">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module.id)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedModule === module.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            } ${module.status === 'locked' ? 'opacity-50' : ''}`}
            disabled={module.status === 'locked'}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{module.title}</h3>
              {module.status === 'locked' ? (
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <span className="text-sm text-gray-500">{module.progress}%</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
            <ProgressBar
              value={module.progress}
              color="blue"
              className="mt-2"
            />
          </button>
        ))}
      </div>

      {/* Right Column - Module Details */}
      <div className="col-span-2">
        {selectedModule ? (
          <Card>
            {(() => {
              const module = modules.find(m => m.id === selectedModule);
              if (!module) return null;

              return (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Title>{module.title}</Title>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {module.progress}%
                      </p>
                      <p className="text-sm text-gray-500">Complete</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {module.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          lesson.completed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {lesson.completed ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            ) : (
                              <PlayIcon className="h-5 w-5 text-blue-500" />
                            )}
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-gray-500">
                                Duration: {lesson.duration}
                              </p>
                            </div>
                          </div>
                          <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              lesson.completed
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {lesson.completed ? 'Review' : 'Start'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700">
                      Save Progress
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Continue Learning
                    </button>
                  </div>
                </>
              );
            })()}
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a module to begin learning
          </div>
        )}
      </div>
    </div>
  );
}