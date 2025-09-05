import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockPatients, mockAlerts } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DoctorDashboard() {
  const assignedPatients = mockPatients.filter(p => p.assignedDoctor === 'Doctor Smith');
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'Critical' && assignedPatients.some(p => p.id === a.patientId));

  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Smith. Here is an overview of your patients.</p>
      </div>

      {criticalAlerts.length > 0 && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Critical Alerts</CardTitle>
            <CardDescription className="text-destructive/80">These patients require immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between rounded-md border border-destructive/30 bg-background p-3">
                <div>
                  <p className="font-semibold">{mockPatients.find(p=>p.id === alert.patientId)?.name}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Assigned Patients</CardTitle>
          <CardDescription>Click on a patient to view their detailed records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignedPatients.map(patient => (
            <Link href="#" key={patient.id}>
              <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://picsum.photos/seed/${patient.id}/100/100`} data-ai-hint="person face"/>
                    <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                  </div>
                </div>
                <Badge variant={patient.id === 'p1' ? 'destructive' : 'secondary'}>
                  {patient.id === 'p1' ? 'Alert' : 'Stable'}
                </Badge>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
