import { useState } from 'react';
import {
  PhoneIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  ArrowPathRoundedSquareIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';

interface CallControlsProps {
  onCall: () => void;
}

export default function CallControls({ onCall }: CallControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  return (
    <div className="p-4 border-t">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full ${
            isMuted ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
          } hover:bg-gray-200`}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>

        <button
          onClick={onCall}
          className="p-4 rounded-full bg-green-500 text-white hover:bg-green-600"
        >
          <PhoneIcon className="h-6 w-6" />
        </button>

        <button
          onClick={() => setIsSpeaker(!isSpeaker)}
          className={`p-4 rounded-full ${
            isSpeaker ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          } hover:bg-gray-200`}
        >
          <SpeakerWaveIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center">
          <ArrowPathRoundedSquareIcon className="h-5 w-5 mr-2" />
          Transfer
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center">
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Add Call
        </button>
      </div>
    </div>
  );
}