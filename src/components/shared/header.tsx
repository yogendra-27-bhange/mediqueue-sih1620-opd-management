import Link from 'next/link';
import { Hospital, LogIn, UserPlus, LayoutDashboard, CalendarDays, History, Users, BriefcaseMedical, BedDouble, ListChecks, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Hospital className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold">MediQueue</h1>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-medium">Roles</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>View As</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/patient/dashboard" className="flex items-center gap-2"><LayoutDashboard /> Patient</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/doctor/dashboard" className="flex items-center gap-2"><BriefcaseMedical /> Doctor</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard" className="flex items-center gap-2"><Users /> Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" asChild>
            <Link href="/login" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" /> Sign Up
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
