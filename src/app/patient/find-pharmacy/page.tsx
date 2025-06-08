
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pill, MapPin, Search, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  imageUrl?: string;
  operatingHours: string; // e.g., "09:00-21:00" (9 AM to 9 PM)
  services?: string[];
}

const mockPharmacies: Pharmacy[] = [
  { id: 'p1', name: 'MediCare Pharmacy', address: '10 Health Road, Anytown', city: 'Anytown', zipCode: '12345', phone: '555-0201', operatingHours: '08:00-20:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Prescription Refills', 'Vaccinations'] },
  { id: 'p2', name: 'Wellness Drug Store', address: '25 Life Ave, Suburbia', city: 'Suburbia', zipCode: '67890', phone: '555-0202', operatingHours: '09:00-19:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Over-the-counter', 'Consultations'] },
  { id: 'p3', name: 'City Central Chemists', address: '300 Cure Blvd, Metropolis', city: 'Metropolis', zipCode: '10001', phone: '555-0203', operatingHours: '00:00-23:59', imageUrl: 'https://placehold.co/600x400.png', services: ['24/7 Service', 'Emergency Supply'] },
  { id: 'p4', name: 'Anytown Community Pharmacy', address: '5 Remedy Lane, Anytown', city: 'Anytown', zipCode: '12346', phone: '555-0204', operatingHours: '09:00-18:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Prescriptions', 'Health Checks'] },
  { id: 'p5', name: 'Valley Green Pharmacy', address: '7 Pill Street, Green Valley', city: 'Green Valley', zipCode: '54321', phone: '555-0205', operatingHours: '10:00-22:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Online Orders', 'Delivery'] },
];

function isPharmacyOpen(operatingHours: string): boolean {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes from midnight

  const [openStr, closeStr] = operatingHours.split('-');
  if (!openStr || !closeStr) return false;

  const [openHour, openMinute] = openStr.split(':').map(Number);
  const [closeHour, closeMinute] = closeStr.split(':').map(Number);

  const openTime = openHour * 60 + openMinute;
  let closeTime = closeHour * 60 + closeMinute;

  // Handle 24/7 case or closing past midnight
  if (closeTime <= openTime) { // Assumes closing past midnight or 24/7 if close is 23:59 or similar
    if (closeHour === 23 && closeMinute === 59) return true; // Effectively 24/7
    // For stores closing past midnight, e.g. 09:00-02:00
    // If current time is after open OR before close (on the next day concept)
    // This simple logic doesn't fully handle overnight, for 09:00-02:00, it would be:
    // (currentTime >= openTime) || (currentTime < closeTime)
    // But if closeTime is 02:00 (120 min) and openTime is 09:00 (540 min), it's more complex.
    // For simplicity here, if closeTime is less than openTime, assume it wraps around.
    // A more robust solution would involve date objects.
    // For now, let's assume 23:59 means always open, or it means it closes *before* midnight
    // if closeHour < openHour. For this example, 00:00-23:59 is "always open".
     if (openTime === 0 && closeTime === (23*60 + 59)) return true; // 24/7
     // if it crosses midnight e.g. 09:00 - 02:00 (next day)
     if (closeTime < openTime) {
        return currentTime >= openTime || currentTime < closeTime;
     }
  }
  
  return currentTime >= openTime && currentTime < closeTime;
}


export default function FindPharmacyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentTimes, setCurrentTimes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initial calculation for all mock pharmacies
    const initialStatus: Record<string, boolean> = {};
    mockPharmacies.forEach(p => {
      initialStatus[p.id] = isPharmacyOpen(p.operatingHours);
    });
    setCurrentTimes(initialStatus);

    // Update every minute
    const interval = setInterval(() => {
      const updatedStatus: Record<string, boolean> = {};
      (hasSearched ? filteredPharmacies : mockPharmacies).forEach(p => {
        updatedStatus[p.id] = isPharmacyOpen(p.operatingHours);
      });
      setCurrentTimes(prev => ({...prev, ...updatedStatus}));
    }, 60000);
    return () => clearInterval(interval);
  }, [hasSearched, filteredPharmacies]);


  const handleSearch = () => {
    setHasSearched(true);
    if (!searchQuery.trim()) {
      setFilteredPharmacies([]);
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = mockPharmacies.filter(
      pharmacy =>
        pharmacy.city.toLowerCase().includes(lowerCaseQuery) ||
        pharmacy.zipCode.includes(lowerCaseQuery) ||
        pharmacy.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPharmacies(results);
     // Update open/close status for newly filtered pharmacies
    const updatedStatus: Record<string, boolean> = {};
    results.forEach(p => {
        updatedStatus[p.id] = isPharmacyOpen(p.operatingHours);
    });
    setCurrentTimes(prev => ({...prev, ...updatedStatus}));
  };

  const pharmaciesToDisplay = hasSearched ? filteredPharmacies : [];


  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="inline-flex justify-center items-center">
            <Pill className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Find a Pharmacy</CardTitle>
          <CardDescription>Search for pharmacies by city or zip code and check their status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2 items-end">
            <div className="flex-grow">
              <Label htmlFor="location-search">City or Zip Code</Label>
              <Input
                id="location-search"
                type="text"
                placeholder="e.g., Anytown or 12345"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base"
              />
            </div>
            <Button onClick={handleSearch} className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>

          <Separator />

          {hasSearched && pharmaciesToDisplay.length === 0 && (
            <p className="text-center text-muted-foreground py-6">
              No pharmacies found matching your criteria. Please try a different city or zip code.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {pharmaciesToDisplay.map((pharmacy) => {
              const isOpen = currentTimes[pharmacy.id] ?? false;
              return (
              <Card key={pharmacy.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {pharmacy.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pharmacy.imageUrl} alt={pharmacy.name} className="w-full h-40 object-cover" data-ai-hint="pharmacy storefront" />
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Pill className="h-5 w-5 text-primary" />
                    {pharmacy.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1"> <MapPin className="h-4 w-4"/> {pharmacy.address}, {pharmacy.city}, {pharmacy.zipCode}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="h-4 w-4"/> {pharmacy.phone}</p>
                    <Badge variant={isOpen ? 'default' : 'destructive'} className="flex items-center gap-1">
                      <Clock className="h-3 w-3"/> {isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground"><Clock className="inline h-4 w-4 mr-1"/>Hours: {pharmacy.operatingHours.replace('-', ' - ')}</p>
                   {pharmacy.services && pharmacy.services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.services.map(service => (
                          <Badge key={service} variant="secondary">{service}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`tel:${pharmacy.phone}`}>
                      Call Pharmacy
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
            })}
          </div>
           {!hasSearched && (
            <p className="text-center text-muted-foreground py-6">
              Enter a city or zip code above to begin your search for pharmacies.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

