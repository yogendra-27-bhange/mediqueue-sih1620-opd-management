
import Link from 'next/link';
import { Hospital, LogIn, UserPlus, LayoutDashboard, CalendarDays, History, Users, BriefcaseMedical, BedDouble, ListChecks, Lightbulb, MapPin, Settings as SettingsIcon, Hospital as HospitalIconMenu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Header() {
  // Simulate user role - in a real app, this would come from auth context
  const userRole = 'patient'; // Can be 'patient', 'doctor', 'admin', or null

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'doctor') return '/doctor/dashboard';
    return '/patient/dashboard'; // Default to patient or if role is null
  };

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Hospital className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">MediQueue</h1>
        </Link>
        <nav className="flex items-center gap-1 md:gap-2">
          {/* Navigation items for all users */}
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/" className="font-medium">Home</Link>
          </Button>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href={getDashboardLink()} className="font-medium">Dashboard</Link>
          </Button>
          
          {userRole === 'patient' && (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/patient/book-appointment" className="font-medium flex items-center"><CalendarDays className="mr-1 h-4 w-4"/> Book</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/patient/appointment-history" className="font-medium flex items-center"><History className="mr-1 h-4 w-4"/> History</Link>
              </Button>
               <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/patient/find-hospital" className="font-medium flex items-center"><MapPin className="mr-1 h-4 w-4"/> Find Hospital</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/patient/bed-availability" className="font-medium flex items-center"><BedDouble className="mr-1 h-4 w-4"/> Bed Availability</Link>
              </Button>
            </>
          )}

          {userRole === 'admin' && (
             <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/admin/settings" className="font-medium">Settings</Link>
              </Button>
          )}
          

          {/* Role-based dropdown for smaller screens or more options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-medium md:hidden">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/" >Home</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href={getDashboardLink()} >Dashboard</Link></DropdownMenuItem>
              {userRole === 'patient' && (
                <>
                  <DropdownMenuItem asChild><Link href="/patient/book-appointment">Book Appointment</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/patient/appointment-history">Appointment History</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/patient/find-hospital">Find Nearby Hospital</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/patient/bed-availability">Bed Availability</Link></DropdownMenuItem>
                </>
              )}
               {userRole === 'doctor' && (
                <>
                  {/* Add doctor specific mobile links here */}
                </>
              )}
              {userRole === 'admin' && (
                 <>
                  <DropdownMenuItem asChild><Link href="/admin/manage-doctors">Manage Doctors</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/manage-departments">Manage Departments</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/bed-availability">Bed Availability</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/admissions">Admissions</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/opd-queue">OPD Queue</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/smart-slot-allocation">Smart Slots</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/settings">System Settings</Link></DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Account</DropdownMenuLabel>
               <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2"><LogIn /> Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup" className="flex items-center gap-2"><UserPlus /> Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth buttons for larger screens */}
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          </Button>
          <Button variant="default" asChild className="hidden md:inline-flex">
            <Link href="/signup" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" /> Sign Up
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
