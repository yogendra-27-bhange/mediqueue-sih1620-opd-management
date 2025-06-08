import { AppointmentHistoryList } from '@/components/patient/appointment-history-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';

export default function AppointmentHistoryPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
           <div className="inline-flex justify-center items-center">
            <History className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Appointment History</CardTitle>
          <CardDescription>Review your past appointments, including details, status, and doctor's notes.</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentHistoryList />
        </CardContent>
      </Card>
    </div>
  );
}
