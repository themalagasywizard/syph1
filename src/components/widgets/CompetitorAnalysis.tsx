import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import {
  ShieldExclamationIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';

interface Competitor {
  name: string;
  pros: string;
  cons: string;
}

interface CompetitorAnalysisProps {
  competitors: Competitor[];
}

export default function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  const battleCard = {
    ourStrengths: [
      "Advanced AI capabilities",
      "Seamless integration",
      "24/7 support",
      "Lower total cost of ownership",
      "Faster implementation"
    ],
    theirWeaknesses: [
      "Limited automation",
      "Complex setup",
      "High maintenance costs",
      "Poor scalability",
      "Limited customization"
    ],
    keyDifferentiators: [
      "Real-time AI coaching",
      "Integrated CRM functionality",
      "Automated follow-ups",
      "Predictive analytics",
      "Custom workflow automation"
    ]
  };

  return (
    <Card>
      <div className="flex items-center space-x-2">
        <ShieldExclamationIcon className="h-5 w-5 text-red-500" />
        <Title>Battle Card</Title>
      </div>

      <div className="mt-4">
        {competitors.map((competitor, index) => (
          <button
            key={index}
            onClick={() => setSelectedCompetitor(competitor)}
            className={`w-full text-left p-3 rounded-lg border mb-3 ${
              selectedCompetitor?.name === competitor.name
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-blue-300'
            } transition-colors`}
          >
            <p className="font-medium">{competitor.name}</p>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-600 flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  {competitor.pros}
                </p>
              </div>
              <div>
                <p className="text-red-600 flex items-center">
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  {competitor.cons}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedCompetitor && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-700 mb-2">Our Advantages</p>
              <ul className="space-y-2">
                {battleCard.ourStrengths.map((strength, index) => (
                  <li key={index} className="text-sm flex items-center text-green-600">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-red-700 mb-2">Their Weaknesses</p>
              <ul className="space-y-2">
                {battleCard.theirWeaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm flex items-center text-red-600">
                    <XCircleIcon className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-700 mb-2">Key Differentiators</p>
            <div className="grid grid-cols-2 gap-4">
              {battleCard.keyDifferentiators.map((diff, index) => (
                <div key={index} className="bg-white p-2 rounded text-sm text-blue-600">
                  {diff}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}