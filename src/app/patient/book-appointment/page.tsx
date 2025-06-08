import { AppointmentBookingForm } from '@/components/patient/appointment-booking-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus } from 'lucide-react';

export default function BookAppointmentPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader className="text-center">
           <div className="inline-flex justify-center items-center">
            <CalendarPlus className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Book an OPD Appointment</CardTitle>
          <CardDescription>Select a department, doctor, and preferred date and time for your visit.</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentBookingForm />
        </CardContent>
      </Card>
    </div>
  );
}
