
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus, ShieldCheck, Stethoscope, BrainCircuit, History, MessageSquareHeart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-br from-primary/20 via-background to-background rounded-lg shadow-lg">
        <h1 className="text-5xl font-headline font-bold text-primary mb-4">Welcome to MediQueue</h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Your trusted partner for seamless hospital OPD appointment scheduling. Experience efficiency, reduce wait times, and focus on your health.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/patient/book-appointment">
              <CalendarPlus className="mr-2 h-5 w-5" /> Book an Appointment
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Login / Sign Up</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-semibold text-center mb-8 text-primary">Why Choose MediQueue?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<CalendarPlus className="h-10 w-10 text-accent" />}
            title="Easy Appointment Booking"
            description="Person easily booking an appointment on a phone or computer with a calendar interface."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-10 w-10 text-accent" />}
            title="Role-Based Access"
            description="Three figures representing admin, doctor, and patient roles, each with a key, interacting with a secure system shield."
          />
          <FeatureCard
            icon={<Stethoscope className="h-10 w-10 text-accent" />}
            title="Doctor Dashboards"
            description="A doctor reviewing a patient's chart on a tablet, with medical icons in the background."
          />
          <FeatureCard
            icon={<BrainCircuit className="h-10 w-10 text-accent" />}
            title="Smart Slot Allocation"
            description="Stylized brain with circuitry connected to a calendar, symbolizing AI-optimized scheduling for appointments."
          />
           <FeatureCard
            icon={<History className="h-10 w-10 text-accent" />}
            title="Appointment History"
            description="Patients can view their complete appointment history and doctor's notes."
          />
           <FeatureCard
            icon={<MessageSquareHeart className="h-10 w-10 text-accent" />}
            title="Timely Reminders"
            description="Automated SMS/Email reminders for appointments and status updates."
          />
        </div>
      </section>

      <section className="text-center py-12 bg-accent/10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-headline font-semibold text-accent mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-foreground/80 mb-6 max-w-xl mx-auto">
          Join MediQueue today and transform your hospital's appointment management.
        </p>
        <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
          <Link href="/signup">
            Sign Up Now
          </Link>
        </Button>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-accent/10 rounded-full mb-3">
          {icon}
        </div>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pb-6"> {/* Adjusted padding for content */}
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
