
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
import { CalendarIcon, Loader2, Send, Video, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label'; // Added this import

// TODO: When integrating Firebase:
// import { auth, db } from '@/lib/firebase/config';
// import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth'; // Optional: for getting current user

// Mock data - in a real app, this would come from an API or Firestore
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

// Mock available time slots. In a real app, this would be fetched based on doctor's availability and existing appointments.
const mockTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
];


const formSchema = z.object({
  department: z.string({ required_error: 'Please select a department.' }),
  doctor: z.string({ required_error: 'Please select a doctor.' }),
  appointmentDate: z.date({ required_error: 'Please select a date for your appointment.' }),
  appointmentTime: z.string({ required_error: 'Please select a time slot.' }),
  appointmentMode: z.enum(['in-person', 'teleconsultation'], { required_error: 'Please select an appointment mode.'}),
  reasonForVisit: z.string().min(10, { message: 'Please provide a brief reason for your visit (at least 10 characters).' }).max(500, { message: 'Reason cannot exceed 500 characters.'}),
  patientPhoneNumber: z.string().optional(), // Optional for now, make required if Twilio is fully integrated
});

export function AppointmentBookingForm() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [availableDoctors, setAvailableDoctors] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // const [user, loadingAuth, errorAuth] = useAuthState(auth); // Optional: for getting current user

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reasonForVisit: '',
      patientPhoneNumber: '',
      appointmentMode: 'in-person',
    }
  });

  useEffect(() => {
    // TODO: Fetch departments and doctors from Firestore instead of using mock data
    if (selectedDepartment) {
      setAvailableDoctors(mockDoctors[selectedDepartment] || []);
      form.resetField('doctor'); // Reset doctor field when department changes
    } else {
      setAvailableDoctors([]);
    }
  }, [selectedDepartment, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Appointment booking values:", values);

    // TODO: Implement saving appointment to Firestore
    // if (!user) {
    //   toast({ title: "Authentication Error", description: "You must be logged in to book an appointment.", variant: "destructive" });
    //   setIsLoading(false);
    //   return;
    // }

    try {
      // const appointmentData = {
      //   patientId: user.uid,
      //   patientName: user.displayName || "Anonymous", // Or fetch from user's profile in Firestore
      //   patientEmail: user.email,
      //   patientPhoneNumber: values.patientPhoneNumber, // Ensure this is collected
      //   departmentId: values.department, // This should be the ID, not name
      //   departmentName: mockDepartments.find(d => d.id === values.department)?.name,
      //   doctorId: availableDoctors.find(d => d.name === values.doctor)?.id, // This should be the ID
      //   doctorName: values.doctor,
      //   appointmentDate: values.appointmentDate,
      //   appointmentTime: values.appointmentTime,
      //   appointmentMode: values.appointmentMode,
      //   reasonForVisit: values.reasonForVisit,
      //   status: "Scheduled", // Initial status
      //   createdAt: serverTimestamp(),
      // };
      // const docRef = await addDoc(collection(db, "appointments"), appointmentData);
      // console.log("Appointment booked with ID: ", docRef.id);

      toast({
        title: "Appointment Booked! (Mock)",
        description: `Your ${values.appointmentMode === 'teleconsultation' ? 'teleconsultation' : 'in-person appointment'} with ${values.doctor} for ${mockDepartments.find(d=>d.id === values.department)?.name} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} has been successfully scheduled.`,
      });

      // TODO: Trigger SMS notification via Twilio
      // This would typically be done by calling a serverless function or an API route
      // to keep Twilio credentials secure.
      // if (values.patientPhoneNumber) {
      //   try {
      //     const response = await fetch('/api/send-sms', { // Example API route
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({
      //         to: values.patientPhoneNumber,
      //         body: `Your MediQueue appointment with ${values.doctor} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} is confirmed.`
      //       }),
      //     });
      //     if (!response.ok) throw new Error('SMS sending failed');
      //     console.log("SMS notification sent successfully.");
      //   } catch (smsError) {
      //     console.error("Error sending SMS:", smsError);
      //     // Optionally notify user that SMS might have failed, but appointment is booked.
      //   }
      // }

      form.reset();
      setSelectedDepartment(null);
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Could not book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* TODO: Add a field for patientPhoneNumber if Twilio integration is pursued */}
        {/* <FormField
          control={form.control}
          name="patientPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Phone Number (for SMS reminders)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
                  {mockDepartments.map(dept => ( // TODO: Replace with data from Firestore
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
                  {availableDoctors.map(doc => ( // TODO: Replace with data from Firestore
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
          name="appointmentMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Appointment Mode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="in-person" id="in-person" />
                    </FormControl>
                    <Label htmlFor="in-person" className="font-normal flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" /> In-Person
                    </Label>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="teleconsultation" id="teleconsultation" />
                    </FormControl>
                    <Label htmlFor="teleconsultation" className="font-normal flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" /> Teleconsultation
                    </Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
                  {mockTimeSlots.map(slot => ( // TODO: Fetch available slots from Firestore based on doctor and date
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
