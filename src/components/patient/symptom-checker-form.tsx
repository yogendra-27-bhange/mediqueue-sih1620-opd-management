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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, ShieldAlert, Activity, Users } from 'lucide-react';
import { SymptomCheckerInput, SymptomCheckerOutput, checkSymptoms } from '@/ai/flows/symptom-checker-flow';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const formSchema = z.object({
  symptomsDescription: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }).max(1000, {message: 'Please keep your description under 1000 characters.'}),
});

export function SymptomCheckerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomsDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const input: SymptomCheckerInput = {
        symptomsDescription: values.symptomsDescription,
      };
      const output = await checkSymptoms(input);
      setResult(output);
      toast({
        title: "Symptom Assessment Complete",
        description: "The AI has provided some general guidance below.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error fetching symptom assessment:', error);
      toast({
        title: "Assessment Failed",
        description: "Could not retrieve assessment. Please try again later.",
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
            name="symptomsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Describe Your Symptoms</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., I have a persistent cough, fever for 2 days, and body aches..."
                    className="min-h-[120px]"
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
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get AI Assessment
              </>
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-background shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">AI-Powered Guidance</CardTitle>
            <CardDescription>Please read the following information carefully. This is not a medical diagnosis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.suggestedDepartments && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-accent flex items-center"><Users className="mr-2 h-5 w-5" /> Suggested Departments:</h3>
                <p className="text-muted-foreground bg-muted/50 p-3 rounded-md">{result.suggestedDepartments}</p>
              </div>
            )}
            {result.urgencyAssessment && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-accent flex items-center"><Activity className="mr-2 h-5 w-5" /> Urgency Assessment:</h3>
                 <p className="text-muted-foreground bg-muted/50 p-3 rounded-md">{result.urgencyAssessment}</p>
              </div>
            )}
            {result.disclaimer && (
              <Alert variant="destructive" className="mt-6">
                <ShieldAlert className="h-5 w-5" />
                <AlertTitle className="font-semibold">Important Disclaimer</AlertTitle>
                <AlertDescription>
                  {result.disclaimer}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
