import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useDialerContext } from '../../contexts/DialerContext';
import CallControls from './CallControls';
import ScriptPanel from './ScriptPanel';
import LastActivityPanel from './LastActivityPanel';
import { PhoneIcon, PauseIcon, PlayIcon, MicrophoneIcon } from '@heroicons/react/24/solid';

interface DialerInterfaceProps {
  mode: 'manual' | 'auto';
  onModeChange: (mode: 'manual' | 'auto') => void;
}

export default function DialerInterface({ mode, onModeChange }: DialerInterfaceProps) {
  const [number, setNumber] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [autoDialerActive, setAutoDialerActive] = useState(false);
  const { lastCall } = useDialerContext();

  const handleDial = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const handleCall = () => {
    // Implement call logic
  };

  return (
    <div className="h-full flex flex-col">
      {/* Mode Toggle */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Switch
            checked={mode === 'auto'}
            onChange={() => onModeChange(mode === 'auto' ? 'manual' : 'auto')}
            className={`${
              mode === 'auto' ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Auto Dialer Mode</span>
            <span
              className={`${
                mode === 'auto' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="text-sm font-medium">
            {mode === 'auto' ? 'Auto Dialer' : 'Manual Dialer'}
          </span>
        </div>
        
        {mode === 'auto' && (
          <button
            onClick={() => setAutoDialerActive(!autoDialerActive)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              autoDialerActive
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {autoDialerActive ? (
              <>
                <PauseIcon className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <PlayIcon className="h-5 w-5 mr-2" />
                Start
              </>
            )}
          </button>
        )}
      </div>

      {/* Number Display */}
      <div className="p-4">
        <input
          type="text"
          value={number}
          readOnly
          className="w-full text-2xl p-4 text-center border rounded-lg bg-gray-50"
          placeholder="Enter number"
        />
      </div>

      {/* Dialer Pad */}
      <div className="flex-1 p-4 grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
          <button
            key={digit}
            onClick={() => handleDial(digit.toString())}
            className="aspect-square rounded-full bg-gray-50 hover:bg-gray-100 text-xl font-semibold flex items-center justify-center transition-colors"
          >
            {digit}
          </button>
        ))}
      </div>

      {/* Call Controls */}
      <CallControls onCall={handleCall} />

      {/* Script Panel */}
      <ScriptPanel />

      {/* Last Activity Panel */}
      {lastCall && (
        <div className="border-t">
          <LastActivityPanel lastCall={lastCall} />
        </div>
      )}
    </div>
  );
}