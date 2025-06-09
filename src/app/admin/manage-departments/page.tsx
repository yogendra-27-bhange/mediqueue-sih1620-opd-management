
'use client'; // Assuming this page might need client-side interactions for fetching/managing data

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BriefcaseMedical, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react'; // Added for potential data fetching

// Define an interface for the Department object
interface Department {
  id: string;
  name: string;
  head: string;
  doctors: number;
  capacity: number;
}

// TODO: Fetch departments from Firestore or your backend API
// const mockDepartments = [
//   { id: '1', name: 'Cardiology', head: 'Dr. Smith', doctors: 5, capacity: 20 },
//   { id: '2', name: 'Pediatrics', head: 'Dr. Jones', doctors: 3, capacity: 15 },
//   { id: '3', name: 'Neurology', head: 'Dr. Lee', doctors: 4, capacity: 18 },
//   { id: '4', name: 'Orthopedics', head: 'Dr. Brown', doctors: 6, capacity: 25 },
// ];

export default function ManageDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // TODO: Implement fetching departments from your backend/Firestore here
    // For demonstration, we'll simulate a fetch then set to empty or mock data.
    const fetchDepartments = async () => {
      setIsLoading(true);
      // Replace with actual fetch logic:
      // try {
      //   const fetchedData = await yourApi.getDepartments();
      //   setDepartments(fetchedData);
      // } catch (error) {
      //   console.error("Failed to fetch departments:", error);
      //   // Handle error (e.g., show a toast)
      // } finally {
      //   setIsLoading(false);
      // }
      
      // Simulating no data found for now
      setDepartments([]); 
      setIsLoading(false);
    };

    fetchDepartments();
  }, []);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <BriefcaseMedical className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Manage Departments</CardTitle>
              <CardDescription>Oversee all hospital departments, add new ones, or update existing information.</CardDescription>
            </div>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Department
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">Loading departments...</p>
          ) : departments.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No departments found. Click "Add New Department" to get started or ensure data is fetched from the backend.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Department Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Head of Department</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">No. of Doctors</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient Capacity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{dept.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{dept.head}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{dept.doctors}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{dept.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
