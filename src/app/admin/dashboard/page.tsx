
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Users, BriefcaseMedical, BedDouble, ListChecks, Settings, Hospital as HospitalIcon, Ambulance } from 'lucide-react';

export default function AdminDashboardPage() {
  const features = [
    {
      title: "Smart Slot Allocation",
      description: "Optimize appointment scheduling using AI.",
      link: "/admin/smart-slot-allocation",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
    },
    {
      title: "Manage Departments",
      description: "Add, edit, or remove hospital departments.",
      link: "/admin/manage-departments",
      icon: <BriefcaseMedical className="h-8 w-8 text-primary" />,
    },
    {
      title: "Manage Doctors",
      description: "Assign doctors to departments and manage profiles.",
      link: "/admin/manage-doctors",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Bed Availability",
      description: "Update and monitor hospital bed status.",
      link: "/admin/bed-availability",
      icon: <BedDouble className="h-8 w-8 text-primary" />,
    },
    {
      title: "Admissions Management",
      description: "Track patient admissions and discharges.",
      link: "/admin/admissions",
      icon: <HospitalIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "OPD Queue Monitoring",
      description: "View real-time OPD queues and patient flow.",
      link: "/admin/opd-queue",
      icon: <ListChecks className="h-8 w-8 text-primary" />,
    },
    {
      title: "Ambulance Services",
      description: "Manage ambulance fleet and status.",
      link: "/admin/ambulance-services",
      icon: <Ambulance className="h-8 w-8 text-primary" />,
    },
     {
      title: "System & Hospital Settings",
      description: "Configure application and hospital details.",
      link: "/admin/settings",
      icon: <Settings className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Admin Dashboard</CardTitle>
          <CardDescription>Manage and oversee all aspects of the MediQueue system.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Welcome, Admin! Use the tools below to manage hospital operations, doctor schedules, patient appointments, and system settings.</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              {feature.icon}
              <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={feature.link}>Go to {feature.title}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    