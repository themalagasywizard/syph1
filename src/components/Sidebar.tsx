import { HomeIcon, PhoneIcon, UserGroupIcon, Cog6ToothIcon, TrophyIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Dialer', href: '/dialer', icon: PhoneIcon },
  { name: 'Contacts', href: '/contacts', icon: UserGroupIcon },
  { name: 'Hall of Sales', href: '/hall-of-sales', icon: TrophyIcon },
  { name: 'Sales Coach', href: '/sales-coach', icon: AcademicCapIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-primary-600">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6">
              <span className="text-2xl font-bold text-white">Syph</span>
            </div>
            <nav className="mt-8 flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const current = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      current
                        ? 'bg-primary-700 text-white'
                        : 'text-primary-100 hover:bg-primary-700'
                    } group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150`}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}