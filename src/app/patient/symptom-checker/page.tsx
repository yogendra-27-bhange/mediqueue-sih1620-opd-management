import { SymptomCheckerForm } from '@/components/patient/symptom-checker-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';

export default function SymptomCheckerPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader className="text-center">
           <div className="inline-flex justify-center items-center">
            <Stethoscope className="h-12 w-12 text-primary mb-2" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">AI Symptom Checker</CardTitle>
          <CardDescription>Describe your symptoms to get a general assessment and guidance on which department you might consider consulting. This tool does not provide medical diagnosis.</CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomCheckerForm />
        </CardContent>
      </Card>
    </div>
  );
}
