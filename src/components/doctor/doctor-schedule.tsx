
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, User, FilePlus, Send, Eye, Loader2, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';

// TODO: When integrating Firebase:
// import { auth, db } from '@/lib/firebase/config';
// import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';

// Define the structure of an appointment
interface Appointment {
  id: string;
  patientName: string;
  date: Date; // Or Timestamp from Firestore, then convert
  time: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
  appointmentMode?: 'In-Person' | 'Teleconsultation';
  reason?: string;
  notes?: string;
  // Add other fields as necessary, e.g., patientId, doctorId
}


// Mock data for doctor's appointments
const mockDoctorAppointments: Appointment[] = [
  { id: 'appt_doc_1', patientName: 'Alice Wonderland', date: new Date(), time: '09:00 AM', status: 'Scheduled', appointmentMode: 'In-Person', reason: 'Annual Checkup' },
  { id: 'appt_doc_2', patientName: 'Bob The Builder', date: new Date(), time: '09:30 AM', status: 'Scheduled', appointmentMode: 'Teleconsultation', reason: 'Follow-up Consultation' },
  { id: 'appt_doc_3', patientName: 'Charlie Brown', date: new Date(new Date().setDate(new Date().getDate() -1)), time: '10:00 AM', status: 'Completed', appointmentMode: 'In-Person', notes: 'Prescribed antibiotics. Follow up if no improvement.' },
  { id: 'appt_doc_4', patientName: 'Diana Prince', date: new Date(), time: '10:30 AM', status: 'Scheduled', appointmentMode: 'In-Person', reason: 'Fever and Cough' },
  { id: 'appt_doc_5', patientName: 'Edward Scissorhands', date: new Date(new Date().setDate(new Date().getDate() -2)), time: '11:00 AM', status: 'Canceled', appointmentMode: 'Teleconsultation', notes: 'Patient rescheduled.' },
  { id: 'appt_doc_6', patientName: 'Fiona Gallagher', date: new Date(new Date().setDate(new Date().getDate() + 1)), time: '02:00 PM', status: 'Scheduled', appointmentMode: 'Teleconsultation', reason: 'Vaccination' },
];

export function DoctorSchedule() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [appointments, setAppointments] = useState<Appointment[]>(mockDoctorAppointments); // Initialize with mock, will be replaced by Firestore data
  const [isLoading, setIsLoading] = useState(true); // For loading state from Firestore
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');
  const { toast } = useToast();

  // const [user, loadingAuth, errorAuth] = useAuthState(auth); // For Firebase Auth

  useEffect(() => {
    // TODO: Implement fetching appointments from Firestore for the logged-in doctor
    // if (!user && !loadingAuth) {
    //   // Handle case where user is not logged in or auth state is still loading
    //   setIsLoading(false);
    //   // router.push('/login'); // or display a message
    //   return;
    // }
    // if (user) {
    //   setIsLoading(true);
    //   const appointmentsCol = collection(db, 'appointments');
    //   // Assuming doctorId is stored in appointment documents
    //   const q = query(appointmentsCol, where('doctorId', '==', user.uid));
      
    //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const fetchedAppointments: Appointment[] = [];
    //     querySnapshot.forEach((doc) => {
    //       const data = doc.data();
    //       fetchedAppointments.push({
    //         id: doc.id,
    //         patientName: data.patientName,
    //         // Firestore timestamps need to be converted to Date objects
    //         date: data.appointmentDate.toDate ? data.appointmentDate.toDate() : new Date(data.appointmentDate), 
    //         time: data.appointmentTime,
    //         status: data.status as Appointment['status'],
    //         appointmentMode: data.appointmentMode as Appointment['appointmentMode'],
    //         reason: data.reasonForVisit,
    //         notes: data.notes,
    //       });
    //     });
    //     setAppointments(fetchedAppointments);
    //     setIsLoading(false);
    //   }, (error) => {
    //     console.error("Error fetching appointments: ", error);
    //     toast({ title: "Error", description: "Could not fetch appointments.", variant: "destructive" });
    //     setIsLoading(false);
    //   });

    //   return () => unsubscribe(); // Cleanup listener on component unmount
    // }
    // For now, just simulate loading delay with mock data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [/* user, loadingAuth, toast */]);


  const filteredAppointments = appointments.filter(apt => {
    if (statusFilter === 'all') return true;
    return apt.status.toLowerCase() === statusFilter;
  }).sort((a,b) => { 
    const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return a.time.localeCompare(b.time);
  });

  const getStatusIconAndColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return { icon: <Clock className="h-4 w-4 text-blue-500" />, color: 'text-blue-500', badgeVariant: 'outline' as const };
      case 'Completed': return { icon: <CheckCircle className="h-4 w-4 text-green-500" />, color: 'text-green-500', badgeVariant: 'default' as const };
      case 'Canceled': return { icon: <XCircle className="h-4 w-4 text-red-500" />, color: 'text-red-500', badgeVariant: 'destructive' as const };
      default: return { icon: <Clock className="h-4 w-4 text-gray-500" />, color: 'text-gray-500', badgeVariant: 'secondary' as const };
    }
  };
  
  const handleOpenPrescriptionModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsPrescriptionModalOpen(true);
  };
  
  const handleOpenNotesModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCurrentNotes(appointment.notes || appointment.reason || '');
    setIsNotesModalOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedAppointment) return;
    // TODO: Implement saving notes to Firestore
    // try {
    //   const appointmentRef = doc(db, 'appointments', selectedAppointment.id);
    //   await updateDoc(appointmentRef, {
    //     notes: currentNotes,
    //     // Optionally, update a 'lastModified' timestamp
    //   });
    //   toast({ title: "Success", description: "Notes updated successfully." });
    //   setIsNotesModalOpen(false);
    //   // The onSnapshot listener should automatically update the local state
    // } catch (error) {
    //   console.error("Error updating notes:", error);
    //   toast({ title: "Error", description: "Failed to update notes.", variant: "destructive" });
    // }
    console.log("Saving notes for appointment:", selectedAppointment.id, "Notes:", currentNotes);
    toast({ title: "Notes Saved (Mock)", description: "Notes would be saved to the database." });
    // Manually update mock data for demonstration
    setAppointments(prev => prev.map(apt => apt.id === selectedAppointment.id ? {...apt, notes: currentNotes} : apt));
    setIsNotesModalOpen(false);
  };

  const handleUpdateAppointmentStatus = async (appointmentId: string, newStatus: Appointment['status']) => {
    // TODO: Implement updating appointment status in Firestore
    // try {
    //   const appointmentRef = doc(db, 'appointments', appointmentId);
    //   await updateDoc(appointmentRef, {
    //     status: newStatus,
    //     // If completing, perhaps add a completedAt timestamp
    //     // If canceling, perhaps add a reason for cancellation
    //   });
    //   toast({ title: "Status Updated", description: `Appointment marked as ${newStatus}.` });
    //   // Firestore onSnapshot will update UI
    // } catch (error) {
    //   console.error("Error updating status:", error);
    //   toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    // }
    console.log("Updating status for:", appointmentId, "to:", newStatus);
    toast({ title: "Status Updated (Mock)", description: `Appointment status changed to ${newStatus}.` });
    // Manually update mock data for demonstration
    setAppointments(prev => prev.map(apt => apt.id === appointmentId ? {...apt, status: newStatus} : apt));
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading schedule...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="font-headline text-2xl text-primary">Your Schedule</CardTitle>
          <CardDescription>View and manage your appointments.</CardDescription>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Reason/Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((apt) => {
                  const { icon, badgeVariant } = getStatusIconAndColor(apt.status);
                  return (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium flex items-center gap-2"> <User className="h-4 w-4 text-muted-foreground"/> {apt.patientName}</TableCell>
                    <TableCell>{format(new Date(apt.date), 'PPP')}</TableCell>
                    <TableCell>{apt.time}</TableCell>
                    <TableCell>
                      {apt.appointmentMode === 'Teleconsultation' ? (
                        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                          <Video className="h-3 w-3" /> Teleconsultation
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                           <User className="h-3 w-3" /> In-Person
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{apt.status === 'Completed' || apt.status === 'Canceled' ? apt.notes : apt.reason}</TableCell>
                    <TableCell>
                      <Badge variant={badgeVariant} className="flex items-center gap-1 w-fit">
                        {icon} {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-1 space-y-1 md:space-y-0">
                      <Button variant="outline" size="sm" onClick={() => handleOpenNotesModal(apt)}><Eye className="h-3 w-3 mr-1"/>View/Edit Notes</Button>
                      {apt.status === 'Scheduled' && (
                        <>
                          {apt.appointmentMode === 'Teleconsultation' && (
                            <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10" asChild>
                              <Link href={`/teleconsultation-session/${apt.id}`}>
                                <Video className="h-3 w-3 mr-1"/>Start Call
                              </Link>
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50" onClick={() => handleUpdateAppointmentStatus(apt.id, 'Completed')}><CheckCircle className="h-3 w-3 mr-1"/>Complete</Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleUpdateAppointmentStatus(apt.id, 'Canceled')}><XCircle className="h-3 w-3 mr-1"/>Cancel</Button>
                        </>
                      )}
                       {(apt.status === 'Scheduled' || apt.status === 'Completed') && (
                        <Button variant="outline" size="sm" className="text-accent border-accent hover:bg-accent/10" onClick={() => handleOpenPrescriptionModal(apt)}>
                          <FilePlus className="h-3 w-3 mr-1"/>Prescription
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">No appointments match your filter criteria.</p>
        )}
      </CardContent>

      {/* Prescription Dialog */}
      <Dialog open={isPrescriptionModalOpen} onOpenChange={setIsPrescriptionModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Create Prescription for {selectedAppointment?.patientName}</DialogTitle>
            <DialogDescription>
              Fill in the details for the prescription. This will be recorded and can be shared with the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* TODO: This form should submit to save prescription data to Firestore */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="medication" className="text-right">Medication</Label>
              <Input id="medication" placeholder="e.g., Amoxicillin 250mg" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dosage" className="text-right">Dosage</Label>
              <Input id="dosage" placeholder="e.g., 1 tablet 3 times a day" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">Duration</Label>
              <Input id="duration" placeholder="e.g., 7 days" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prescription-notes" className="text-right">Additional Notes</Label>
              <Textarea id="prescription-notes" placeholder="e.g., Take after meals. Avoid dairy products." className="col-span-3 min-h-[80px]" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPrescriptionModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => {
              // TODO: Implement actual prescription saving logic
              toast({title: "Prescription Saved (Mock)", description: "Prescription details would be saved."});
              setIsPrescriptionModalOpen(false);
            }}><Send className="h-4 w-4 mr-2"/>Save Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
       <Dialog open={isNotesModalOpen} onOpenChange={setIsNotesModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Consultation Notes for {selectedAppointment?.patientName}</DialogTitle>
            <DialogDescription>
              View or update consultation notes for this appointment.
            </Description>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid w-full gap-1.5">
              <Label htmlFor="consultation-notes">Notes</Label>
              <Textarea 
                placeholder="Enter consultation notes, diagnosis, and follow-up plan..." 
                id="consultation-notes" 
                value={currentNotes}
                onChange={(e) => setCurrentNotes(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsNotesModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

    