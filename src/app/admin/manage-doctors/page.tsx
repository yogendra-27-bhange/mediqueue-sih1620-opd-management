import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, PlusCircle, UserCheck, UserX, Filter } from 'lucide-react';
import Image from 'next/image';

// Mock data for doctors
const mockDoctors = [
  { id: '1', name: 'Dr. Emily Carter', specialization: 'Cardiology', department: 'Cardiology', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '2', name: 'Dr. Johnathan Lee', specialization: 'Pediatrics', department: 'Pediatrics', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
  { id: '3', name: 'Dr. Sarah Green', specialization: 'Neurology', department: 'Neurology', status: 'On Leave', avatar: 'https://placehold.co/100x100.png' },
  { id: '4', name: 'Dr. Michael Brown', specialization: 'Orthopedics', department: 'Orthopedics', status: 'Active', avatar: 'https://placehold.co/100x100.png' },
];

export default function ManageDoctorsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Users className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Manage Doctors</CardTitle>
              <CardDescription>Add new doctors, update profiles, assign to departments, and manage availability.</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Doctor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 p-4 bg-muted/30">
                  <Image src={doctor.avatar} alt={doctor.name} width={60} height={60} className="rounded-full" data-ai-hint="doctor portrait" />
                  <div>
                    <CardTitle className="text-lg font-headline">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialization} - {doctor.department}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className={`text-sm font-medium ${doctor.status === 'Active' ? 'text-green-600' : 'text-orange-500'}`}>
                    Status: {doctor.status}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-primary border-primary hover:bg-primary/10">
                      <UserCheck className="h-4 w-4 mr-1" /> View/Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive border-destructive hover:bg-destructive/10">
                      <UserX className="h-4 w-4 mr-1" /> Deactivate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {mockDoctors.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No doctors found. Click "Add New Doctor" to get started.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
