import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from '../contexts/DatabaseContext';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserProfileDropdown() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useAuth();
  const { getUserProfile } = useDatabase();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
          email: userData.email || currentUser?.email || '',
          avatar: userData.avatar || 'https://via.placeholder.com/150'
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser || loading) return null;

  return (
    <Menu as="div" className="relative z-50">
      <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <img
          className="h-8 w-8 rounded-full ring-2 ring-blue-500 object-cover"
          src={profile?.avatar}
          alt=""
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {profile?.name}
        </span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{profile?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/profile')}
                  className={`${
                    active ? 'bg-gray-50 dark:bg-gray-700' : ''
                  } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  <UserCircleIcon className="mr-3 h-5 w-5" />
                  Your Profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/settings')}
                  className={`${
                    active ? 'bg-gray-50 dark:bg-gray-700' : ''
                  } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5" />
                  Settings
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleDarkMode}
                  className={`${
                    active ? 'bg-gray-50 dark:bg-gray-700' : ''
                  } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                >
                  {isDarkMode ? (
                    <SunIcon className="mr-3 h-5 w-5" />
                  ) : (
                    <MoonIcon className="mr-3 h-5 w-5" />
                  )}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-gray-50 dark:bg-gray-700' : ''
                  } flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}