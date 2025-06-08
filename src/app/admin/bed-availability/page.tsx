import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, TrendingUp, TrendingDown, Edit3 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

// Mock data for bed availability
const mockBedData = [
  { id: '1', department: 'Intensive Care Unit (ICU)', totalBeds: 20, occupiedBeds: 18, unit: 'Beds' },
  { id: '2', department: 'General Ward - Male', totalBeds: 50, occupiedBeds: 35, unit: 'Beds' },
  { id: '3', department: 'General Ward - Female', totalBeds: 50, occupiedBeds: 42, unit: 'Beds' },
  { id: '4', department: 'Pediatric Ward', totalBeds: 30, occupiedBeds: 15, unit: 'Cots' },
  { id: '5', department: 'Maternity Ward', totalBeds: 25, occupiedBeds: 20, unit: 'Beds' },
];

export default function BedAvailabilityPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
           <div className="flex items-center gap-4">
            <BedDouble className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Bed Availability Management</CardTitle>
              <CardDescription>Monitor and update bed occupancy across hospital departments in real-time.</CardDescription>
            </div>
          </div>
           <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Edit3 className="mr-2 h-4 w-4" /> Update All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBedData.map((dept) => {
              const percentageOccupied = (dept.occupiedBeds / dept.totalBeds) * 100;
              const availableBeds = dept.totalBeds - dept.occupiedBeds;
              return (
                <Card key={dept.id} className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">{dept.department}</CardTitle>
                    <CardDescription>
                      {dept.occupiedBeds} occupied / {dept.totalBeds} total {dept.unit}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={percentageOccupied} aria-label={`${percentageOccupied.toFixed(0)}% occupied`} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{availableBeds} Available</span>
                      <span>{percentageOccupied.toFixed(0)}% Occupied</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-primary border-primary hover:bg-primary/10">
                      <Edit3 className="h-4 w-4 mr-1" /> Update Status
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
           {mockBedData.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No bed availability data found. Configure departments to see information.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
