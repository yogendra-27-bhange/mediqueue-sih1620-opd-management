import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, RefreshCw, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for OPD queues
const mockOpdQueues = [
  { id: '1', department: 'General Medicine', doctor: 'Dr. Alex Ray', currentToken: 25, totalTokens: 50, avgWaitTime: '15 min' },
  { id: '2', department: 'Cardiology', doctor: 'Dr. Emily Carter', currentToken: 10, totalTokens: 30, avgWaitTime: '25 min' },
  { id: '3', department: 'Pediatrics', doctor: 'Dr. John Lee', currentToken: 18, totalTokens: 40, avgWaitTime: '10 min' },
  { id: '4', department: 'Orthopedics', doctor: 'Dr. Michael Brown', currentToken: 5, totalTokens: 20, avgWaitTime: '30 min' },
];

export default function OpdQueuePage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <ListChecks className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline text-primary">Real-Time OPD Queue</CardTitle>
              <CardDescription>Monitor patient queues across different OPD departments.</CardDescription>
            </div>
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {mockOpdQueues.map((queue) => (
              <Card key={queue.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-xl">{queue.department}</CardTitle>
                      <CardDescription>with {queue.doctor}</CardDescription>
                    </div>
                    <Badge variant={queue.currentToken / queue.totalTokens > 0.7 ? "destructive" : "secondary"}>
                      {queue.currentToken / queue.totalTokens > 0.7 ? "High Load" : "Moderate Load"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center"><Users className="h-4 w-4 mr-1" /> Current Token:</span>
                    <span className="font-semibold text-lg text-primary">{queue.currentToken} / {queue.totalTokens}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center"><Clock className="h-4 w-4 mr-1" /> Avg. Wait Time:</span>
                    <span className="font-semibold text-accent">{queue.avgWaitTime}</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {mockOpdQueues.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No active OPD queues at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
