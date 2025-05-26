
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LEODashboard from '../components/LEODashboard';
import EMSDashboard from '../components/EMSDashboard';
import DispatchDashboard from '../components/DispatchDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [badgeNumber, setBadgeNumber] = useState('');

  const handleLogin = (badge: string, user: any) => {
    setBadgeNumber(badge);
    setUserData(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setBadgeNumber('');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Route to appropriate dashboard based on user role
  switch (userData.role) {
    case 'LEO':
      return <LEODashboard userData={userData} badgeNumber={badgeNumber} onLogout={handleLogout} />;
    case 'EMS':
      return <EMSDashboard userData={userData} badgeNumber={badgeNumber} onLogout={handleLogout} />;
    case 'DISPATCH':
      return <DispatchDashboard userData={userData} badgeNumber={badgeNumber} onLogout={handleLogout} />;
    default:
      return <LoginForm onLogin={handleLogin} />;
  }
};

export default Index;
