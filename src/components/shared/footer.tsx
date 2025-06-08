export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} MediQueue. All rights reserved.</p>
        <p className="mt-1">Streamlining Hospital Appointments for a Healthier Tomorrow.</p>
      </div>
    </footer>
  );
}
