
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

// Mock data for bed availability (same as admin for now)
const mockBedData = [
  { id: '1', department: 'Intensive Care Unit (ICU)', totalBeds: 20, occupiedBeds: 18, unit: 'Beds' },
  { id: '2', department: 'General Ward - Male', totalBeds: 50, occupiedBeds: 35, unit: 'Beds' },
  { id: '3', department: 'General Ward - Female', totalBeds: 50, occupiedBeds: 42, unit: 'Beds' },
  { id: '4', department: 'Pediatric Ward', totalBeds: 30, occupiedBeds: 15, unit: 'Cots' },
  { id: '5', department: 'Maternity Ward', totalBeds: 25, occupiedBeds: 20, unit: 'Beds' },
];

export default function PatientBedAvailabilityPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
           <div className="inline-flex justify-center items-center">
            <BedDouble className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Hospital Bed Availability</CardTitle>
          <CardDescription>View current bed occupancy across different hospital departments.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockBedData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBedData.map((dept) => {
                const percentageOccupied = (dept.occupiedBeds / dept.totalBeds) * 100;
                const availableBeds = dept.totalBeds - dept.occupiedBeds;
                return (
                  <Card key={dept.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">{dept.department}</CardTitle>
                      <CardDescription>
                        {availableBeds} available / {dept.totalBeds} total {dept.unit}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Progress value={percentageOccupied} aria-label={`${percentageOccupied.toFixed(0)}% occupied`} />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{availableBeds} Available</span>
                        <span>{percentageOccupied.toFixed(0)}% Occupied</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
             <p className="text-center py-8 text-muted-foreground flex items-center justify-center">
                <AlertCircle className="h-5 w-5 mr-2"/> No bed availability data is currently available.
            </p>
          )}
           <p className="text-xs text-muted-foreground mt-8 text-center">
            Note: This information is updated periodically and is for general guidance only. Please contact the hospital directly for the most current availability.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
