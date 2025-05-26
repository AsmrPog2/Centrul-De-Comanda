
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Car, FileText } from 'lucide-react';

const LEADSSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock LEADS database
  const mockDatabase = {
    vehicles: {
      'ABC123': {
        plate: 'ABC123',
        vin: '1HGCM82633A123456',
        make: 'Honda',
        model: 'Civic',
        year: '2018',
        color: 'Blue',
        owner: 'John Smith',
        address: '123 Main St, Los Angeles, CA',
        registration: 'Valid until 2025-03-15',
        insurance: 'State Farm - Active'
      }
    },
    licenses: {
      'D1234567': {
        licenseNumber: 'D1234567',
        name: 'Sarah Johnson',
        address: '456 Oak Ave, Los Angeles, CA',
        dob: '1990-05-20',
        class: 'C',
        status: 'Valid',
        expires: '2026-05-20',
        restrictions: 'None',
        endorsements: 'None'
      }
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search in vehicles database
    const vehicleResult = mockDatabase.vehicles[searchQuery as keyof typeof mockDatabase.vehicles];
    
    // Search in licenses database
    const licenseResult = mockDatabase.licenses[searchQuery as keyof typeof mockDatabase.licenses];
    
    if (vehicleResult || licenseResult) {
      setSearchResults({
        vehicle: vehicleResult,
        license: licenseResult,
        query: searchQuery
      });
    } else {
      setSearchResults({
        vehicle: null,
        license: null,
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
          <Search className="h-5 w-5" />
          <span>LEADS System Access</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Law Enforcement Agencies Data System - Vehicle Registration & Driver License Database
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Interface */}
          <div className="flex space-x-2">
            <Input
              placeholder="Enter license plate or driver license number (Try: ABC123, D1234567)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={!searchQuery || isSearching}
              className="bg-green-600 hover:bg-green-700"
            >
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? 'Searching...' : 'Search LEADS'}
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
                <Tabs defaultValue="vehicle" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vehicle" className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span>Vehicle Registration</span>
                    </TabsTrigger>
                    <TabsTrigger value="license" className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Driver License</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="vehicle">
                    {searchResults.vehicle ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Vehicle Registration Record</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold text-gray-700">License Plate:</label>
                                <p>{searchResults.vehicle.plate}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">VIN:</label>
                                <p className="font-mono text-sm">{searchResults.vehicle.vin}</p>
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

                            <div className="border-t pt-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Owner Information</h4>
                              <div className="grid grid-cols-1 gap-2">
                                <div>
                                  <label className="font-medium text-gray-600">Name:</label>
                                  <p>{searchResults.vehicle.owner}</p>
                                </div>
                                <div>
                                  <label className="font-medium text-gray-600">Address:</label>
                                  <p>{searchResults.vehicle.address}</p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Registration Status</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span>Registration:</span>
                                  <Badge variant="default" className="bg-green-600">
                                    {searchResults.vehicle.registration}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Insurance:</span>
                                  <Badge variant="default" className="bg-blue-600">
                                    {searchResults.vehicle.insurance}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">No vehicle registration found</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="license">
                    {searchResults.license ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Driver License Record</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="font-semibold text-gray-700">License Number:</label>
                                <p className="font-mono">{searchResults.license.licenseNumber}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">Name:</label>
                                <p>{searchResults.license.name}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">Date of Birth:</label>
                                <p>{searchResults.license.dob}</p>
                              </div>
                              <div>
                                <label className="font-semibold text-gray-700">License Class:</label>
                                <p>{searchResults.license.class}</p>
                              </div>
                            </div>

                            <div>
                              <label className="font-semibold text-gray-700">Address:</label>
                              <p>{searchResults.license.address}</p>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-semibold text-gray-700 mb-2">License Status</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span>Status:</span>
                                  <Badge variant="default" className="bg-green-600">
                                    {searchResults.license.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Expires:</span>
                                  <span>{searchResults.license.expires}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Restrictions:</span>
                                  <span>{searchResults.license.restrictions}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Endorsements:</span>
                                  <span>{searchResults.license.endorsements}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500">No driver license record found</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </div>
          )}

          {/* Removed the authorized use only warning */}
        </div>
      </CardContent>
    </Card>
  );
};

export default LEADSSearch;
