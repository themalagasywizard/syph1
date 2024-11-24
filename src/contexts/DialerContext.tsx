import { createContext, useContext, useState, ReactNode, useRef, useCallback } from 'react';
import type { Contact, CallLog } from '../types';

interface CallState {
  status: 'idle' | 'dialing' | 'connected' | 'ended';
  startTime: number | null;
  duration: string;
}

interface DialerContextType {
  isCallActive: boolean;
  currentCall: Contact | null;
  lastCall: Contact | null;
  callQueue: Contact[];
  callState: CallState;
  startCall: (contact: Contact) => void;
  endCall: (callLog?: CallLog) => void;
}

const DialerContext = createContext<DialerContextType | undefined>(undefined);

export function DialerProvider({ children }: { children: ReactNode }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentCall, setCurrentCall] = useState<Contact | null>(null);
  const [lastCall, setLastCall] = useState<Contact | null>(null);
  const [callQueue] = useState<Contact[]>([]);
  const [callState, setCallState] = useState<CallState>({
    status: 'idle',
    startTime: null,
    duration: '00:00'
  });

  const timerRef = useRef<number>();

  const startCall = useCallback((contact: Contact) => {
    setIsCallActive(true);
    setCurrentCall(contact);
    setCallState({
      status: 'dialing',
      startTime: Date.now(),
      duration: '00:00'
    });

    setTimeout(() => {
      setCallState(prev => ({
        ...prev,
        status: 'connected'
      }));

      timerRef.current = window.setInterval(() => {
        setCallState(prev => {
          if (!prev.startTime) return prev;
          const duration = Math.floor((Date.now() - prev.startTime) / 1000);
          const minutes = Math.floor(duration / 60);
          const seconds = duration % 60;
          return {
            ...prev,
            duration: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          };
        });
      }, 1000);
    }, 2000);
  }, []);

  const endCall = useCallback((callLog?: CallLog) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (currentCall && callLog) {
      const updatedCall = {
        ...currentCall,
        history: {
          ...currentCall.history,
          interactions: [callLog, ...currentCall.history.interactions]
        }
      };
      setLastCall(updatedCall);
      setCurrentCall(updatedCall);
    }

    setCallState(prev => ({
      ...prev,
      status: 'ended'
    }));
    setIsCallActive(false);
  }, [currentCall]);

  return (
    <DialerContext.Provider
      value={{
        isCallActive,
        currentCall,
        lastCall,
        callQueue,
        callState,
        startCall,
        endCall,
      }}
    >
      {children}
    </DialerContext.Provider>
  );
}

export function useDialerContext() {
  const context = useContext(DialerContext);
  if (context === undefined) {
    throw new Error('useDialerContext must be used within a DialerProvider');
  }
  return context;
}

export type { Contact, CallState, DialerContextType, CallLog };