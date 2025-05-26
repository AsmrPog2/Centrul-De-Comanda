
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Power, PowerOff, Database, Search, Car, Users, AlertTriangle, MessageSquare, Check, X, Logs } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NCICSearch from './NCICSearch';
import LEADSSearch from './LEADSSearch';

interface LEODashboardProps {
  userData: any;
  badgeNumber: string;
  onLogout: () => void;
}

const LEODashboard: React.FC<LEODashboardProps> = ({ userData, badgeNumber, onLogout }) => {
  const [onDuty, setOnDuty] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCalls, setActiveCalls] = useState([
    { id: 1, type: 'Tulburări domestice', address: '1234 Main St', priority: 'Ridicat', status: 'În așteptare', time: '14:30' },
    { id: 2, type: 'Oprirea Traficului', address: '5678 Oak Ave', priority: 'Scăzut', status: 'În așteptare', time: '14:45' },
    { id: 3, type: 'Efractie', address: '910 Pine Rd', priority: 'Medium', status: 'În așteptare', time: '15:00' }
  ]);
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, time: '14:30', message: 'Schimba a început', type: 'system' },
    { id: 2, time: '14:35', message: 'Apel nou primit: Perturbare internă', type: 'call' },
    { id: 3, time: '14:45', message: 'Apel nou primit: Oprire trafic', type: 'call' }
  ]);
  
  const availableUnits = [
    { id: 1, unit: 'Unitatea 2', type: 'Patrulare' },
    { id: 2, unit: 'Unitatea 5', type: 'K9' },
    { id: 3, unit: 'Unitatea 8', type: 'Trafic' }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDuty = () => {
    setOnDuty(!onDuty);
    addLog(`Officer ${userData.name} went ${!onDuty ? 'on' : 'off'} duty`, 'system');
  };
  
  const acceptCall = (callId: number) => {
    setActiveCalls(calls => 
      calls.map(call => 
        call.id === callId ? { ...call, status: 'Acceptat' } : call
      )
    );
    const call = activeCalls.find(call => call.id === callId);
    if (call) {
      addLog(`Acceptat call: ${call.type} at ${call.address}`, 'action');
    }
  };
  
  const denyCall = (callId: number) => {
    setActiveCalls(calls => 
      calls.map(call => 
        call.id === callId ? { ...call, status: 'Negat' } : call
      )
    );
    const call = activeCalls.find(call => call.id === callId);
    if (call) {
      addLog(`Negat call: ${call.type} at ${call.address}`, 'action');
    }
  };
  
  const dispatchUnit = (callId: number, unitId: number) => {
    setActiveCalls(calls => 
      calls.map(call => 
        call.id === callId ? { ...call, status: 'Dispatched', assignedUnit: unitId } : call
      )
    );
    const call = activeCalls.find(call => call.id === callId);
    const unit = availableUnits.find(unit => unit.id === unitId);
    if (call && unit) {
      addLog(`Dispatched ${unit.unit} to call: ${call.type} at ${call.address}`, 'action');
    }
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      addLog(`Message to Dispatch: ${message}`, 'message');
      setMessage('');
    }
  };
  
  const addLog = (message: string, type: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [...prev, { id: prev.length + 1, time, message, type }]);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Ridicat': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Scăzut': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Politia Romana Command Center</h1>
              <p className="text-blue-200 text-sm">Centrul De Comanda</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={onDuty ? "default" : "secondary"} className="text-sm">
              {onDuty ? "ON DUTY" : "OFF DUTY"}
            </Badge>
            <div className="text-right text-sm">
              <p>{currentTime.toLocaleTimeString()}</p>
              <p>{currentTime.toLocaleDateString()}</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="text-white border-white hover:bg-white hover:text-blue-900">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Officer Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Officer Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Informații ofițer</h3>
                <p className="text-lg font-bold">{userData.name}</p>
                <p className="text-gray-600">Badge #{badgeNumber}</p>
                <p className="text-gray-600">{userData.department} - {userData.division}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Stare</h3>
                <div className="flex items-center space-x-2 mt-2">
                  {onDuty ? (
                    <Power className="h-5 w-5 text-green-600" />
                  ) : (
                    <PowerOff className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${onDuty ? 'text-green-600' : 'text-red-600'}`}>
                    {onDuty ? 'ON DUTY' : 'OFF DUTY'}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Button 
                  onClick={toggleDuty}
                  className={`w-full ${onDuty ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {onDuty ? (
                    <>
                      <PowerOff className="h-4 w-4 mr-2" />
                      Pleacă în afara serviciului
                    </>
                  ) : (
                    <>
                      <Power className="h-4 w-4 mr-2" />
                      Du-te la datorie
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="calls" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calls" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Apeluri active</span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Mesaje</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <Logs className="h-4 w-4" />
              <span>Jurnalele de activitate</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Căutare în baze de date</span>
            </TabsTrigger>
          </TabsList>

          {/* Active Calls Tab */}
          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Apeluri de urgență active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCalls.map((call) => (
                    <div key={call.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{call.type}</h3>
                            <Badge className={`text-xs ${getPriorityColor(call.priority)}`}>
                              {call.priority} Priority
                            </Badge>
                            <span className="text-sm text-gray-500">{call.time}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{call.address}</p>
                          <Badge variant={
                            call.status === 'Acceptat' ? 'default' : 
                            call.status === 'Negat' ? 'destructive' :
                            call.status === 'Expediat' ? 'outline' : 'secondary'
                          } className="mt-2">
                            {call.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2 mt-2 sm:mt-0">
                          {call.status === 'Pending' && onDuty && (
                            <>
                              <Button 
                                onClick={() => acceptCall(call.id)}
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Accepta
                              </Button>
                              <Button 
                                onClick={() => denyCall(call.id)} 
                                className="bg-red-600 hover:bg-red-700"
                                size="sm"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Negați
                              </Button>
                            </>
                          )}
                          {call.status === 'Acceptat' && (
                            <div className="relative">
                              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                                Unitatea de expediere
                              </Button>
                              <div className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg z-10 hidden group-hover:block hover:block">
                                {availableUnits.map(unit => (
                                  <button 
                                    key={unit.id}
                                    onClick={() => dispatchUnit(call.id, unit.id)}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                  >
                                    {unit.unit} - {unit.type}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {activeCalls.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nu există apeluri active în acest moment
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messaging Tab */}
          <TabsContent value="messaging">
            <Card>
              <CardHeader>
                <CardTitle>Trimiterea mesajului</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Type your message to dispatch here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={sendMessage} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Jurnalele de activitate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {logs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`p-2 rounded-md text-sm ${
                        log.type === 'system' ? 'bg-blue-50 text-blue-700' :
                        log.type === 'call' ? 'bg-yellow-50 text-yellow-700' :
                        log.type === 'action' ? 'bg-green-50 text-green-700' :
                        'bg-purple-50 text-purple-700'
                      }`}
                    >
                      <span className="font-semibold">[{log.time}]</span> {log.message}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Search Tab */}
          <TabsContent value="database">
            <Tabs defaultValue="ncic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ncic" className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>NCIC Database</span>
                </TabsTrigger>
                <TabsTrigger value="leads" className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>LEADS System</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ncic">
                <NCICSearch />
              </TabsContent>

              <TabsContent value="leads">
                <LEADSSearch />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Apeluri active</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Unități disponibile</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Car className="h-8 w-8 text-blue-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Ofițeri de serviciu</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Apeluri prioritare</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LEODashboard;
