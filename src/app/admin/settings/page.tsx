import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Bell, MessageSquare, ShieldAlert, Palette } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <Settings className="h-10 w-10 text-primary" />
          <div>
            <CardTitle className="text-3xl font-headline text-primary">System Settings</CardTitle>
            <CardDescription>Configure various system parameters and preferences for MediQueue.</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
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

        {/* Theme/Branding Card */}
        <Card>
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
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save All Settings</Button>
      </div>
    </div>
  );
}
