
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, History, UserCircle, FileText, MessageCircle, MapPin, BedDouble, Pill } from 'lucide-react';
import Image from 'next/image';

// Mock data for upcoming appointments
const mockUpcomingAppointments = [
  { id: '1', doctor: 'Dr. Emily Carter', department: 'Cardiology', date: '2024-07-28', time: '10:00 AM', status: 'Scheduled' },
  { id: '2', doctor: 'Dr. Johnathan Lee', department: 'Pediatrics', date: '2024-08-02', time: '02:30 PM', status: 'Scheduled' },
];

export default function PatientDashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-gradient-to-r from-primary/10 to-background">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image src="https://placehold.co/80x80.png" alt="Patient Avatar" width={80} height={80} className="rounded-full" data-ai-hint="person avatar" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Welcome, Patient Name!</CardTitle>
              <CardDescription>Here's an overview of your appointments and health information.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Manage your health journey with ease. Book new appointments, view your medical history, and communicate with your doctors all in one place.</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionCard title="Book New Appointment" icon={<CalendarPlus className="h-6 w-6" />} link="/patient/book-appointment" />
          <ActionCard title="View Appointment History" icon={<History className="h-6 w-6" />} link="/patient/appointment-history" />
          <ActionCard title="Find Nearby Hospital" icon={<MapPin className="h-6 w-6" />} link="/patient/find-hospital" />
          <ActionCard title="Find Nearby Pharmacy" icon={<Pill className="h-6 w-6" />} link="/patient/find-pharmacy" />
          <ActionCard title="View Bed Availability" icon={<BedDouble className="h-6 w-6" />} link="/patient/bed-availability" />
          <ActionCard title="Manage Profile" icon={<UserCircle className="h-6 w-6" />} link="/patient/profile" />
        </div>
      </section>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><CalendarPlus />Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled future appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockUpcomingAppointments.length > 0 ? (
            <ul className="space-y-4">
              {mockUpcomingAppointments.map(apt => (
                <li key={apt.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-background">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-md">{apt.department} with {apt.doctor}</p>
                      <p className="text-sm text-muted-foreground">{apt.date} at {apt.time}</p>
                    </div>
                    <div className="text-right">
                       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {apt.status}
                       </span>
                       <Button variant="link" size="sm" className="mt-1 text-primary">View Details</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">You have no upcoming appointments.</p>
          )}
        </CardContent>
        <CardFooter>
           <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/patient/book-appointment">Book a New Appointment</Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Other Sections (Placeholder) */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><FileText />Recent Lab Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent lab results available. <Link href="#" className="text-primary hover:underline">View all results</Link></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl text-primary flex items-center gap-2"><MessageCircle />Messages from Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have no new messages. <Link href="#" className="text-primary hover:underline">Go to inbox</Link></p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  link: string;
}

function ActionCard({ title, icon, link }: ActionCardProps) {
  return (
    <Link href={link}>
      <Card className="hover:bg-accent/10 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="p-3 bg-primary/10 rounded-full mb-3 text-primary">
            {icon}
          </div>
          <h3 className="font-semibold text-md">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
