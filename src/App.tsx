import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Dialer from './pages/Dialer';
import Contacts from './pages/Contacts';
import HallOfSales from './pages/HallOfSales';
import SalesCoach from './pages/SalesCoach';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HubspotCallback from './pages/HubspotCallback';
import PrivateRoute from './components/PrivateRoute';
import { DialerProvider } from './contexts/DialerContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { HubspotProvider } from './contexts/HubspotContext';

export default function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <HubspotProvider>
          <ThemeProvider>
            <UserProvider>
              <DialerProvider>
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/hubspot/callback" element={<HubspotCallback />} />
                    <Route
                      path="/*"
                      element={
                        <PrivateRoute>
                          <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                            <Sidebar />
                            <div className="flex-1 flex flex-col overflow-hidden">
                              <Header />
                              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                                <div className="container mx-auto px-6 py-8">
                                  <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/dialer" element={<Dialer />} />
                                    <Route path="/contacts" element={<Contacts />} />
                                    <Route path="/hall-of-sales" element={<HallOfSales />} />
                                    <Route path="/sales-coach" element={<SalesCoach />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/settings" element={<Settings />} />
                                  </Routes>
                                </div>
                              </main>
                            </div>
                          </div>
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Router>
              </DialerProvider>
            </UserProvider>
          </ThemeProvider>
        </HubspotProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}