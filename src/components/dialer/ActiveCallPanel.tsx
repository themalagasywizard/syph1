import { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { useDialerContext } from '../../contexts/DialerContext';
import NearbyClientsWidget from '../widgets/NearbyClientsWidget';
import WeatherWidget from '../widgets/WeatherWidget';
import CompetitorAnalysis from '../widgets/CompetitorAnalysis';
import ScriptPanel from './ScriptPanel';

interface ActiveCallPanelProps {
  onCallEnd: () => void;
  onReturnToDialer: () => void;
  showSummary: boolean;
}

export default function ActiveCallPanel({ onCallEnd, onReturnToDialer, showSummary }: ActiveCallPanelProps) {
  const { isCallActive, currentCall, callState, endCall } = useDialerContext();
  const [notes, setNotes] = useState('');
  const [outcome, setOutcome] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpType, setFollowUpType] = useState('call');
  const [logSaved, setLogSaved] = useState(false);

  const handleEndCall = () => {
    endCall();
    onCallEnd();
  };

  const handleSaveCallLog = () => {
    if (currentCall) {
      endCall({
        type: 'Call',
        date: new Date().toISOString(),
        duration: callState.duration,
        notes,
        outcome,
        nextSteps,
        followUp: {
          date: followUpDate,
          type: followUpType
        }
      });
      setLogSaved(true);
    }
  };

  if (!currentCall) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No active call
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {isCallActive ? 'Active Call' : 'Call Summary'}
            </h2>
            <p className="text-sm text-gray-500">{currentCall.name} - {currentCall.company}</p>
          </div>
          <div className="flex items-center space-x-4">
            {isCallActive ? (
              <>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Connected - {callState.duration}
                </div>
                <button
                  onClick={handleEndCall}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  End Call
                </button>
              </>
            ) : (
              !logSaved && (
                <button
                  onClick={handleSaveCallLog}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Call Log
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {/* Left Column - Contact Info & Notes */}
        <div className="space-y-4">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected ? 'bg-white shadow text-blue-700' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`
              }>
                Contact
              </Tab>
              <Tab className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected ? 'bg-white shadow text-blue-700' : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'}`
              }>
                Notes
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Email:</span> {currentCall.email}</p>
                      <p className="text-sm"><span className="font-medium">Phone:</span> {currentCall.phone}</p>
                      <p className="text-sm"><span className="font-medium">Role:</span> {currentCall.title}</p>
                    </div>
                  </div>
                  <ScriptPanel />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-4">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add call notes..."
                    className="w-full h-32 p-3 border rounded-lg resize-none"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Outcome
                    </label>
                    <select
                      value={outcome}
                      onChange={(e) => setOutcome(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="">Select outcome...</option>
                      <option value="Interested - Follow up">Interested - Follow up</option>
                      <option value="Not interested">Not interested</option>
                      <option value="Call back later">Call back later</option>
                      <option value="Wrong contact">Wrong contact</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Next Steps
                    </label>
                    <input
                      type="text"
                      value={nextSteps}
                      onChange={(e) => setNextSteps(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter next steps..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Follow-up Date
                      </label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Follow-up Type
                      </label>
                      <select
                        value={followUpType}
                        onChange={(e) => setFollowUpType(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="meeting">Meeting</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Center Column - Widgets */}
        <div className="space-y-4">
          <WeatherWidget location={currentCall.personalInfo.location} />
          <NearbyClientsWidget location={currentCall.personalInfo.location} />
        </div>

        {/* Right Column - Competitor Analysis */}
        <div>
          <CompetitorAnalysis competitors={currentCall.insights.competitors} />
        </div>
      </div>

      {/* Footer Actions */}
      {logSaved && (
        <div className="p-4 border-t">
          <button
            onClick={onReturnToDialer}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Return to Dialer
          </button>
        </div>
      )}
    </div>
  );
}