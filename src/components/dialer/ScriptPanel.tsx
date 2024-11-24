import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const mockScripts = {
  introduction: "Hi, this is [Name] from [Company]. I noticed you recently [context]. I'd love to discuss how we could help with [value proposition].",
  objectionHandling: {
    price: "I understand budget is a concern. Let me share how other companies have seen ROI within [timeframe]...",
    timing: "I appreciate you're busy. Would it be helpful to schedule a brief follow-up at a more convenient time?",
    competition: "That's great you're exploring options. What specific features are most important to you?"
  },
  closing: "Based on our discussion, I'd love to show you exactly how we can [specific benefit]. Would you be open to a quick demo next week?"
};

export default function ScriptPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-sm font-medium text-gray-700"
      >
        Call Scripts
        {isExpanded ? (
          <ChevronDownIcon className="h-5 w-5" />
        ) : (
          <ChevronUpIcon className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Introduction</h3>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {mockScripts.introduction}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Objection Handling</h3>
            <div className="space-y-2">
              {Object.entries(mockScripts.objectionHandling).map(([key, script]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium capitalize mb-1">{key}</p>
                  <p className="text-sm text-gray-600">{script}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Closing</h3>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {mockScripts.closing}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}