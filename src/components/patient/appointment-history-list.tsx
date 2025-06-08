'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, FileText, Filter, Download } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Mock data for appointment history
const mockAppointments = [
  { id: 'appt_1', date: new Date(2024, 5, 15), doctor: 'Dr. Smith', department: 'Cardiology', status: 'Completed', notes: 'Follow up in 6 months. Prescribed medication X.' },
  { id: 'appt_2', date: new Date(2024, 4, 20), doctor: 'Dr. Lee', department: 'Pediatrics', status: 'Completed', notes: 'Routine check-up. All clear.' },
  { id: 'appt_3', date: new Date(2024, 3, 10), doctor: 'Dr. Jones', department: 'Cardiology', status: 'Canceled', notes: 'Patient canceled due to conflict.' },
  { id: 'appt_4', date: new Date(2024, 2, 5), doctor: 'Dr. White', department: 'Neurology', status: 'Completed', notes: 'Initial consultation. MRI scheduled.' },
  { id: 'appt_5', date: new Date(2023, 11, 1), doctor: 'Dr. Smith', department: 'Cardiology', status: 'Completed', notes: 'Annual heart check-up. ECG normal.' },
];

export function AppointmentHistoryList() {
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredAppointments = mockAppointments.filter(apt => {
    const dateMatch = filterDate ? format(apt.date, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd') : true;
    const statusMatch = statusFilter === 'all' ? true : apt.status.toLowerCase() === statusFilter;
    const searchMatch = searchTerm === '' ? true : 
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || 
      apt.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.notes && apt.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return dateMatch && statusMatch && searchMatch;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'default'; // Using primary for completed
      case 'Canceled': return 'destructive';
      default: return 'secondary';
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-muted/30">
        <Input 
          placeholder="Search by doctor, department, notes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full md:w-[240px] justify-start text-left font-normal",
                !filterDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterDate ? format(filterDate, "PPP") : <span>Filter by date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filterDate}
              onSelect={setFilterDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={() => { setFilterDate(undefined); setStatusFilter('all'); setSearchTerm(''); }}>
          <Filter className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </div>

      {filteredAppointments.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell>{format(apt.date, 'PPP')}</TableCell>
                <TableCell>{apt.doctor}</TableCell>
                <TableCell>{apt.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(apt.status)}>{apt.status}</Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> Notes</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Doctor's Notes</h4>
                          <p className="text-sm text-muted-foreground">
                            {apt.notes || "No notes available for this appointment."}
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="sm" className="text-accent border-accent hover:bg-accent/10"><Download className="h-4 w-4 mr-1" /> Report</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-muted-foreground py-10">No appointments match your filters.</p>
      )}
    </div>
  );
}
