'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, User, FilePlus, Send, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';


// Mock data for doctor's appointments
const mockDoctorAppointments = [
  { id: 'appt_doc_1', patientName: 'Alice Wonderland', date: new Date(), time: '09:00 AM', status: 'Scheduled', reason: 'Annual Checkup' },
  { id: 'appt_doc_2', patientName: 'Bob The Builder', date: new Date(), time: '09:30 AM', status: 'Scheduled', reason: 'Follow-up Consultation' },
  { id: 'appt_doc_3', patientName: 'Charlie Brown', date: new Date(new Date().setDate(new Date().getDate() -1)), time: '10:00 AM', status: 'Completed', notes: 'Prescribed antibiotics. Follow up if no improvement.' },
  { id: 'appt_doc_4', patientName: 'Diana Prince', date: new Date(), time: '10:30 AM', status: 'Scheduled', reason: 'Fever and Cough' },
  { id: 'appt_doc_5', patientName: 'Edward Scissorhands', date: new Date(new Date().setDate(new Date().getDate() -2)), time: '11:00 AM', status: 'Canceled', notes: 'Patient rescheduled.' },
  { id: 'appt_doc_6', patientName: 'Fiona Gallagher', date: new Date(new Date().setDate(new Date().getDate() + 1)), time: '02:00 PM', status: 'Scheduled', reason: 'Vaccination' },
];

export function DoctorSchedule() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<typeof mockDoctorAppointments[0] | null>(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);


  const filteredAppointments = mockDoctorAppointments.filter(apt => {
    if (statusFilter === 'all') return true;
    return apt.status.toLowerCase() === statusFilter;
  }).sort((a,b) => { // Sort by date and then by time
    const dateComparison = a.date.getTime() - b.date.getTime();
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
  
  const handleOpenPrescriptionModal = (appointment: typeof mockDoctorAppointments[0]) => {
    setSelectedAppointment(appointment);
    setIsPrescriptionModalOpen(true);
  };
  
  const handleOpenNotesModal = (appointment: typeof mockDoctorAppointments[0]) => {
    setSelectedAppointment(appointment);
    setIsNotesModalOpen(true);
  };

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
                    <TableCell>{format(apt.date, 'PPP')}</TableCell>
                    <TableCell>{apt.time}</TableCell>
                    <TableCell className="max-w-xs truncate">{apt.status === 'Completed' || apt.status === 'Canceled' ? apt.notes : apt.reason}</TableCell>
                    <TableCell>
                      <Badge variant={badgeVariant} className="flex items-center gap-1 w-fit">
                        {icon} {apt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-1">
                      <Button variant="outline" size="sm" onClick={() => handleOpenNotesModal(apt)}><Eye className="h-3 w-3 mr-1"/>View/Edit Notes</Button>
                      {apt.status === 'Scheduled' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50" onClick={() => console.log("Mark Complete", apt.id)}><CheckCircle className="h-3 w-3 mr-1"/>Complete</Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => console.log("Cancel Appt", apt.id)}><XCircle className="h-3 w-3 mr-1"/>Cancel</Button>
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
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Send className="h-4 w-4 mr-2"/>Save Prescription</Button>
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
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid w-full gap-1.5">
              <Label htmlFor="consultation-notes">Notes</Label>
              <Textarea 
                placeholder="Enter consultation notes, diagnosis, and follow-up plan..." 
                id="consultation-notes" 
                defaultValue={selectedAppointment?.notes || selectedAppointment?.reason} 
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsNotesModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
