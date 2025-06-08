'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { SmartSlotAllocationInput, SmartSlotAllocationOutput, suggestOptimalSlots } from '@/ai/flows/smart-slot-allocation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  doctorAvailability: z.string().min(10, { message: 'Please provide details on doctor availability.' }),
  patientLoadPatterns: z.string().min(10, { message: 'Please describe patient load patterns.' }),
  averageAppointmentDuration: z.string().min(3, { message: 'Specify average appointment duration (e.g., 15 mins).' }),
  unusualPatternsDetected: z.string().optional(),
});

export function SmartSlotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SmartSlotAllocationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorAvailability: '',
      patientLoadPatterns: '',
      averageAppointmentDuration: '',
      unusualPatternsDetected: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const input: SmartSlotAllocationInput = {
        ...values,
        unusualPatternsDetected: values.unusualPatternsDetected || 'None observed',
      };
      const output = await suggestOptimalSlots(input);
      setResult(output);
      toast({
        title: "Analysis Complete",
        description: "Optimal slots and availability updates suggested.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error fetching smart slot allocation:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not retrieve suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="doctorAvailability"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Doctor Availability</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Dr. Smith: Mon-Fri 9am-5pm (Cardiology), Dr. Jones: Mon, Wed, Fri 10am-2pm (Pediatrics)..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patientLoadPatterns"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Patient Load Patterns</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Peak hours: Mon 10am-12pm, Wed 2pm-4pm. Higher load for General Medicine on Mondays..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="averageAppointmentDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Average Appointment Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., General: 15 mins, Specialist: 30 mins" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unusualPatternsDetected"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Unusual Patient Load Patterns (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Sudden increase in flu cases last week, requiring more GP slots..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Suggestions
              </>
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-background shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">AI Suggestions</CardTitle>
            <CardDescription>Based on the provided data, here are the optimized recommendations:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-accent">Suggested Optimal Slots:</h3>
              <Textarea readOnly value={result.suggestedSlots} className="min-h-[150px] bg-muted/50" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-accent">Suggested Availability Updates:</h3>
              <Textarea readOnly value={result.suggestedAvailabilityUpdates} className="min-h-[150px] bg-muted/50" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
