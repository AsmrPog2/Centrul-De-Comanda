
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, User, Car, Shield } from 'lucide-react';

const NCICSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock NCIC database
  const mockDatabase = {
    persons: {
      'John Doe': {
        name: 'John Doe',
        dob: '1985-03-15',
        ssn: '***-**-1234',
        warrants: ['Outstanding warrant - Failure to appear'],
        alerts: ['Armed and dangerous'],
        criminalHistory: ['Assault (2019)', 'Drug possession (2021)']
      },
      'Jane Smith': {
        name: 'Jane Smith',
        dob: '1990-07-22',
        ssn: '***-**-5678',
        warrants: [],
        alerts: [],
        criminalHistory: ['No criminal history found']
      }
    },
    vehicles: {
      'ABC123': {
        plate: 'ABC123',
        make: 'Honda',
        model: 'Civic',
        year: '2018',
        color: 'Blue',
        status: 'Stolen',
        reportDate: '2024-01-15'
      },
      'XYZ789': {
        plate: 'XYZ789',
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        color: 'White',
        status: 'Clear',
        reportDate: null
      }
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Search in persons database
    const personResult = mockDatabase.persons[searchQuery as keyof typeof mockDatabase.persons];
    
    // Search in vehicles database
    const vehicleResult = mockDatabase.vehicles[searchQuery as keyof typeof mockDatabase.vehicles];
    
    if (personResult || vehicleResult) {
      setSearchResults({
        person: personResult,
        vehicle: vehicleResult,
        query: searchQuery
      });
    } else {
      setSearchResults({
        person: null,
        vehicle: null,
        query: searchQuery,
        noResults: true
      });
    }
    
    setIsSearching(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>NCIC Database Access</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          National Crime Information Center - FBI Criminal Justice Database
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Interface */}
          <div className="flex space-x-2">
            <Input
              placeholder="Enter name or license plate (Try: John Doe, Jane Smith, ABC123, XYZ789)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={!searchQuery || isSearching}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'Searching...' : 'Search NCIC'}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults && (
            <div className="mt-6">
              {searchResults.noResults ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No records found for "{searchResults.query}"</p>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="person" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="person" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Person Record</span>
                    </TabsTrigger>
                    <TabsTrigger value="vehicle" className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>Vehicle Record</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="person">
                    {searchResults.person ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Person Record Found</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold text-gray-700">Name:</label>
                                <p>{searchResults.person.name}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">Date of Birth:</label>
                                <p>{searchResults.person.dob}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">SSN:</label>
                                <p>{searchResults.person.ssn}</p>
                              </div>
                            </div>

                            {searchResults.person.warrants.length > 0 && (
                              <div>
                                <label className="font-semibold text-red-600 flex items-center space-x-1">
                                  <span>Active Warrants:</span>
                                </label>
                                {searchResults.person.warrants.map((warrant: string, idx: number) => (
                                  <Badge key={idx} variant="destructive" className="mr-2 mt-1">
                                    {warrant}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {searchResults.person.alerts.length > 0 && (
                              <div>
                                <label className="font-semibold text-orange-600 flex items-center space-x-1">
                                  <span>Alerts:</span>
                                </label>
                                {searchResults.person.alerts.map((alert: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="mr-2 mt-1 bg-orange-100 text-orange-800">
                                    {alert}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <div>
                              <label className="font-semibold text-gray-700">Criminal History:</label>
                              <ul className="list-disc list-inside mt-1">
                                {searchResults.person.criminalHistory.map((record: string, idx: number) => (
                                  <li key={idx} className="text-gray-600">{record}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">No person record found</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="vehicle">
                    {searchResults.vehicle ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Vehicle Record Found</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold text-gray-700">License Plate:</label>
                                <p>{searchResults.vehicle.plate}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">Make/Model:</label>
                                <p>{searchResults.vehicle.make} {searchResults.vehicle.model}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">Year:</label>
                                <p>{searchResults.vehicle.year}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">Color:</label>
                                <p>{searchResults.vehicle.color}</p>
                              </div>
                            </div>

                            <div>
                              <label className="font-semibold text-gray-700">Status:</label>
                              <div className="mt-1">
                                <Badge 
                                  variant={searchResults.vehicle.status === 'Stolen' ? 'destructive' : 'default'}
                                  className={searchResults.vehicle.status === 'Stolen' ? 'bg-red-600' : 'bg-green-600'}
                                >
                                  {searchResults.vehicle.status}
                                </Badge>
                              </div>
                            </div>

                            {searchResults.vehicle.reportDate && (
                              <div>
                                <label className="font-semibold text-gray-700">Report Date:</label>
                                <p>{searchResults.vehicle.reportDate}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">No vehicle record found</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </div>
          )}

          {/* Removed the restricted access warning */}
        </div>
      </CardContent>
    </Card>
  );
};

export default NCICSearch;
