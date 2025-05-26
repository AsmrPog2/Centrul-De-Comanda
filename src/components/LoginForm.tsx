
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: (badgeNumber: string, userData: any) => void;
}

// Mock database of personnel
const personnelDatabase = {
  'L001': { name: 'Officer John Martinez', role: 'LEO', department: 'Politia Romana', division: 'Central' },
  'L002': { name: 'Detective Sarah Johnson', role: 'LEO', department: 'Politia Romana', division: 'Hollywood' },
  'L003': { name: 'Sergeant Mike Chen', role: 'LEO', department: 'Politia Romana', division: 'West LA' },
  'E001': { name: 'Paramedic Lisa Rodriguez', role: 'EMS', department: 'Paramedic', station: 'Station 27' },
  'E002': { name: 'EMT David Kim', role: 'EMS', department: 'Paramedic', station: 'Station 15' },
  'D001': { name: 'Dispatcher Maria Gonzalez', role: 'DISPATCH', department: '911', center: 'Metro Dispatch' },
  'D002': { name: 'Dispatcher Robert Taylor', role: 'DISPATCH', department: '911', center: 'Valley Dispatch' }
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [badgeNumber, setBadgeNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = personnelDatabase[badgeNumber as keyof typeof personnelDatabase];
    
    if (userData) {
      onLogin(badgeNumber, userData);
      setError('');
    } else {
      setError('Invalid badge number. Please contact your supervisor.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Centrul de comandă al poliției Romane </CardTitle>
          <CardDescription className="text-gray-600">
            Secure Access Portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-gray-700 mb-2">
                Badge Number
              </label>
              <div className="relative">
                <Badge className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="badge"
                  type="text"
                  placeholder="Enter your badge number"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value.toUpperCase())}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
            >
              Access System
            </Button>
            
            <div className="text-xs text-gray-500 text-center mt-4">
              <p>Demo Badge Numbers:</p>
              <p>LEO: L001, L002, L003 | EMS: E001, E002 | Dispatch: D001, D002</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
