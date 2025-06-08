import { SmartSlotForm } from '@/components/admin/smart-slot-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function SmartSlotAllocationPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <Lightbulb className="h-10 w-10 text-primary" />
          <div>
            <CardTitle className="text-3xl font-headline text-primary">Smart Slot Allocation</CardTitle>
            <CardDescription>Utilize AI to analyze doctor availability, patient load, and appointment durations to suggest optimal scheduling.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Enter the required information below. The AI will process this data to provide recommendations for appointment slots and potential updates to doctor availability, aiming to reduce wait times and improve overall scheduling efficiency.
          </p>
          <SmartSlotForm />
        </CardContent>
      </Card>
    </div>
  );
}
