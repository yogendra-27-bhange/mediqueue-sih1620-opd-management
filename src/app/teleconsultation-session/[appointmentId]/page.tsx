
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Info } from 'lucide-react';
import Link from 'next/link';

interface TeleconsultationSessionPageProps {
  params: {
    appointmentId: string;
  };
}

export default function TeleconsultationSessionPage({ params }: TeleconsultationSessionPageProps) {
  const { appointmentId } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="inline-flex justify-center items-center">
            <Video className="h-16 w-16 text-primary mb-4" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Teleconsultation Session</CardTitle>
          <CardDescription>Appointment ID: {appointmentId}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-foreground">
            This is where the video call interface for your teleconsultation would be integrated.
          </p>
          <div className="bg-muted/50 p-4 rounded-md text-sm text-muted-foreground">
            <Info className="inline h-4 w-4 mr-2" />
            For minor ailments, MediQueue envisions a lightweight teleconsultation feature integrated into the OPD flow, helping rural or time-sensitive patients consult doctors remotely.
            To complete this feature, integrate your preferred video call service (e.g., Jitsi Meet, WebRTC, or a third-party SDK) within this component.
          </div>
          
          {/* Placeholder for video call window */}
          <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Video Call Area Placeholder</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
                Ensure your microphone and camera are enabled and working correctly.
            </p>
             <Button variant="outline" asChild>
                <Link href="/patient/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    