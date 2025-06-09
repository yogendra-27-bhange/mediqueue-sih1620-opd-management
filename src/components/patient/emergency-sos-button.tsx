
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle, Siren } from 'lucide-react';

export function EmergencySOSButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleConfirmSOS = async () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      toast({
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation. SOS cannot be sent.',
        variant: 'destructive',
      });
      setIsLoading(false);
      setIsAlertDialogOpen(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date().toISOString();

        // Simulate sending alert to backend/hospitals and logging
        console.log('Emergency SOS Triggered:', {
          latitude,
          longitude,
          timestamp,
          userId: 'mockPatientUserId', // In a real app, get the actual user ID
        });

        toast({
          title: 'Emergency SOS Sent!',
          description: `Your location (Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}) has been shared with nearby emergency services. Help is on the way.`,
          variant: 'default',
          duration: 10000, // Longer duration for important messages
        });
        setIsLoading(false);
        setIsAlertDialogOpen(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Could not get your location. SOS not sent.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable location services in your browser/OS settings to use SOS.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information is unavailable. Please try again later.';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Request for location timed out. Please try again.';
        }
        toast({
          title: 'SOS Failed',
          description: errorMessage,
          variant: 'destructive',
        });
        setIsLoading(false);
        setIsAlertDialogOpen(false);
      },
      {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // 10 seconds timeout
        maximumAge: 0 // Force fresh location data
      }
    );
  };

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="lg"
          className="w-full py-8 text-xl animate-pulse hover:animate-none"
        >
          <Siren className="mr-3 h-8 w-8" /> EMERGENCY SOS
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-6 w-6" /> Confirm Emergency SOS
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to send an emergency alert with your current location to nearby hospitals.
            Use this feature only in genuine life-threatening situations. Misuse may have consequences.
            <br />
            <strong>Are you sure you want to proceed?</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={() => setIsAlertDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmSOS}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending SOS...
              </>
            ) : (
              'Yes, Send SOS Now'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
