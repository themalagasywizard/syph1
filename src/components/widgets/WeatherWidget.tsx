import { useState, useEffect } from 'react';
import { Card, Title } from '@tremor/react';
import { 
  SunIcon, 
  CloudIcon, 
  CloudArrowDownIcon // Changed from CloudRainIcon which doesn't exist
} from '@heroicons/react/24/solid';

interface WeatherWidgetProps {
  location: string;
}

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  humidity: number;
  windSpeed: number;
}

export default function WeatherWidget({ location }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'sunny',
    humidity: 45,
    windSpeed: 8
  });

  // In a real implementation, this would fetch from a weather API
  useEffect(() => {
    // Mock weather update every 5 minutes
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: prev.temperature + Math.floor(Math.random() * 3) - 1
      }));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = {
    sunny: SunIcon,
    cloudy: CloudIcon,
    rainy: CloudArrowDownIcon // Using CloudArrowDownIcon for rain
  }[weather.condition];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex items-center justify-between">
        <div>
          <Title>Weather</Title>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <WeatherIcon className="h-8 w-8 text-blue-500" />
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold">{weather.temperature}°F</div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.windSpeed} mph</p>
        </div>
      </div>
    </Card>
  );
}