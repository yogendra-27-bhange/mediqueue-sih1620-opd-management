
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus, ShieldCheck, Stethoscope, Users, BrainCircuit, History, MessageSquareHeart } from 'lucide-react';
import Image from 'next/image';

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
            description="Intuitive calendar-based scheduling makes booking OPD appointments a breeze for patients."
            imageSrc="/images/features/easy-appointment-booking.png"
            imageAlt="Person easily booking an appointment on a phone or computer with a calendar interface"
          />
          <FeatureCard
            icon={<ShieldCheck className="h-10 w-10 text-accent" />}
            title="Role-Based Access"
            description="Secure access for Admins, Doctors, and Patients with Firebase Authentication."
            imageSrc="/images/features/role-based-access.png"
            imageAlt="Illustration of different user roles (admin, doctor, patient) with distinct icons, interacting with a secure system interface"
          />
          <FeatureCard
            icon={<Stethoscope className="h-10 w-10 text-accent" />}
            title="Doctor Dashboards"
            description="Doctors can easily view schedules, manage appointments, and update statuses."
            imageSrc="/images/features/doctor-dashboards.png"
            imageAlt="Laptop screen showing a doctor's dashboard with schedule and patient information icons"
          />
          <FeatureCard
            icon={<BrainCircuit className="h-10 w-10 text-accent" />}
            title="Smart Slot Allocation"
            description="AI-powered suggestions for optimal appointment slots to reduce wait times."
            imageSrc="https://placehold.co/600x400.png?text=AI+Scheduling"
            imageAlt="Abstract representation of AI or a brain with gears or a calendar, symbolizing intelligent scheduling and optimization"
            aiHint="AI scheduling"
          />
           <FeatureCard
            icon={<History className="h-10 w-10 text-accent" />}
            title="Appointment History"
            description="Patients can view their complete appointment history and doctor's notes."
            imageSrc="https://placehold.co/600x400.png?text=Medical+Records"
            imageAlt="Patient viewing a list of past medical appointments or records on a secure digital device or interface"
            aiHint="medical history"
          />
           <FeatureCard
            icon={<MessageSquareHeart className="h-10 w-10 text-accent" />}
            title="Timely Reminders"
            description="Automated SMS/Email reminders for appointments and status updates."
            imageSrc="https://placehold.co/600x400.png?text=Notification+Alert"
            imageAlt="Smartphone displaying a notification or reminder message for an upcoming medical appointment, with a calendar icon"
            aiHint="appointment reminder"
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
  imageSrc: string;
  imageAlt: string;
  aiHint?: string;
}

function FeatureCard({ icon, title, description, imageSrc, imageAlt, aiHint }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-accent/10 rounded-full mb-3">
          {icon}
        </div>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <Image src={imageSrc} alt={imageAlt} width={600} height={400} className="w-full h-48 object-cover" {...(aiHint && { 'data-ai-hint': aiHint })} />
      <CardContent className="pt-4">
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
