
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ambulance, PlusCircle, Edit, ToggleRight, Filter } from 'lucide-react';

// Mock data for ambulance services
const mockAmbulances = [
  { id: 'AMB001', vehicleNumber: 'MH12AB1234', type: 'Advanced Life Support (ALS)', driver: 'Ramesh Kumar', status: 'Available' },
  { id: 'AMB002', vehicleNumber: 'MH14CD5678', type: 'Basic Life Support (BLS)', driver: 'Suresh Patil', status: 'On Call' },
  { id: 'AMB003', vehicleNumber: 'MH01EF9012', type: 'Patient Transport Vehicle', driver: 'Anil Yadav', status: 'Available' },
  { id: 'AMB004', vehicleNumber: 'MH02GH3456', type: 'Advanced Life Support (ALS)', driver: 'Vikram Singh', status: 'Under Maintenance' },
];

export default function AmbulanceServicesPage() {
  const getStatusBadgeVariant = (status: string) => {
    if (status === 'Available') return 'default'; // Using primary for Available
    if (status === 'On Call') return 'secondary'; // Orange/yellowish might be good - secondary works for now
    if (status === 'Under Maintenance') return 'destructive';
    return 'outline';
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Ambulance className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Ambulance Services</CardTitle>
              <CardDescription>Manage the hospital's ambulance fleet, driver assignments, and operational status.</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Ambulance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ambulance ID</TableHead>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Assigned Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAmbulances.map((ambulance) => (
                  <TableRow key={ambulance.id}>
                    <TableCell className="font-medium">{ambulance.id}</TableCell>
                    <TableCell>{ambulance.vehicleNumber}</TableCell>
                    <TableCell>{ambulance.type}</TableCell>
                    <TableCell>{ambulance.driver}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(ambulance.status)}>{ambulance.status}</Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-accent border-accent hover:bg-accent/10">
                        <ToggleRight className="h-4 w-4 mr-1" /> Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {mockAmbulances.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No ambulances registered. Click "Add New Ambulance" to get started.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    