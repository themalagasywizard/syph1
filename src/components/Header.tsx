import { BellIcon } from '@heroicons/react/24/outline';
import UserProfileDropdown from './UserProfileDropdown';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-primary-600">
            Syph
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}