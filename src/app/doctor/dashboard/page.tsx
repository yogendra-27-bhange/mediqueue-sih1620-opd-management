import { DoctorSchedule } from '@/components/doctor/doctor-schedule';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BriefcaseMedical } from 'lucide-react';
import Image from 'next/image';

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-gradient-to-r from-primary/10 to-background">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image src="https://placehold.co/80x80.png" alt="Doctor Avatar" width={80} height={80} className="rounded-full" data-ai-hint="doctor professional" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Doctor's Dashboard</CardTitle>
              <CardDescription>Manage your appointments, view patient details, and update consultation status.</CardDescription>
            </div>
          </div>
        </CardHeader>
         <CardContent>
          <p>Welcome, Dr. [Doctor's Name]! Your schedule for today and upcoming appointments are listed below. You can filter appointments by status and manage each consultation efficiently.</p>
        </CardContent>
      </Card>
      <DoctorSchedule />
    </div>
  );
}
