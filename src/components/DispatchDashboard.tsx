import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Radio, Users, Database, Phone, Send, MapPin, Clock, MessageSquare, Search } from 'lucide-react';

interface DispatchDashboardProps {
  userData: any;
  badgeNumber: string;
  onLogout: () => void;
}

const DispatchDashboard: React.FC<DispatchDashboardProps> = ({ userData, badgeNumber, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newCall, setNewCall] = useState({
    type: '',
    priority: '',
    address: '',
    description: '',
    assignedUnit: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('person');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    content: '',
    urgency: 'normal'
  });

  const [activeCalls, setActiveCalls] = useState([
    { id: 1, type: 'Tulburări domestice', address: '1234 Main St', priority: 'Ridicat', unit: 'Unitatea 12', status: 'Expediat', time: '14:30' },
    { id: 2, type: 'Oprirea Traficului', address: '5678 Oak Ave', priority: 'Scăzut', unit: 'Unitatea  7', status: 'În curs', time: '14:25' },
    { id: 3, type: 'Urgenta medicala', address: '9012 Pine Rd', priority: 'Ridicat', unit: 'Ambulanta 3', status: 'Drum', time: '14:35' },
  ]);
  
  const [units, setUnits] = useState([
    { id: 1, unit: 'Unitatea 1', type: 'LEO', status: 'Disponibil', officer: 'John Smith', lastUpdate: '14:25' },
    { id: 2, unit: 'Unitatea 3', type: 'LEO', status: 'Expediat', officer: 'Robert Johnson', lastUpdate: '14:10' },
    { id: 3, unit: 'Unitatea 7', type: 'LEO', status: 'În curs', officer: 'Michael Williams', lastUpdate: '14:20' },
    { id: 4, unit: 'Unitatea 9', type: 'LEO', status: 'Defect', officer: 'David Brown', lastUpdate: '13:45' },
    { id: 5, unit: 'Ambulanta 1', type: 'EMS', status: 'In afara serviciului', paramedic: 'Sarah Connor', lastUpdate: '14:15' },
    { id: 6, unit: 'Ambulanta 3', type: 'EMS', status: 'Drum', paramedic: 'James Wilson', lastUpdate: '14:35' },
    { id: 7, unit: 'Ambulanta 5', type: 'EMS', status: 'Disponibil', paramedic: 'Emily Davis', lastUpdate: '14:05' },
  ]);

  // Mock database for search
  const mockDatabase = {
    persons: {
      'John Doe': {
        name: 'John Doe',
        dob: '1985-03-15',
        address: '1234 Oak Street, Los Angeles, CA',
        dlNumber: 'CA12345678',
        status: 'Has active warrants',
        warrants: ['Outstanding warrant - Failure to appear'],
        criminalHistory: ['Assault (2019)', 'Drug possession (2021)']
      },
      'Jane Smith': {
        name: 'Jane Smith',
        dob: '1990-07-22',
        address: '5678 Pine Avenue, Los Angeles, CA',
        dlNumber: 'CA87654321',
        status: 'Clear',
        warrants: [],
        criminalHistory: ['No criminal history found']
      },
      'Robert Johnson': {
        name: 'Robert Johnson',
        dob: '1975-11-30',
        address: '910 Maple Drive, Los Angeles, CA',
        dlNumber: 'CA55556666',
        status: 'Clear',
        warrants: [],
        criminalHistory: ['DUI (2015)']
      }
    },
    vehicles: {
      'ABC123': {
        plate: 'ABC123',
        vin: '1HGCM82633A123456',
        make: 'Honda',
        model: 'Civic',
        year: '2018',
        color: 'Blue',
        owner: 'John Smith',
        status: 'Stolen',
        reportDate: '2024-01-15'
      },
      'XYZ789': {
        plate: 'XYZ789',
        vin: '5TDZA23C13S012345',
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        color: 'White',
        owner: 'Jane Smith',
        status: 'Clear',
        reportDate: null
      },
      'LMN456': {
        plate: 'LMN456',
        vin: '1FTEW1E53MFA12345',
        make: 'Ford',
        model: 'F-150',
        year: '2021',
        color: 'Black',
        owner: 'Robert Johnson',
        status: 'Clear',
        reportDate: null
      }
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDispatchCall = () => {
    if (newCall.type && newCall.priority && newCall.address && newCall.assignedUnit) {
      const call = {
        id: activeCalls.length + 1,
        type: newCall.type,
        address: newCall.address,
        priority: newCall.priority,
        unit: newCall.assignedUnit,
        status: 'Dispatched',
        time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setActiveCalls([call, ...activeCalls]);
      
      // Update unit status
      setUnits(prev => prev.map(unit => 
        unit.unit === newCall.assignedUnit ? {...unit, status: 'Dispatched', lastUpdate: call.time} : unit
      ));
      
      setNewCall({ type: '', priority: '', address: '', description: '', assignedUnit: '' });
    }
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    
    if (searchType === 'person') {
      const result = mockDatabase.persons[searchQuery as keyof typeof mockDatabase.persons];
      setSearchResults({ type: 'person', data: result });
    } else {
      const result = mockDatabase.vehicles[searchQuery as keyof typeof mockDatabase.vehicles];
      setSearchResults({ type: 'vehicle', data: result });
    }
  };
  
  const sendMessage = () => {
    if (newMessage.recipient && newMessage.content) {
      // In a real app, this would send the message to the recipient
      console.log(`Message to ${newMessage.recipient}: ${newMessage.content} (Urgency: ${newMessage.urgency})`);
      setNewMessage({ recipient: '', content: '', urgency: 'normal' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Ridicat': return 'bg-red-600';
      case 'Mediu': return 'bg-orange-600';
      case 'Scăzut': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponibil': return 'bg-green-100 text-green-800';
      case 'Expediat': return 'bg-blue-100 text-blue-800';
      case 'Spre Drum': return 'bg-blue-100 text-blue-800';
      case 'În curs': return 'bg-yellow-100 text-yellow-800';
      case 'In Afara serviciului': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Radio className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Centrul de comandă de expediere</h1>
              <p className="text-purple-200 text-sm">Comunicații de urgență</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p>{currentTime.toLocaleTimeString()}</p>
              <p>{currentTime.toLocaleDateString()}</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="text-white border-white hover:bg-white hover:text-purple-700">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Dispatcher Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Radio className="h-5 w-5" />
              <span>Dispatcher Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Informații despre dispecer</h3>
                <p className="text-lg font-bold">{userData.name}</p>
                <p className="text-gray-600">Badge #{badgeNumber}</p>
                <p className="text-gray-600">{userData.department} - {userData.center}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Stare sistem</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-semibold">Toate sistemele online</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dispatch Tabs */}
        <Tabs defaultValue="dispatch" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dispatch" className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Apeluri de expediere</span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Mesaje</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Căutare în baze de date</span>
            </TabsTrigger>
            <TabsTrigger value="units" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Stare unitate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dispatch" className="space-y-6">
            {/* New Call Dispatch */}
            <Card>
              <CardHeader>
                <CardTitle>Creați o nouă expediere</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tip de apel</label>
                    <Select value={newCall.type} onValueChange={(value) => setNewCall({...newCall, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select call type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Traffic Stop">Oprirea Traficului</SelectItem>
                        <SelectItem value="Domestic Disturbance">Tulburări domestice</SelectItem>
                        <SelectItem value="Medical Emergency">Urgenta medicala</SelectItem>
                        <SelectItem value="Burglary">Efractie</SelectItem>
                        <SelectItem value="Vehicle Accident">Accident de vehicul</SelectItem>
                        <SelectItem value="Welfare Check">Verificarea bunăstării</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Prioritate</label>
                    <Select value={newCall.priority} onValueChange={(value) => setNewCall({...newCall, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectați prioritate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">Prioritate mare</SelectItem>
                        <SelectItem value="Medium">Prioritate medie</SelectItem>
                        <SelectItem value="Low">Prioritate scăzută</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Adresa</label>
                    <Input 
                      placeholder="Introdu adresa"
                      value={newCall.address}
                      onChange={(e) => setNewCall({...newCall, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Atribuiți unitatea</label>
                    <Select value={newCall.assignedUnit} onValueChange={(value) => setNewCall({...newCall, assignedUnit: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectați unitatea" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.filter(unit => unit.status === 'Available').map(unit => (
                          <SelectItem key={unit.id} value={unit.unit}>
                            {unit.unit} ({unit.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Descriere</label>
                    <Textarea 
                      placeholder="Introduceți detaliile apelului"
                      value={newCall.description}
                      onChange={(e) => setNewCall({...newCall, description: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button onClick={handleDispatchCall} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4 mr-2" />
                      Apel de expediere
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Calls */}
            <Card>
              <CardHeader>
                <CardTitle>Apeluri active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeCalls.map((call) => (
                    <div key={call.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{call.type}</h3>
                            <Badge className={`text-white ${getPriorityColor(call.priority)}`}>
                              {call.priority}
                            </Badge>
                            <span className="text-sm text-gray-500">{call.time}</span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{call.address}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Radio className="h-4 w-4" />
                              <span>{call.unit}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {call.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messaging Tab */}
          <TabsContent value="messaging">
            <Card>
              <CardHeader>
                <CardTitle>Trimiteți un mesaj către unități</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Destinatar</label>
                    <Select value={newMessage.recipient} onValueChange={(value) => setNewMessage({...newMessage, recipient: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectați destinatarul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_leo">Toate unitățile LEO</SelectItem>
                        <SelectItem value="all_ems">Toate unitățile EMS</SelectItem>
                        <SelectItem value="all">All Units</SelectItem>
                        {units.map(unit => (
                          <SelectItem key={unit.id} value={unit.unit}>
                            {unit.unit} ({unit.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Urgenţă</label>
                    <Select value={newMessage.urgency} onValueChange={(value) => setNewMessage({...newMessage, urgency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Urgență ridicată</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="low">Urgență scăzută</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mesaj</label>
                    <Textarea 
                      placeholder="Introduceți mesajul aici..."
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button onClick={sendMessage} className="w-full bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    Trimite mesaj
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Căutare în baze de date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="person">Căutare persoane</SelectItem>
                          <SelectItem value="vehicle">Căutare de vehicule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-[3]">
                      <Input 
                        placeholder={searchType === 'person' ? "Introduceți numele (Încercați: John Doe, Jane Smith)" : "Introduceți plăcuța de înmatriculare (Încercați: ABC123, XYZ789)"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                      <Search className="h-4 w-4 mr-2" />
                      Căutare
                    </Button>
                  </div>

                  {searchResults && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle>
                          {searchResults.type === 'person' ? 'Person Record' : 'Vehicle Record'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {searchResults.data ? (
                          <div className="space-y-4">
                            {searchResults.type === 'person' ? (
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="font-semibold text-gray-700">Name:</label>
                                    <p>{searchResults.data.name}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">Date of Birth:</label>
                                    <p>{searchResults.data.dob}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">Address:</label>
                                    <p>{searchResults.data.address}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">Driver License:</label>
                                    <p>{searchResults.data.dlNumber}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="font-semibold text-gray-700">Status:</label>
                                  <Badge className={searchResults.data.status === 'Clear' ? 'bg-green-600' : 'bg-red-600'}>
                                    {searchResults.data.status}
                                  </Badge>
                                </div>
                                {searchResults.data.warrants.length > 0 && (
                                  <div>
                                    <label className="font-semibold text-red-600">Active Warrants:</label>
                                    {searchResults.data.warrants.map((warrant: string, idx: number) => (
                                      <p key={idx} className="text-red-600">{warrant}</p>
                                    ))}
                                  </div>
                                )}
                                <div>
                                  <label className="font-semibold text-gray-700">Criminal History:</label>
                                  <ul className="list-disc list-inside mt-1">
                                    {searchResults.data.criminalHistory.map((record: string, idx: number) => (
                                      <li key={idx} className="text-gray-600">{record}</li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="font-semibold text-gray-700">License Plate:</label>
                                    <p>{searchResults.data.plate}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">VIN:</label>
                                    <p className="font-mono">{searchResults.data.vin}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">Make/Model:</label>
                                    <p>{searchResults.data.make} {searchResults.data.model}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">Year/Color:</label>
                                    <p>{searchResults.data.year}, {searchResults.data.color}</p>
                                  </div>
                                  <div>
                                    <label className="font-semibold text-gray-700">Owner:</label>
                                    <p>{searchResults.data.owner}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="font-semibold text-gray-700">Status:</label>
                                  <Badge className={searchResults.data.status === 'Clear' ? 'bg-green-600' : 'bg-red-600'}>
                                    {searchResults.data.status}
                                  </Badge>
                                </div>
                                {searchResults.data.reportDate && (
                                  <div>
                                    <label className="font-semibold text-red-600">Report Date:</label>
                                    <p>{searchResults.data.reportDate}</p>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ) : (
                          <p className="text-center text-gray-500">No records found for this search.</p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units">
            <Card>
              <CardHeader>
                <CardTitle>Consiliul de stare al unității</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-700">Unități disponibile</h3>
                    <p className="text-2xl font-bold text-green-600">{units.filter(unit => unit.status === 'Disponibil').length}</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-700">Unități expediate/active</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {units.filter(unit => ['Expediat', 'Spre Drum', 'În curs'].includes(unit.status)).length}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-700">In Afara Serviciului</h3>
                    <p className="text-2xl font-bold text-red-600">{units.filter(unit => unit.status === 'In Afara Serviciului').length}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Unitate</th>
                          <th className="border px-4 py-2 text-left">Tip</th>
                          <th className="border px-4 py-2 text-left">Stare</th>
                          <th className="border px-4 py-2 text-left">Personal</th>
                          <th className="border px-4 py-2 text-left">Ultima actualizare</th>
                          <th className="border px-4 py-2 text-left">Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {units.map((unit) => (
                          <tr key={unit.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{unit.unit}</td>
                            <td className="border px-4 py-2">{unit.type}</td>
                            <td className="border px-4 py-2">
                              <Badge className={getStatusColor(unit.status)}>
                                {unit.status}
                              </Badge>
                            </td>
                            <td className="border px-4 py-2">{unit.officer || unit.paramedic}</td>
                            <td className="border px-4 py-2">{unit.lastUpdate}</td>
                            <td className="border px-4 py-2">
                              <Select onValueChange={(value) => {
                                setUnits(prev => prev.map(u => 
                                  u.id === unit.id ? {...u, status: value, lastUpdate: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} : u
                                ));
                              }}>
                                <SelectTrigger className="h-8 w-full">
                                  <SelectValue placeholder="Actualizare stare" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Available">Set disponibil</SelectItem>
                                  <SelectItem value="Dispatched">Set expediat</SelectItem>
                                  <SelectItem value="En Route">Set En Route</SelectItem>
                                  <SelectItem value="In Progress">Set în curs</SelectItem>
                                  <SelectItem value="Out of Service">Ieșit din serviciu</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DispatchDashboard;
