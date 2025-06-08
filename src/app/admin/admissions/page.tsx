
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FilePlus, UserCheck, LogOut, Hospital } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for admissions
const mockAdmissions = [
  { id: 'ADM001', patientName: 'John Doe', department: 'Cardiology', bedNumber: 'C-101', admissionDate: new Date(2024, 6, 15), status: 'Admitted' },
  { id: 'ADM002', patientName: 'Jane Smith', department: 'Neurology', bedNumber: 'N-205', admissionDate: new Date(2024, 6, 20), status: 'Admitted' },
  { id: 'ADM003', patientName: 'Robert Brown', department: 'Orthopedics', bedNumber: 'O-302', admissionDate: new Date(2024, 5, 10), status: 'Discharged' },
  { id: 'ADM004', patientName: 'Emily White', department: 'Pediatrics', bedNumber: 'P-101', admissionDate: new Date(2024, 6, 22), status: 'Admitted' },
  { id: 'ADM005', patientName: 'Michael Green', department: 'General Ward', bedNumber: 'GW-A12', admissionDate: new Date(2024, 4, 1), status: 'Discharged' },
];

export default function AdmissionsPage() {
  const getStatusBadgeVariant = (status: string) => {
    if (status === 'Admitted') return 'default'; // Using primary for Admitted
    if (status === 'Discharged') return 'secondary';
    return 'outline';
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Hospital className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Admissions Management</CardTitle>
              <CardDescription>Track and manage patient admissions and discharges across the hospital.</CardDescription>
            </div>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <FilePlus className="mr-2 h-4 w-4" /> Admit New Patient
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admission ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Bed Number</TableHead>
                  <TableHead>Admission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAdmissions.map((admission) => (
                  <TableRow key={admission.id}>
                    <TableCell className="font-medium">{admission.id}</TableCell>
                    <TableCell>{admission.patientName}</TableCell>
                    <TableCell>{admission.department}</TableCell>
                    <TableCell>{admission.bedNumber}</TableCell>
                    <TableCell>{format(admission.admissionDate, 'PPP')}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(admission.status)}>{admission.status}</Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                        <UserCheck className="h-4 w-4 mr-1" /> View
                      </Button>
                      {admission.status === 'Admitted' && (
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                          <LogOut className="h-4 w-4 mr-1" /> Discharge
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {mockAdmissions.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No admission records found. Click "Admit New Patient" to get started.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
