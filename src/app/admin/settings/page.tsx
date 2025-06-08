
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Bell, MessageSquare, ShieldAlert, Palette, Hospital as HospitalIcon, ListPlus, BedDouble, Trash2, PlusCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Mock data for services and bed capacity
const mockServicesData = [
  { id: 'serv1', name: 'Cardiology' },
  { id: 'serv2', name: 'Pediatrics' },
  { id: 'serv3', name: 'Emergency Care' },
  { id: 'serv4', name: 'Neurology' },
];

const mockDepartmentBedCapacity = [
  { id: 'dept1', name: 'Intensive Care Unit (ICU)', totalBeds: 20 },
  { id: 'dept2', name: 'General Ward - Male', totalBeds: 50 },
  { id: 'dept3', name: 'Maternity Ward', totalBeds: 25 },
];


export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <Settings className="h-10 w-10 text-primary" />
          <div>
            <CardTitle className="text-3xl font-headline text-primary">System & Hospital Settings</CardTitle>
            <CardDescription>Configure system parameters, hospital details, services, and capacities for MediQueue.</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hospital Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><HospitalIcon className="h-5 w-5 text-accent" /> Hospital Profile</CardTitle>
            <CardDescription>Manage general information about the hospital.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hospital-name">Hospital Name</Label>
              <Input id="hospital-name" placeholder="e.g., City Central Hospital" defaultValue="MediQueue General Hospital" />
            </div>
            <div>
              <Label htmlFor="hospital-address">Address</Label>
              <Textarea id="hospital-address" placeholder="123 Main Street, Anytown, ST 12345" defaultValue="123 Health Ave, Wellness City, HC 54321" />
            </div>
             <div>
              <Label htmlFor="hospital-contact">Contact Number</Label>
              <Input id="hospital-contact" placeholder="+1-555-123-4567" defaultValue="+1-800-MEDIQUE" />
            </div>
            <div>
              <Label htmlFor="hospital-email">Public Email</Label>
              <Input id="hospital-email" type="email" placeholder="info@hospital.com" defaultValue="contact@mediqueue.org" />
            </div>
          </CardContent>
        </Card>

        {/* Manage Services Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="font-headline flex items-center gap-2"><ListPlus className="h-5 w-5 text-accent" /> Manage Services Offered</CardTitle>
              <CardDescription>Define the medical services available at the hospital.</CardDescription>
            </div>
            <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Service</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockServicesData.map(service => (
              <div key={service.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                <span className="text-sm font-medium">{service.name}</span>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {mockServicesData.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No services added yet.</p>}
             <div className="flex items-center space-x-2 pt-2">
              <Input placeholder="New service name (e.g., Oncology)" />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Add</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Department Bed Capacity Card */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="font-headline flex items-center gap-2"><BedDouble className="h-5 w-5 text-accent" /> Department Bed Capacity</CardTitle>
              <CardDescription>Set the total number of beds for each department.</CardDescription>
            </div>
             <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Department Capacity</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockDepartmentBedCapacity.map(dept => (
              <div key={dept.id} className="flex flex-col sm:flex-row items-center justify-between p-3 border rounded-md bg-muted/50 gap-2">
                <Label htmlFor={`bed-capacity-${dept.id}`} className="text-sm font-medium flex-1">{dept.name}</Label>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Input id={`bed-capacity-${dept.id}`} type="number" defaultValue={dept.totalBeds} className="w-24" />
                  <span className="text-sm text-muted-foreground">beds</span>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {mockDepartmentBedCapacity.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No department capacities set.</p>}
            <p className="text-xs text-muted-foreground pt-2">Note: This sets the total capacity. Real-time availability is managed on the 'Bed Availability' page.</p>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Bell className="h-5 w-5 text-accent" /> Notification Settings</CardTitle>
            <CardDescription>Manage how users receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Enable Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">Enable SMS Notifications (Twilio)</Label>
              <Switch id="sms-notifications" />
            </div>
            <div>
              <Label htmlFor="reminder-lead-time">Appointment Reminder Lead Time</Label>
              <Select defaultValue="24">
                <SelectTrigger id="reminder-lead-time">
                  <SelectValue placeholder="Select lead time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour before</SelectItem>
                  <SelectItem value="3">3 hours before</SelectItem>
                  <SelectItem value="12">12 hours before</SelectItem>
                  <SelectItem value="24">24 hours before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Communication Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><MessageSquare className="h-5 w-5 text-accent" /> Communication APIs</CardTitle>
            <CardDescription>Configure API keys for external communication services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="twilio-sid">Twilio Account SID</Label>
              <Input id="twilio-sid" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
            </div>
            <div>
              <Label htmlFor="twilio-auth-token">Twilio Auth Token</Label>
              <Input id="twilio-auth-token" type="password" placeholder="••••••••••••••••••••••" />
            </div>
             <div>
              <Label htmlFor="sendgrid-api-key">SendGrid API Key (for Emails)</Label>
              <Input id="sendgrid-api-key" type="password" placeholder="SG.••••••••••••••••••••••" />
            </div>
          </CardContent>
        </Card>
        
        {/* Security Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-accent" /> Security Settings</CardTitle>
            <CardDescription>Manage security parameters of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="mfa">Enable Multi-Factor Authentication for Admins</Label>
              <Switch id="mfa" />
            </div>
             <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
          </CardContent>
        </Card>

        {/* Theme/Branding Card - This card is removed as per user's last request on images */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Palette className="h-5 w-5 text-accent" /> Theme & Branding</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
              <Label htmlFor="logo-upload">Upload Hospital Logo</Label>
              <Input id="logo-upload" type="file" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Allow User Dark Mode Preference</Label>
              <Switch id="dark-mode" defaultChecked />
            </div>
          </CardContent>
        </Card> */}
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save All Settings</Button>
      </div>
    </div>
  );
}

    