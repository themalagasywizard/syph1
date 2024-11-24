import { useState } from 'react';
import DialerInterface from '../components/dialer/DialerInterface';
import CallQueue from '../components/dialer/CallQueue';
import ActiveCallPanel from '../components/dialer/ActiveCallPanel';
import CallMetrics from '../components/dialer/CallMetrics';
import LastActivityPanel from '../components/dialer/LastActivityPanel';
import { useDialerContext } from '../contexts/DialerContext';

export default function Dialer() {
  const [activeView, setActiveView] = useState<'manual' | 'auto'>('manual');
  const { isCallActive, callState, currentCall, lastCall } = useDialerContext();
  const [showDialer, setShowDialer] = useState(true);
  const [showCallSummary, setShowCallSummary] = useState(false);

  // Show call panel when call is active or in summary mode
  const showCallPanel = isCallActive || showCallSummary;

  const handleCallEnd = () => {
    setShowCallSummary(true);
  };

  const handleReturnToDialer = () => {
    setShowCallSummary(false);
    setShowDialer(true);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Left Panel - Call Queue & Metrics */}
        {showDialer && !showCallPanel && (
          <div className="col-span-3 bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <CallQueue />
            <CallMetrics />
          </div>
        )}

        {/* Center/Main Panel */}
        {showCallPanel ? (
          // When call is active or in summary mode, show expanded call panel
          <div className="col-span-12 bg-white rounded-lg shadow overflow-hidden">
            <ActiveCallPanel 
              onCallEnd={handleCallEnd}
              onReturnToDialer={handleReturnToDialer}
              showSummary={showCallSummary}
            />
          </div>
        ) : (
          <>
            {/* Dialer Interface */}
            <div className="col-span-6 bg-white rounded-lg shadow overflow-hidden">
              <DialerInterface mode={activeView} onModeChange={setActiveView} />
            </div>

            {/* Last Activity Panel */}
            <div className="col-span-3 bg-white rounded-lg shadow overflow-hidden">
              <LastActivityPanel lastCall={lastCall} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}