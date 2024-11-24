import { useState } from 'react';
import { Card, Title, ProgressBar } from '@tremor/react';
import {
  MicrophoneIcon, PauseIcon, ArrowPathIcon,
  CheckCircleIcon, XCircleIcon, SparklesIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

const mockCallAnalysis = {
  currentCall: {
    duration: '00:15:23',
    prospect: 'John Smith',
    company: 'Tech Solutions Inc.',
    type: 'Discovery Call',
    status: 'In Progress'
  },
  metrics: {
    talkRatio: 35,
    questionRate: 75,
    pace: 85,
    engagement: 90
  },
  suggestions: [
    {
      type: 'positive',
      message: 'Good use of open-ended questions'
    },
    {
      type: 'improvement',
      message: 'Consider slowing down your speech pace'
    },
    {
      type: 'positive',
      message: 'Excellent active listening signals'
    }
  ]
};

export default function LiveCoaching() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Call Controls & Status */}
      <div className="space-y-6">
        <Card>
          <Title>Call Recording</Title>
          <div className="mt-6 flex flex-col items-center">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                isRecording ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? (
                    <PauseIcon className="h-12 w-12 text-white" />
                  ) : (
                    <MicrophoneIcon className="h-12 w-12 text-white" />
                  )}
                </button>
              </div>
              {isRecording && (
                <span className="absolute -top-2 right-0 px-2 py-1 bg-red-500 text-white text-sm rounded-full animate-pulse">
                  Recording
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold">{mockCallAnalysis.currentCall.duration}</p>
            <p className="text-gray-500">Call Duration</p>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm">
              <span className="font-medium">Prospect:</span> {mockCallAnalysis.currentCall.prospect}
            </p>
            <p className="text-sm">
              <span className="font-medium">Company:</span> {mockCallAnalysis.currentCall.company}
            </p>
            <p className="text-sm">
              <span className="font-medium">Call Type:</span> {mockCallAnalysis.currentCall.type}
            </p>
          </div>
        </Card>
      </div>

      {/* Center Column - Real-time Analysis */}
      <div className="col-span-2 space-y-6">
        <Card>
          <Title>Real-time Analysis</Title>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Talk/Listen Ratio</span>
                <span>{mockCallAnalysis.metrics.talkRatio}%</span>
              </div>
              <ProgressBar value={mockCallAnalysis.metrics.talkRatio} color="blue" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Question Rate</span>
                <span>{mockCallAnalysis.metrics.questionRate}%</span>
              </div>
              <ProgressBar value={mockCallAnalysis.metrics.questionRate} color="green" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Speech Pace</span>
                <span>{mockCallAnalysis.metrics.pace}%</span>
              </div>
              <ProgressBar value={mockCallAnalysis.metrics.pace} color="orange" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Engagement Score</span>
                <span>{mockCallAnalysis.metrics.engagement}%</span>
              </div>
              <ProgressBar value={mockCallAnalysis.metrics.engagement} color="purple" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <SparklesIcon className="h-6 w-6 text-purple-500" />
            <Title>Live Suggestions</Title>
          </div>
          <div className="space-y-3">
            {mockCallAnalysis.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex items-start space-x-3 ${
                  suggestion.type === 'positive' ? 'bg-green-50' : 'bg-blue-50'
                }`}
              >
                {suggestion.type === 'positive' ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <ArrowPathIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                )}
                <p className={`text-sm ${
                  suggestion.type === 'positive' ? 'text-green-700' : 'text-blue-700'
                }`}>
                  {suggestion.message}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}