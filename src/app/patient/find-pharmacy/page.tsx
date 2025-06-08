
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
  operatingHours: string; // e.g., "09:00-21:00", "24/7", "09:00-02:00" (overnight)
  services?: string[];
}

const mockPharmacies: Pharmacy[] = [
  { id: 'p1', name: 'MediCare Pharmacy', address: '10 Health Road, Anytown', city: 'Anytown', zipCode: '12345', phone: '555-0201', operatingHours: '08:00-20:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Prescription Refills', 'Vaccinations'], dataAiHint: "pharmacy storefront" },
  { id: 'p2', name: 'Wellness Drug Store', address: '25 Life Ave, Suburbia', city: 'Suburbia', zipCode: '67890', phone: '555-0202', operatingHours: '09:00-19:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Over-the-counter', 'Consultations'], dataAiHint: "pharmacy interior" },
  { id: 'p3', name: 'City Central Chemists', address: '300 Cure Blvd, Metropolis', city: 'Metropolis', zipCode: '10001', phone: '555-0203', operatingHours: '24/7', imageUrl: 'https://placehold.co/600x400.png', services: ['24/7 Service', 'Emergency Supply'], dataAiHint: "modern pharmacy" },
  { id: 'p4', name: 'Anytown Community Pharmacy', address: '5 Remedy Lane, Anytown', city: 'Anytown', zipCode: '12346', phone: '555-0204', operatingHours: '09:00-18:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Prescriptions', 'Health Checks'], dataAiHint: "local pharmacy" },
  { id: 'p5', name: 'Valley Green Pharmacy', address: '7 Pill Street, Green Valley', city: 'Green Valley', zipCode: '54321', phone: '555-0205', operatingHours: '10:00-00:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Online Orders', 'Delivery'], dataAiHint: "pharmacy building" },
  { id: 'p6', name: 'Night Owl Pharmacy', address: '12 Midnight Drive, Metropolis', city: 'Metropolis', zipCode: '10002', phone: '555-0206', operatingHours: '18:00-02:00', imageUrl: 'https://placehold.co/600x400.png', services: ['Late Night', 'Prescriptions'], dataAiHint: "pharmacy night" },
];

function parseTime(timeStr: string): { hours: number, minutes: number } | null {
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }
  return { hours, minutes };
}

function isPharmacyOpen(operatingHours: string, now: Date): boolean {
  if (operatingHours.toLowerCase() === '24/7' || operatingHours === "00:00-23:59") {
    return true;
  }

  const parts = operatingHours.split('-');
  if (parts.length !== 2) return false; // Invalid format

  const openTime = parseTime(parts[0]);
  const closeTime = parseTime(parts[1]);

  if (!openTime || !closeTime) return false;

  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
  const openTimeInMinutes = openTime.hours * 60 + openTime.minutes;
  let closeTimeInMinutes = closeTime.hours * 60 + closeTime.minutes;

  // Handle pharmacies that close after midnight (e.g., 09:00-02:00)
  // or are open exactly until midnight (e.g. 10:00-00:00, where 00:00 is effectively 24:00 for comparison)
  if (closeTime.hours === 0 && closeTime.minutes === 0) {
      closeTimeInMinutes = 24 * 60;
  } else if (closeTimeInMinutes < openTimeInMinutes) {
    // Closes on the next day
    return currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes < closeTimeInMinutes;
  }
  
  return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
}


export default function FindPharmacyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);


  const handleSearch = () => {
    setHasSearched(true);
    if (!searchQuery.trim()) {
      setFilteredPharmacies([]); // Show no results if search query is empty after trying to search
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
              const isOpen = isPharmacyOpen(pharmacy.operatingHours, currentDate);
              return (
              <Card key={pharmacy.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {pharmacy.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pharmacy.imageUrl} alt={pharmacy.name} className="w-full h-40 object-cover" data-ai-hint={pharmacy.dataAiHint || "pharmacy building"} />
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
