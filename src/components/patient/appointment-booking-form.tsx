'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { format } from "date-fns";

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from an API
const mockDepartments = [
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'neurology', name: 'Neurology' },
  { id: 'orthopedics', name: 'Orthopedics' },
  { id: 'general', name: 'General Medicine' },
];

const mockDoctors: Record<string, { id: string; name: string }[]> = {
  cardiology: [
    { id: 'dr_smith_cardio', name: 'Dr. Smith (Cardiology)' },
    { id: 'dr_jones_cardio', name: 'Dr. Jones (Cardiology)' },
  ],
  pediatrics: [
    { id: 'dr_lee_peds', name: 'Dr. Lee (Pediatrics)' },
    { id: 'dr_davis_peds', name: 'Dr. Davis (Pediatrics)' },
  ],
  neurology: [
    { id: 'dr_white_neuro', name: 'Dr. White (Neurology)' },
  ],
   orthopedics: [
    { id: 'dr_brown_ortho', name: 'Dr. Brown (Orthopedics)' },
  ],
  general: [
    { id: 'dr_green_general', name: 'Dr. Green (General Medicine)' },
  ]
};

const mockTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
];


const formSchema = z.object({
  department: z.string({ required_error: 'Please select a department.' }),
  doctor: z.string({ required_error: 'Please select a doctor.' }),
  appointmentDate: z.date({ required_error: 'Please select a date for your appointment.' }),
  appointmentTime: z.string({ required_error: 'Please select a time slot.' }),
  reasonForVisit: z.string().min(10, { message: 'Please provide a brief reason for your visit (at least 10 characters).' }).max(500, { message: 'Reason cannot exceed 500 characters.'}),
});

export function AppointmentBookingForm() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [availableDoctors, setAvailableDoctors] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reasonForVisit: '',
    }
  });
  
  useEffect(() => {
    if (selectedDepartment) {
      setAvailableDoctors(mockDoctors[selectedDepartment] || []);
      form.resetField('doctor'); // Reset doctor field when department changes
    } else {
      setAvailableDoctors([]);
    }
  }, [selectedDepartment, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Appointment Booked!",
        description: `Your appointment with ${values.doctor} for ${values.department} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} has been successfully scheduled.`,
      });
      form.reset();
      setSelectedDepartment(null);
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedDepartment(value);
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockDepartments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedDepartment || availableDoctors.length === 0}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedDepartment ? "Select a doctor" : "Select department first"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableDoctors.map(doc => (
                    <SelectItem key={doc.id} value={doc.name}>{doc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedDepartment && <FormDescription>Please select a department to see available doctors.</FormDescription>}
              {selectedDepartment && availableDoctors.length === 0 && <FormDescription>No doctors available for this department currently.</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Appointment Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appointmentTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.getValues("appointmentDate")}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={form.getValues("appointmentDate") ? "Select a time slot" : "Select date first"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockTimeSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!form.getValues("appointmentDate") && <FormDescription>Please select a date to see available time slots.</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reasonForVisit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe the reason for your appointment..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Book Appointment
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
