
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut, Edit3 } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  // In a real app, user data and role would come from authentication context
  const mockUserData = {
    name: 'Dr. Alex Ray', // Changed to a doctor's name
    email: 'dr.alex@example.com', // Changed email
    role: 'doctor', // CHANGED to 'doctor' to show doctor-specific info
    avatar: 'https://placehold.co/150x150.png',
    // Patient specific
    medicalHistorySummary: 'No significant medical history noted. Annual checkups recommended.',
    bloodGroup: 'O+',
    // Doctor specific
    specialization: 'Cardiology',
    experience: '12+ years', // Slightly changed experience
    // Admin specific
    adminId: 'ADM789', // Changed admin ID
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image 
              src={mockUserData.avatar} 
              alt={`${mockUserData.name}'s avatar`} 
              width={120} 
              height={120} 
              className="rounded-full border-4 border-primary"
              data-ai-hint="profile avatar" 
            />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">{mockUserData.name}</CardTitle>
          <CardDescription className="text-lg">{mockUserData.email}</CardDescription>
          <div className="mt-2">
            <span className="inline-block bg-accent text-accent-foreground px-3 py-1 text-sm font-semibold rounded-full">
              Role: {mockUserData.role.charAt(0).toUpperCase() + mockUserData.role.slice(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockUserData.role === 'patient' && (
            <>
              <InfoSection title="Medical Overview">
                <InfoItem label="Blood Group" value={mockUserData.bloodGroup} />
                <InfoItem label="Medical History Summary" value={mockUserData.medicalHistorySummary} />
              </InfoSection>
              {/* Add more patient-specific sections here if needed */}
            </>
          )}

          {mockUserData.role === 'doctor' && (
            <>
              <InfoSection title="Professional Information">
                <InfoItem label="Specialization" value={mockUserData.specialization} />
                <InfoItem label="Experience" value={mockUserData.experience} />
              </InfoSection>
              {/* Add more doctor-specific sections here if needed */}
            </>
          )}
          
          {mockUserData.role === 'admin' && (
            <>
               <InfoSection title="Administrator Details">
                <InfoItem label="Admin ID" value={mockUserData.adminId} />
              </InfoSection>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button variant="outline" className="flex-1">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button variant="destructive" className="flex-1">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
           <p className="text-xs text-muted-foreground text-center pt-4">
            For demonstration purposes, user data is mocked. In a real application, this would be dynamic based on the logged-in user. The "Logout" button is a UI placeholder.
            To see other role views (e.g., 'patient' or 'admin'), you can edit the `mockUserData.role` and `mockUserData.name` in `src/app/profile/page.tsx`.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold font-headline text-accent mb-3 pb-2 border-b border-border">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string | undefined;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <p className="font-medium text-muted-foreground w-full sm:w-1/3">{label}:</p>
      <p className="text-foreground w-full sm:w-2/3">{value || 'N/A'}</p>
    </div>
  );
}
