import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { 
  Filter, 
  MapPin, 
  Sprout, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  User,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCollectionEvents } from '@/data/mock-data';

// Custom marker icons
const createCustomIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="8" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="4" fill="white"/>
    </svg>
  `)}`,
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -12.5],
});

const compliantIcon = createCustomIcon('#10b981');
const violationIcon = createCustomIcon('#ef4444');
const pendingIcon = createCustomIcon('#f59e0b');

export default function HarvestMonitor() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return mockCollectionEvents.filter(event => {
      const speciesMatch = selectedSpecies === 'all' || event.species.includes(selectedSpecies);
      const statusMatch = selectedStatus === 'all' || event.complianceStatus === selectedStatus;
      return speciesMatch && statusMatch;
    });
  }, [selectedSpecies, selectedStatus]);

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case 'compliant': return compliantIcon;
      case 'violation': return violationIcon;
      default: return pendingIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-primary bg-primary/10';
      case 'violation': return 'text-destructive bg-destructive/10';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const center: [number, number] = [26.9124, 75.7873]; // Rajasthan, India

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Harvest Monitor</h1>
          <p className="text-muted-foreground mt-1">
            Real-time geo-tagged collection events and compliance monitoring
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="Ashwagandha">Ashwagandha</SelectItem>
              <SelectItem value="Turmeric">Turmeric</SelectItem>
              <SelectItem value="Brahmi">Brahmi</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="compliant">Compliant</SelectItem>
              <SelectItem value="violation">Violation</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Compliant Events</p>
              <p className="text-xl font-bold">
                {mockCollectionEvents.filter(e => e.complianceStatus === 'compliant').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Violations</p>
              <p className="text-xl font-bold text-destructive">
                {mockCollectionEvents.filter(e => e.complianceStatus === 'violation').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-muted/50 rounded-lg">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Quantity</p>
              <p className="text-xl font-bold">
                {mockCollectionEvents.reduce((sum, e) => sum + e.quantity, 0)} kg
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 gradient-sage rounded-lg">
              <Sprout className="w-5 h-5 text-sage-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Sustainability</p>
              <p className="text-xl font-bold">
                {(mockCollectionEvents.reduce((sum, e) => sum + e.sustainabilityScore, 0) / mockCollectionEvents.length).toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Map and Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Collection Event Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[520px]">
              <MapContainer
                center={center}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                className="rounded-b-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {filteredEvents.map((event) => (
                  <div key={event.id}>
                    <Marker
                      position={[event.location.latitude, event.location.longitude]}
                      icon={getMarkerIcon(event.complianceStatus)}
                      eventHandlers={{
                        click: () => setSelectedEvent(event.id)
                      }}
                    >
                      <Popup className="custom-popup">
                        <div className="p-2 min-w-[200px]">
                          <div className="font-semibold text-sm mb-2">{event.species}</div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>Farmer:</span>
                              <span>{event.farmerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span>{event.quantity} {event.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sustainability:</span>
                              <span>{event.sustainabilityScore}/10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Status:</span>
                              <Badge className={`${getStatusColor(event.complianceStatus)} capitalize text-xs`}>
                                {event.complianceStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                    
                    {/* Geo-fence circle for compliant areas */}
                    {event.complianceStatus === 'compliant' && (
                      <Circle
                        center={[event.location.latitude, event.location.longitude]}
                        radius={5000}
                        pathOptions={{ 
                          color: 'hsl(var(--primary))', 
                          fillColor: 'hsl(var(--primary))', 
                          fillOpacity: 0.1,
                          weight: 2 
                        }}
                      />
                    )}
                  </div>
                ))}
              </MapContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Details Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEvents.slice(0, 5).map((event) => (
                <div 
                  key={event.id}
                  className={`p-3 rounded-lg border transition-smooth cursor-pointer hover:shadow-md ${
                    selectedEvent === event.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.species}</p>
                      <p className="text-xs text-muted-foreground">{event.farmerName}</p>
                    </div>
                    <Badge className={`${getStatusColor(event.complianceStatus)} capitalize text-xs`}>
                      {event.complianceStatus}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Package className="w-3 h-3" />
                      {event.quantity} {event.unit}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sprout className="w-3 h-3" />
                      Sustainability: {event.sustainabilityScore}/10
                    </div>
                  </div>

                  {/* Violation indicators */}
                  {(event.geoFenceViolation || event.seasonalViolation) && (
                    <div className="mt-2 pt-2 border-t border-border space-y-1">
                      {event.geoFenceViolation && (
                        <div className="flex items-center gap-1 text-xs text-destructive">
                          <AlertTriangle className="w-3 h-3" />
                          Geo-fence violation
                        </div>
                      )}
                      {event.seasonalViolation && (
                        <div className="flex items-center gap-1 text-xs text-destructive">
                          <AlertTriangle className="w-3 h-3" />
                          Seasonal violation
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}