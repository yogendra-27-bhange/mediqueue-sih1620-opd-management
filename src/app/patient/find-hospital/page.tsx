
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Hospital as HospitalIcon, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  services: string[];
  phone: string;
  imageUrl?: string;
}

const mockHospitals: Hospital[] = [
  { id: 'h1', name: 'City General Hospital', address: '123 Main St, Anytown', city: 'Anytown', zipCode: '12345', services: ['General Medicine', 'Cardiology', 'Pediatrics'], phone: '555-0101', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'h2', name: 'Suburb Community Clinic', address: '456 Oak Ave, Suburbia', city: 'Suburbia', zipCode: '67890', services: ['General Medicine', 'Orthopedics'], phone: '555-0102', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'h3', name: 'Metropolis Health Center', address: '789 Pine Rd, Metropolis', city: 'Metropolis', zipCode: '10001', services: ['Neurology', 'Cardiology', 'Oncology'], phone: '555-0103', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'h4', name: 'Anytown Westside Hospital', address: '321 Elm St, Anytown', city: 'Anytown', zipCode: '12346', services: ['General Medicine', 'Pediatrics', 'Neurology', 'Emergency Care'], phone: '555-0104', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'h5', name: 'Green Valley Medical', address: '101 River Rd, Green Valley', city: 'Green Valley', zipCode: '54321', services: ['General Medicine', 'Dermatology'], phone: '555-0105', imageUrl: 'https://placehold.co/600x400.png' },
];

export default function FindHospitalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (!searchQuery.trim()) {
      setFilteredHospitals([]); // Or show all if preferred, but for "nearest" empty makes sense.
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = mockHospitals.filter(
      hospital =>
        hospital.city.toLowerCase().includes(lowerCaseQuery) ||
        hospital.zipCode.includes(lowerCaseQuery) ||
        hospital.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredHospitals(results);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="inline-flex justify-center items-center">
            <MapPin className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Find a Hospital Near You</CardTitle>
          <CardDescription>Enter your city or zip code to find MediQueue partner hospitals.</CardDescription>
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

          {hasSearched && filteredHospitals.length === 0 && (
            <p className="text-center text-muted-foreground py-6">
              No hospitals found matching your criteria. Please try a different city or zip code.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {hospital.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={hospital.imageUrl} alt={hospital.name} className="w-full h-40 object-cover" data-ai-hint="hospital exterior" />
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <HospitalIcon className="h-5 w-5 text-primary" />
                    {hospital.name}
                  </CardTitle>
                  <CardDescription>{hospital.address}, {hospital.city}, {hospital.zipCode}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Phone: {hospital.phone}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center gap-1"><Stethoscope className="h-4 w-4 text-accent"/> Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.services.map(service => (
                        <Badge key={service} variant="secondary">{service}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={`/patient/book-appointment?hospitalId=${hospital.id}&hospitalName=${encodeURIComponent(hospital.name)}`}>
                      Book Appointment Here
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           {!hasSearched && (
            <p className="text-center text-muted-foreground py-6">
              Enter a city or zip code above to begin your search.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
