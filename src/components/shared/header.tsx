
import Link from 'next/link';
import { Hospital, LogIn, UserPlus, LayoutDashboard, CalendarDays, History, Users, BriefcaseMedical, BedDouble, ListChecks, Lightbulb, MapPin, Settings as SettingsIcon, Hospital as HospitalIconMenu, Ambulance, UserCircle, Pill, MoreHorizontal, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';

export function Header() {
  // Simulate user role - in a real app, this would come from auth context
  const userRole = 'patient'; // Can be 'patient', 'doctor', 'admin', or null

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'doctor') return '/doctor/dashboard';
    if (userRole === 'patient') return '/patient/dashboard';
    return '/login'; // Default if no role or specific dashboard, direct to login
  };

  const profileLink = '/profile'; 

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
          
          { userRole && (
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href={getDashboardLink()} className="font-medium">Dashboard</Link>
            </Button>
          )}
          
          {userRole === 'patient' && (
            <>
              <Button variant="ghost" asChild className="hidden lg:inline-flex">
                <Link href="/patient/book-appointment" className="font-medium flex items-center"><CalendarDays className="mr-1 h-4 w-4"/> Book</Link>
              </Button>
              {/* Patient More Services Dropdown for medium screens */}
              <div className="hidden md:inline-flex lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="font-medium flex items-center">
                      More <MoreHorizontal className="ml-1 h-4 w-4"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Patient Services</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/patient/appointment-history" className="flex items-center"><History className="mr-2 h-4 w-4"/>Appointment History</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/symptom-checker" className="flex items-center"><Stethoscope className="mr-2 h-4 w-4"/>Symptom Checker</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/find-hospital" className="flex items-center"><MapPin className="mr-2 h-4 w-4"/>Find Hospital</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/find-pharmacy" className="flex items-center"><Pill className="mr-2 h-4 w-4"/>Find Pharmacy</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/bed-availability" className="flex items-center"><BedDouble className="mr-2 h-4 w-4"/>Bed Availability</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Patient Links for large screens */}
              <Button variant="ghost" asChild className="hidden lg:inline-flex">
                <Link href="/patient/appointment-history" className="font-medium flex items-center"><History className="mr-1 h-4 w-4"/> History</Link>
              </Button>
               <Button variant="ghost" asChild className="hidden lg:inline-flex">
                <Link href="/patient/symptom-checker" className="font-medium flex items-center"><Stethoscope className="mr-1 h-4 w-4"/> Symptom Check</Link>
              </Button>
               <Button variant="ghost" asChild className="hidden lg:inline-flex">
                <Link href="/patient/find-hospital" className="font-medium flex items-center"><MapPin className="mr-1 h-4 w-4"/> Find Hospital</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden lg:inline-flex">
                <Link href="/patient/find-pharmacy" className="font-medium flex items-center"><Pill className="mr-1 h-4 w-4"/> Find Pharmacy</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden lg:inline-flex">
                <Link href="/patient/bed-availability" className="font-medium flex items-center"><BedDouble className="mr-1 h-4 w-4"/> Bed Availability</Link>
              </Button>
            </>
          )}

          {userRole === 'admin' && (
             <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/admin/settings" className="font-medium">Settings</Link>
              </Button>
          )}
          
          {/* Main mobile "Menu" Dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-medium">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/" >Home</Link></DropdownMenuItem>
                {userRole && <DropdownMenuItem asChild><Link href={getDashboardLink()} >Dashboard</Link></DropdownMenuItem>}
                
                {userRole === 'patient' && (
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuLabel>Patient Services</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/patient/book-appointment">Book Appointment</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/appointment-history">Appointment History</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/symptom-checker">AI Symptom Checker</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/find-hospital">Find Nearby Hospital</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/find-pharmacy">Find Nearby Pharmacy</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/patient/bed-availability">Bed Availability</Link></DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
                 {userRole === 'doctor' && (
                  <DropdownMenuGroup>
                     <DropdownMenuSeparator/>
                    <DropdownMenuLabel>Doctor Tools</DropdownMenuLabel>
                     <DropdownMenuItem asChild><Link href="/doctor/dashboard">My Schedule</Link></DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
                {userRole === 'admin' && (
                   <DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                    <DropdownMenuItem asChild><Link href="/admin/manage-doctors">Manage Doctors</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/manage-departments">Manage Departments</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/bed-availability">Bed Availability</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/admissions">Admissions</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/opd-queue">OPD Queue</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/ambulance-services">Ambulance Services</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/smart-slot-allocation">Smart Slots</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/settings">System Settings</Link></DropdownMenuItem>
                  </DropdownMenuGroup>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                {!userRole && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="flex items-center gap-2"><LogIn className="h-4 w-4" /> Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {userRole && (
                   <DropdownMenuItem asChild>
                      <Link href={profileLink} className="flex items-center gap-2"><UserCircle className="h-4 w-4" /> Profile</Link>
                    </DropdownMenuItem>
                   // The actual "Logout" functionality will be on the profile page.
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


          {/* Auth buttons & Profile link for larger screens (md and up, but some patient links are now in a dropdown for md) */}
          {!userRole && (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              </Button>
              <Button variant="default" asChild className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </>
          )}
           {userRole && (
             <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href={profileLink} className="flex items-center gap-1">
                  <UserCircle className="h-4 w-4" /> Profile
                </Link>
            </Button>
           )}
        </nav>
      </div>
    </header>
  );
}
