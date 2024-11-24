import { useState, useEffect } from 'react';
import { Card, Title } from '@tremor/react';
import {
  UserCircleIcon,
  TrophyIcon,
  AcademicCapIcon,
  PencilIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from '../contexts/DatabaseContext';

interface UserProfile {
  name: string;
  bio: string;
  role: string;
  avatar?: string;
  stats?: {
    callsMade: number;
    dealsWon: number;
    revenue: number;
  };
  salesRank?: number;
  coachingScore?: number;
  achievements?: {
    title: string;
    date: string;
  }[];
}

export default function Profile() {
  const { currentUser } = useAuth();
  const { getUserProfile, updateUserProfile } = useDatabase();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    bio: '',
    role: '',
    stats: {
      callsMade: 0,
      dealsWon: 0,
      revenue: 0
    },
    salesRank: 0,
    coachingScore: 0,
    achievements: []
  });

  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    role: ''
  });

  useEffect(() => {
    loadUserProfile();
  }, [currentUser]);

  async function loadUserProfile() {
    try {
      setLoading(true);
      const userData = await getUserProfile();
      if (userData) {
        setProfile({
          name: userData.name || currentUser?.email?.split('@')[0] || '',
          bio: userData.bio || '',
          role: userData.role || 'Sales Representative',
          avatar: userData.avatar || 'https://via.placeholder.com/150',
          stats: userData.stats || {
            callsMade: 0,
            dealsWon: 0,
            revenue: 0
          },
          salesRank: userData.salesRank || 0,
          coachingScore: userData.coachingScore || 0,
          achievements: userData.achievements || []
        });
        setEditForm({
          name: userData.name || '',
          bio: userData.bio || '',
          role: userData.role || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    try {
      await updateUserProfile(editForm);
      setProfile(prev => ({
        ...prev,
        ...editForm
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-20 w-20 rounded-full border-4 border-white"
            />
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                    placeholder="Your name"
                  />
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
                    placeholder="Your role"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-blue-100">{profile.role}</p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            {isEditing ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <PencilIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Bio & Stats */}
        <div className="space-y-6">
          <Card>
            <Title>About</Title>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows={4}
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="mt-4 text-gray-600 dark:text-gray-300">{profile.bio}</p>
            )}
          </Card>

          <Card>
            <Title>Statistics</Title>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Calls Made</span>
                <span className="font-semibold">{profile.stats?.callsMade}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Deals Won</span>
                <span className="font-semibold">{profile.stats?.dealsWon}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Revenue Generated</span>
                <span className="font-semibold">${(profile.stats?.revenue || 0).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Center Column - Rankings & Scores */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-2">
              <TrophyIcon className="h-6 w-6 text-yellow-500" />
              <Title>Hall of Sales Ranking</Title>
            </div>
            <div className="mt-4 text-center">
              <p className="text-5xl font-bold text-yellow-500">#{profile.salesRank}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Global Ranking</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-6 w-6 text-purple-500" />
              <Title>Coaching Score</Title>
            </div>
            <div className="mt-4 text-center">
              <p className="text-5xl font-bold text-purple-500">{profile.coachingScore}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Performance Score</p>
            </div>
          </Card>
        </div>

        {/* Right Column - Achievements */}
        <Card>
          <Title>Recent Achievements</Title>
          <div className="mt-4 space-y-4">
            {profile.achievements?.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <TrophyIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}