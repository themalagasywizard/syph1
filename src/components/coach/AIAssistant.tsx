import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import {
  SparklesIcon, PaperAirplaneIcon,
  LightBulbIcon, ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';

const suggestionPrompts = [
  "How do I handle pricing objections?",
  "Tips for building rapport in first calls",
  "Best practices for follow-up emails",
  "Closing techniques for enterprise deals"
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your AI sales coach. How can I help you improve your sales skills today?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      type: 'user',
      content: input
    }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "I understand your question about sales techniques. Based on best practices and your recent performance, here's what I recommend..."
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="col-span-2">
        <Card className="h-[600px] flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
            <SparklesIcon className="h-6 w-6 text-purple-500" />
            <Title>AI Sales Coach</Title>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about sales..."
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </Card>
      </div>

      {/* Suggestions & Resources */}
      <div className="space-y-6">
        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
            <Title>Suggested Questions</Title>
          </div>
          <div className="space-y-2">
            {suggestionPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="w-full p-2 text-left hover:bg-gray-50 rounded-lg text-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-2 mb-4">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-500" />
            <Title>Practice Scenarios</Title>
          </div>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg">
              <p className="font-medium">Discovery Call Simulation</p>
              <p className="text-sm text-gray-600">Practice qualifying prospects</p>
            </button>
            <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg">
              <p className="font-medium">Objection Handling</p>
              <p className="text-sm text-gray-600">Common objection scenarios</p>
            </button>
            <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg">
              <p className="font-medium">Closing Techniques</p>
              <p className="text-sm text-gray-600">Practice different closes</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}