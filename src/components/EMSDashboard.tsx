
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Power, PowerOff, Phone, CheckCircle, Clock, AlertTriangle, Ambulance, MessageSquare, X, Logs, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface EMSDashboardProps {
  userData: any;
  badgeNumber: string;
  onLogout: () => void;
}

const EMSDashboard: React.FC<EMSDashboardProps> = ({ userData, badgeNumber, onLogout }) => {
  const [onDuty, setOnDuty] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCalls, setActiveCalls] = useState([
    { id: 1, type: 'Medical Emergency', address: '1234 Main St', priority: 'High', status: 'Pending' },
    { id: 2, type: 'Vehicle Accident', address: '5678 Oak Ave', priority: 'Medium', status: 'Pending' },
    { id: 3, type: 'Chest Pain', address: '9012 Pine Rd', priority: 'High', status: 'Pending' },
  ]);
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, time: '14:30', message: 'Shift started', type: 'system' },
    { id: 2, time: '14:35', message: 'New call received: Medical Emergency', type: 'call' },
    { id: 3, time: '14:40', message: 'New call received: Vehicle Accident', type: 'call' },
  ]);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDuty = () => {
    setOnDuty(!onDuty);
    addLog(`Paramedic ${userData.name} went ${!onDuty ? 'on' : 'off'} duty`, 'system');
  };

  const acceptCall = (callId: number) => {
    setActiveCalls(calls => 
      calls.map(call => 
        call.id === callId ? { ...call, status: 'Accepted' } : call
      )
    );
    const call = activeCalls.find(call => call.id === callId);
    if (call) {
      addLog(`Accepted call: ${call.type} at ${call.address}`, 'action');
    }
  };
  
  const denyCall = (callId: number) => {
    setActiveCalls(calls => 
      calls.map(call => 
        call.id === callId ? { ...call, status: 'Denied' } : call
      )
    );
    const call = activeCalls.find(call => call.id === callId);
    if (call) {
      addLog(`Denied call: ${call.type} at ${call.address}`, 'action');
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
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heart className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Centrul de comandă EMS</h1>
              <p className="text-red-200 text-sm">Emergency Medical Services</p>
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
            <Button variant="outline" onClick={onLogout} className="text-white border-white hover:bg-white hover:text-red-600">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Paramedic Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>EMS Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Personnel Information</h3>
                <p className="text-lg font-bold">{userData.name}</p>
                <p className="text-gray-600">Badge #{badgeNumber}</p>
                <p className="text-gray-600">{userData.department} - {userData.station}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Status</h3>
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
                      Go Off Duty
                    </>
                  ) : (
                    <>
                      <Power className="h-4 w-4 mr-2" />
                      Go On Duty
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="calls" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calls" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Emergency Calls</span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Messaging</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <Logs className="h-4 w-4" />
              <span>Activity Logs</span>
            </TabsTrigger>
          </TabsList>

          {/* Emergency Calls Tab */}
          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Active Emergency Calls</CardTitle>
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
                          </div>
                          <p className="text-gray-600 mt-1">{call.address}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {call.status === 'Accepted' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : call.status === 'Denied' ? (
                              <X className="h-4 w-4 text-red-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-orange-600" />
                            )}
                            <span className={`text-sm ${
                              call.status === 'Accepted' ? 'text-green-600' : 
                              call.status === 'Denied' ? 'text-red-600' : 
                              'text-orange-600'
                            }`}>
                              {call.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-2 sm:mt-0">
                          {call.status === 'Pending' && onDuty && (
                            <>
                              <Button 
                                onClick={() => acceptCall(call.id)}
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept Call
                              </Button>
                              <Button 
                                onClick={() => denyCall(call.id)}
                                className="bg-red-600 hover:bg-red-700"
                                size="sm"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Deny Call
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {activeCalls.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No active calls at this time
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
                <CardTitle>Message Dispatch</CardTitle>
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
                    <Send className="h-4 w-4 mr-2" />
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
                <CardTitle>Activity Logs</CardTitle>
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
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Emergency Calls</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Available Units</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Ambulance className="h-8 w-8 text-blue-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">On Duty Personnel</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Heart className="h-8 w-8 text-green-500" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-gray-600">Critical Calls</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EMSDashboard;
